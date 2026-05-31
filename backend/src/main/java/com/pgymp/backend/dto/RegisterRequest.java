package com.pgymp.backend.dto;

public class RegisterRequest {
    private String matricId;
    private String password;

    public RegisterRequest() {}

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


