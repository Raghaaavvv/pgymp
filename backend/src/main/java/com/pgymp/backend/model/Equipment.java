package com.pgymp.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private int total;

    @Column(nullable = false)
    private int inUse;

    public Equipment() {
    }

    public Equipment(String name, int total, int inUse) {
        this.name = name;
        this.total = total;
        this.inUse = inUse;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public int getTotal() {
        return this.total;
    }

    public int getInUse() {
        return this.inUse;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public void setInUse(int inUse) {
        this.inUse = inUse;
    }
}
