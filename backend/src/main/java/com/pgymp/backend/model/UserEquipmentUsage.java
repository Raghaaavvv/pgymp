package com.pgymp.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_equipment_usage")
public class UserEquipmentUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private Long userId;


    @Column(nullable = false)
    private Long equipmentId;

    public UserEquipmentUsage() {
    }

    public UserEquipmentUsage(Long userId, Long equipmentId) {
        this.userId = userId;
        this.equipmentId = equipmentId;
    }

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Long getEquipmentId() {
        return this.equipmentId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setEquipmentId(Long equipmentId) {
        this.equipmentId = equipmentId;
    }
}
