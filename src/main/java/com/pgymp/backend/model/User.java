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
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean checkedIn;

    @Column
    private LocalDateTime lastCheckedIn;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.checkedIn = false;

    }

    public User() {

    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isCheckedIn() {
        return this.checkedIn;
    }

    public void setCheckedIn(boolean checkedIn)  {
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




}
