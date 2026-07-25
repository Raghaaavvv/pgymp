package com.pgymp.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "checkin_logs")
public class CheckInLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String matricId;

    @Column(nullable = false)
    private LocalDateTime checkInTime;

    public CheckInLog() {
    }

    public CheckInLog(String matricId, LocalDateTime checkInTime) {
        this.matricId = matricId;
        this.checkInTime = checkInTime;
    }

    public Long getId() {
        return this.id;
    }

    public String getMatricId() {
        return this.matricId;
    }

    public LocalDateTime getCheckInTime() {
        return this.checkInTime;
    }
}