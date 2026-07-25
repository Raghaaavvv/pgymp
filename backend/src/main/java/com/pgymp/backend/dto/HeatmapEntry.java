package com.pgymp.backend.dto;

public class HeatmapEntry {
    private String day;
    private int hour;
    private int count;

    public HeatmapEntry(String day, int hour, int count) {
        this.day = day;
        this.hour = hour;
        this.count = count;
    }

    public String getDay() {
        return this.day;
    }

    public int getHour() {
        return this.hour;
    }

    public int getCount() {
        return this.count;
    }
}