package com.financetracker.dto;

import com.financetracker.model.TransactionType;

public class CategoryResponse {
    private Long id;
    private String name;
    private TransactionType type;
    private Boolean isDefault;

    // Constructors
    public CategoryResponse() {}

    public CategoryResponse(Long id, String name, TransactionType type, Boolean isDefault) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.isDefault = isDefault;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }

    public Boolean getIsDefault() { return isDefault; }
    public void setIsDefault(Boolean isDefault) { this.isDefault = isDefault; }
}
