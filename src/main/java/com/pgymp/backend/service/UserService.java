package com.pgymp.backend.service;

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

    public LoginResponse login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
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
        return new LoginResponse(true, "Login successful", user.getId());
    }

    public RegisterResponse register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            return new RegisterResponse(false, "Username already exists");

        }
        User user = new User(username, password);
        userRepository.save(user);
        return new RegisterResponse(true, "Registration successful");

    }
}
