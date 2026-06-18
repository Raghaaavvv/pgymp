package com.pgymp.backend.dto;

public class Capacity {
    private int currentCount;

    public Capacity(int currentCount) {
        this.currentCount = currentCount;
    }

    public int getCurrentCount() {
        return this.currentCount;
    }
}
