package com.pgymp.backend.dto;

public class LoginResponse {
    private boolean status;
    private String message;
    private Long id;

    public LoginResponse(boolean status, String message, Long id) {
        this.status = status;
        this.message = message;
        this.id = id;
    }

    public boolean getStatus() {
        return this.status;
    }

    public String getMessage() {
        return this.message;
    }

    public Long getId() {
        return this.id;
    }
}
