package com.pgymp.backend.service;

import com.pgymp.backend.dto.CheckOutResponse;
import com.pgymp.backend.dto.LoginResponse;
import com.pgymp.backend.dto.RegisterResponse;
import com.pgymp.backend.model.User;
import com.pgymp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
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
            return new LoginResponse(false, "User not found - please register", null);
        }
        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            return new LoginResponse(false, "Wrong Password", null);

        }
        if (user.isCheckedIn()) {
            return new LoginResponse(false, "User already checked in", null);
        }
        if (capacityService.getCurrentCount() >= 30) {
            int queuePosition = qService.joinQ(user.getMatricId());
            return new LoginResponse(false, "Gym is at full capacity. You are number " + queuePosition + " in the queue.", null);
        }
        user.setCheckedIn(true);
        userRepository.save(user);

        return new LoginResponse(true, "Login successful", user.getId());
    }

    public RegisterResponse register(String matricId, String password) {
        if (userRepository.existsByMatricId(matricId)) {
            return new RegisterResponse(false, "matricId already exists");

        }
        User user = new User(matricId, password);
        userRepository.save(user);
        return new RegisterResponse(true, "Registration successful");

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
        userRepository.save(user);

        equipmentService.checkOutEquipment(userId);
        if (qService.hasWaitingUsers()) {
            String nextMatricId = qService.removefromQ();
            Optional<User> nextUserOpt = userRepository.findByMatricId(nextMatricId);

            if (nextUserOpt.isPresent()) {
                User nextUser = nextUserOpt.get();
                nextUser.setCheckedIn(true);
                userRepository.save(nextUser);

                return new CheckOutResponse(true, "Checked Out successful. Next queued user checked in.", userId);
            }
        }
        return new CheckOutResponse(true, "Checked Out successful", userId);

    }

    public long getCheckedInCount() {
        return userRepository.countByCheckedInTrue();
    }

    public long getCheckedOutCount() {
        return userRepository.countByCheckedInFalse();
    }
}
