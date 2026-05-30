package com.pgymp.backend.dto;

public class RegisterResponse {
    private boolean status;
    private String message;

    public RegisterResponse(boolean status, String message) {
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
