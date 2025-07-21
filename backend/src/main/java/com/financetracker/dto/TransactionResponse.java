package com.financetracker.dto;

import com.financetracker.model.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponse {
    private Long id;
    private TransactionType type;
    private String category;
    private BigDecimal amount;
    private LocalDate date;
    private String note;
    
    // Constructors
    public TransactionResponse() {}
    
    public TransactionResponse(Long id, TransactionType type, String category, BigDecimal amount, LocalDate date, String note) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.note = note;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
