package com.pgymp.backend.controller;

import com.pgymp.backend.dto.LeaveQueueRequest;
import com.pgymp.backend.dto.LeaveQueueResponse;
import com.pgymp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin(origins = "*")
public class QueueController {

    @Autowired
    private UserService userService;

    @PostMapping("/leave")
    public LeaveQueueResponse leaveQueue(@RequestBody LeaveQueueRequest request) {
        return userService.leaveQueue(request.getMatricId());
    }
}