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
    private CapacityService capacityService;

    @Autowired
    private EquipmentService equipmentService;

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
        user.setCheckedIn(true);
        userRepository.save(user);
        capacityService.increment();
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
        capacityService.decrement();
        equipmentService.checkOutEquipment(userId);
        return new CheckOutResponse(true, "Check Out successful", userId);

    }
}
