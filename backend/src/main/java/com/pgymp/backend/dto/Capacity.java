package com.pgymp.backend.dto;

public class Capacity {
    private long currentCount;

    public Capacity(long currentCount) {
        this.currentCount = currentCount;
    }

    public long getCurrentCount() {
        return this.currentCount;
    }
}
