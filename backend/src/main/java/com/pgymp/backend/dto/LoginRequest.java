package com.pgymp.backend.dto;

public class LoginRequest {
    private String matricId;
    private String password;

    public LoginRequest() {}

    public void setMatricId(String matricId) {
        this.matricId = matricId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }

    public String getMatricId() {
        return this.matricId;
    }
}
