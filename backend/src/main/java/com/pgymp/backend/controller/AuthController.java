package com.pgymp.backend.controller;

import com.pgymp.backend.dto.*;
import com.pgymp.backend.service.CapacityService;
import com.pgymp.backend.service.EquipmentService;
import com.pgymp.backend.service.HeatmapService;
import com.pgymp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController          // Tells Spring this handles HTTP requests
@RequestMapping("/api/auth")  // Base URL for all endpoints in this controller
@CrossOrigin(origins = "*")  // Allows React to call this
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private CapacityService capacityService;

    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private HeatmapService heatmapService;

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

    @GetMapping("/equipment")
    public List<EquipmentToReact> getEquipment() {
        //for frontend to display stuff
        return equipmentService.getEquipment();
    }

    @PostMapping("/equipment/checkIn")
    public List<EquipmentToReact> checkInEquipment(@RequestBody EquipmentCheckInRequest request) {
        //from the frontend to update the database and backend
        return equipmentService.checkInEquipment(request.getUserId(), request.getEquipmentNames());
    }

    @GetMapping("/equipment/user/{userId}")
    public List<EquipmentToReact> getEquipmentByUser(@PathVariable Long userId) {
        // Lets the frontend ask what equipment a specific user is currently using.
        return equipmentService.getEquipmentByUser(userId);
    }

    @GetMapping("/queueStatus")
    public QueueStatusResponse getQueueStatus(@RequestParam String matricId) {
        return userService.getQueueStatus(matricId);
    }

    @PostMapping("/scan")
    public ScanResponse scan(@RequestBody ScanRequest request) {
        return userService.scan(request.getToken());
    }

    @GetMapping("/heatmap")
    public List<HeatmapEntry> getHeatmap() {
        return heatmapService.getHeatmap();
    }

}
