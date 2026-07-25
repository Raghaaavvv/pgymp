package com.pgymp.backend.dto;

public class LoginResponse {
    private boolean status;
    private String message;
    private Long id;
    private String token;

    public LoginResponse(boolean status, String message, Long id, String token) {
        this.status = status;
        this.message = message;
        this.id = id;
        this.token = token;
    }

    public boolean isStatus() {
        return this.status;
    }

    public String getMessage() {
        return this.message;
    }

    public Long getId() {
        return this.id;
    }

    public String getToken() {
        return this.token;
    }
}