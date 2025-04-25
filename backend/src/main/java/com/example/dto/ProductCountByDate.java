package com.example.dto;

import java.time.LocalDate;
import java.util.Date;

public class ProductCountByDate {

    private LocalDate date;
    private long count;

    // Constructor
    public ProductCountByDate(LocalDate date, long count) {
        this.date = date;
        this.count = count;
    }

    // Getters and Setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
