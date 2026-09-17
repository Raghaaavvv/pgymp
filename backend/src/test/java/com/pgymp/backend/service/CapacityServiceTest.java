package com.pgymp.backend.service;

import com.pgymp.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CapacityServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CapacityService capacityService;

    @Test
    void getCurrentCount_returnsRepositoryCheckedInCount() {
        when(userRepository.countByCheckedInTrue()).thenReturn(5L);

        long result = capacityService.getCurrentCount();

        assertEquals(5L, result);
    }

    @Test
    void getCurrentCount_returnsZero_whenNoOneCheckedIn() {
        when(userRepository.countByCheckedInTrue()).thenReturn(0L);

        long result = capacityService.getCurrentCount();

        assertEquals(0L, result);
    }
}