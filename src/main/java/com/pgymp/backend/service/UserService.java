package com.pgymp.backend.service;

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
            // return login invalid -> need to register
        }
        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            // return login invalid -> wrong password
        }
        if (user.isCheckedIn()) {
            // return login invalid -> user already checked in
        }
        user.setCheckedIn(true);
        userRepository.save(user);
        // return login success
    }

    public RegisterResponse register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            // return register invalid, username already exists!
        }
        User user = new User(username, password);
        userRepository.save(user);
        // return register success

    }
}
