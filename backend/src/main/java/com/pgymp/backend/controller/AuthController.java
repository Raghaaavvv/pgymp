package com.pgymp.backend.controller;

import com.pgymp.backend.dto.*;
import com.pgymp.backend.service.CapacityService;
import com.pgymp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController          // Tells Spring this handles HTTP requests
@RequestMapping("/api/auth")  // Base URL for all endpoints in this controller
@CrossOrigin(origins = "*")  // Allows React to call this
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private CapacityService capacityService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request.getMatricId(), request.getPassword());
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request.getMatricId(), request.getPassword());
    }

    @PostMapping("/checkOut")
    public CheckOutResponse checkOut(@RequestBody CheckOutRequest request) {
        return userService.checkOut(request.getUserId());
    }

    @GetMapping("/capacity")
    public Capacity getCapacity() {
        return new Capacity(capacityService.getCurrentCount());
    }

}
