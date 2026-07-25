package com.pgymp.backend.dto;

public class LeaveQueueResponse {
    private boolean status;
    private String message;

    public LeaveQueueResponse(boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    public boolean isStatus() {
        return this.status;
    }

    public String getMessage() {
        return this.message;
    }
}