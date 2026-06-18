package com.pgymp.backend.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicInteger;

@Service
public class CapacityService {
    //gemini said using AtomicInteger is better?
    private final AtomicInteger currentCount = new AtomicInteger(0);

    public int increment() {
        return currentCount.incrementAndGet();
    }

    public int decrement() {
        currentCount.decrementAndGet();
        if (currentCount.get() < 0) {
            currentCount.set(0);
        }
        return currentCount.get();
    }

    public int getCurrentCount() {
        return currentCount.get();
    }
}
