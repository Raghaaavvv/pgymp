package com.pgymp.backend.controller;

import com.pgymp.backend.dto.*;
import com.pgymp.backend.service.CapacityService;
import com.pgymp.backend.service.EquipmentService;
import com.pgymp.backend.service.HeatmapService;
import com.pgymp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
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
    public LoginResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request.getMatricId(), request.getPassword());
    }

    @PostMapping("/checkOut")
    public CheckOutResponse checkOut(@RequestBody CheckOutRequest request) {
        return userService.checkOut(request.getUserId());
    }

    @GetMapping("/capacity")
    public long getCapacity() {
        return capacityService.getCurrentCount();
    }

    @GetMapping("/equipment")
    public List<EquipmentToReact> getEquipment() {

        return equipmentService.getEquipment();
    }

    @PostMapping("/equipment/checkIn")
    public List<EquipmentToReact> checkInEquipment(@RequestBody EquipmentCheckInRequest request) {

        return equipmentService.checkInEquipment(request.getUserId(), request.getEquipmentNames());
    }

    @GetMapping("/equipment/user/{userId}")
    public List<EquipmentToReact> getEquipmentByUser(@PathVariable Long userId) {

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
