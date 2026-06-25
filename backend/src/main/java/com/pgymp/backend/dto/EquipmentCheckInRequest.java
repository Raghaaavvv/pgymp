package com.pgymp.backend.dto;

import java.util.List;

public class EquipmentCheckInRequest {
    private Long userId;
    private List<String> equipmentNames;

    public EquipmentCheckInRequest() {
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<String> getEquipmentNames() {
        return this.equipmentNames;
    }

    public void setEquipmentNames(List<String> equipmentNames) {
        this.equipmentNames = equipmentNames;
    }
}
