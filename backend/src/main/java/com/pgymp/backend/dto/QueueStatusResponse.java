package com.pgymp.backend.dto;

public class QueueStatusResponse {
    private boolean checkedIn;
    private int position;
    private String token;

    public QueueStatusResponse(boolean checkedIn, int position, String token) {
        this.checkedIn = checkedIn;
        this.position = position;
        this.token = token;
    }

    public boolean isCheckedIn() {
        return this.checkedIn;
    }

    public int getPosition() {
        return this.position;
    }

    public String getToken() {
        return this.token;
    }
}