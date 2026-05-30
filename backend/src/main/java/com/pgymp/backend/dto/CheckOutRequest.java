package com.pgymp.backend.dto;

public class CheckOutRequest {
    private Long id;

    public CheckOutRequest() {

    }

    public Long getUserId() {
        return this.id;
    }


    public void setUserId(Long userId) {
        this.id = userId;
    }


}
