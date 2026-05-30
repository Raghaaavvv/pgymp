package com.pgymp.backend.dto;

public class CheckOutResponse {
    private boolean status;
    private String message;
    private Long id;

    public CheckOutResponse(boolean status, String message, Long id) {
        this.status = status;
        this.message = message;
        this.id = id;
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
}
