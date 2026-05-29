package com.pgymp.backend.controller;

import com.pgymp.backend.dto.LoginRequest;
import com.pgymp.backend.dto.LoginResponse;
import com.pgymp.backend.dto.RegisterRequest;
import com.pgymp.backend.dto.RegisterResponse;
import com.pgymp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController          // Tells Spring this handles HTTP requests
@RequestMapping("/api/auth")  // Base URL for all endpoints in this controller
@CrossOrigin(origins = "http://localhost:3000")  // Allows React to call this
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request.getUsername(), request.getPassword());
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request.getUsername(), request.getPassword());
    }



}
