package com.financetracker.dto;

import com.financetracker.model.TransactionType;

public class CategoryRequest {
    private String name;
    private TransactionType type;

    // Constructors
    public CategoryRequest() {}

    public CategoryRequest(String name, TransactionType type) {
        this.name = name;
        this.type = type;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }
}
