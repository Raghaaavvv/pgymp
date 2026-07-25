package com.pgymp.backend.service;

import com.pgymp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CapacityService {
    @Autowired
    private UserRepository userRepository;

    public long getCurrentCount() {
        return userRepository.countByCheckedInTrue();
    }
}
