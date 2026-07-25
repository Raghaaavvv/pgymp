package com.pgymp.backend.service;

import com.pgymp.backend.dto.*;
import com.pgymp.backend.model.User;
import com.pgymp.backend.repository.UserRepository;
import com.pgymp.backend.model.CheckInLog;
import com.pgymp.backend.repository.CheckInLogRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private static final int MAX_CAPACITY = 20;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EquipmentService equipmentService;
    @Autowired
    private CapacityService capacityService;
    @Autowired
    private Qservice qService;

    public LoginResponse login(String matricId, String password) {
        Optional<User> userOpt = userRepository.findByMatricId(matricId);
        if (!userOpt.isPresent()) {
            return new LoginResponse(false, "User not found - please register", null, null);
        }
        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            return new LoginResponse(false, "Wrong Password", null, null);
        }
        if (user.isCheckedIn()) {
            return new LoginResponse(false, "User already checked in", null, null);
        }
        // User already has a pending token (logged in earlier, hasn't scanned yet).
        // Let them resume with the same token instead of erroring out.
        if (user.getToken() != null) {
            return new LoginResponse(true, "Welcome back - scan your QR code at the gym entrance", user.getId(), user.getToken());
        }
        if (capacityService.getCurrentCount() >= MAX_CAPACITY) {
            int queuePosition = qService.joinQ(user.getMatricId());
            return new LoginResponse(false, "Gym is at full capacity. You are number " + queuePosition + " in the queue.", null, null);
        }

        String token = UUID.randomUUID().toString();
        user.setToken(token);
        userRepository.save(user);

        // Note: checkedIn is NOT set here. It only becomes true once the
        // security guard scans this token via scan().
        return new LoginResponse(true, "Login successful", user.getId(), token);
    }

    public LoginResponse register(String matricId, String password) {
        if (matricId == null || matricId.isBlank() || password == null || password.isBlank()) {
            return new LoginResponse(false, "Matric ID and password are required", null, null);
        }

        matricId = matricId.trim();
        if (userRepository.existsByMatricId(matricId)) {
            return new LoginResponse(false, "Matric ID already exists - please sign in", null, null);
        }
        User user = new User(matricId, password);
        userRepository.save(user);
        return login(matricId, password);
    }

    // NEW - called by the security guard scanner page.
    // This is the moment checkedIn actually becomes true.
    public ScanResponse scan(String token) {
        if (token == null || token.isBlank()) {
            return new ScanResponse(false, "No token provided");
        }
        Optional<User> userOpt = userRepository.findByToken(token);
        if (userOpt.isEmpty()) {
            return new ScanResponse(false, "Invalid QR code");
        }
        User user = userOpt.get();
        if (user.isCheckedIn()) {
            return new ScanResponse(false, "User already checked in");
        }
        user.setCheckedIn(true);
        userRepository.save(user);
        return new ScanResponse(true, "Checked in successfully: " + user.getMatricId());
    }

    public CheckOutResponse checkOut(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return new CheckOutResponse(false, "invalid", null);
        }
        User user = userOpt.get();
        if (!user.isCheckedIn()) {
            return new CheckOutResponse(false, "User already checked out.", null);
        }
        user.setCheckedIn(false);
        user.setToken(null); // clear token so they must log in fresh next time
        userRepository.save(user);

        equipmentService.checkOutEquipment(userId);

        if (qService.hasWaitingUsers()) {
            String nextMatricId = qService.removefromQ();
            Optional<User> nextUserOpt = userRepository.findByMatricId(nextMatricId);

            if (nextUserOpt.isPresent()) {
                User nextUser = nextUserOpt.get();
                // Auto-promoted from queue: checked in directly without a
                // separate scan step, since this happens as a background
                // event rather than the resident physically walking up.
                nextUser.setCheckedIn(true);
                nextUser.setToken(UUID.randomUUID().toString());
                userRepository.save(nextUser);

                return new CheckOutResponse(true, "Checked Out successful. Next queued user checked in.", userId);
            }
        }
        return new CheckOutResponse(true, "Checked Out successful", userId);
    }

    // Polled by the resident's frontend every 10s while waiting in queue
    public QueueStatusResponse getQueueStatus(String matricId) {
        Optional<User> userOpt = userRepository.findByMatricId(matricId);
        if (userOpt.isEmpty()) {
            return new QueueStatusResponse(false, -1, null);
        }
        User user = userOpt.get();
        if (user.isCheckedIn()) {
            return new QueueStatusResponse(true, 0, user.getToken());
        }
        int position = qService.pollQnumber(matricId);
        return new QueueStatusResponse(false, position, null);
    }

    // Called when user clicks "Leave Queue"
    public LeaveQueueResponse leaveQueue(String matricId) {
        boolean removed = qService.leaveQueue(matricId);
        return new LeaveQueueResponse(removed, removed ? "Left the queue" : "You were not in the queue");
    }

    public long getCheckedInCount() {
        return userRepository.countByCheckedInTrue();
    }

    public long getCheckedOutCount() {
        return userRepository.countByCheckedInFalse();
    }
}
