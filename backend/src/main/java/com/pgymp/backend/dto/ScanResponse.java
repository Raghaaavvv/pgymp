package com.pgymp.backend.dto;

public class ScanResponse {
    private boolean status;
    private String message;

    public ScanResponse(boolean status, String message) {
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