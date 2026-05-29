package com.pgymp.backend.dto;

public class RegisterRequest {
    private String username;
    private String password;

    public RegisterRequest() {}

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }

    public String getUsername() {
        return this.username;
    }
}


