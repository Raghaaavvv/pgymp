package com.pgymp.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String matricId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean checkedIn;

    @Column
    private LocalDateTime lastCheckedIn;

    @Column(unique = true)
    private String token;   // NEW

    public User(String matricId, String password) {
        this.matricId = matricId;
        this.password = password;
        this.checkedIn = false;
    }

    public User() {
    }

    public String getMatricId() {
        return this.matricId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setMatricId(String matricId) {
        this.matricId = matricId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isCheckedIn() {
        return this.checkedIn;
    }

    public void setCheckedIn(boolean checkedIn) {
        this.checkedIn = checkedIn;
        if (checkedIn) {
            this.lastCheckedIn = LocalDateTime.now();
        }
    }

    public String getStatus() {
        if (checkedIn) {
            return "Checked in";
        }
        return "Checked out";
    }

    public Long getId() {
        return this.id;
    }

    // NEW
    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}