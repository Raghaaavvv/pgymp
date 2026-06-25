package com.pgymp.backend.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicInteger;

@Service
public class CapacityService {
    private final AtomicInteger currentCount = new AtomicInteger(0);

    public int increment() {
        return currentCount.incrementAndGet();
    }

    public int decrement() {
        return currentCount.updateAndGet(count -> Math.max(0, count - 1));
    }

    public int getCurrentCount() {
        return currentCount.get();
    }
}
