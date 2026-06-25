package com.pgymp.backend.dto;

public class EquipmentToReact {
    private String name;
    private int total;
    private int inUse;

    public EquipmentToReact(String name, int total, int inUse) {
        this.name = name;
        this.total = total;
        this.inUse = inUse;
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
}
