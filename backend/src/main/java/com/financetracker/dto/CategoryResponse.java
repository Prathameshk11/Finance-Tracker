package com.financetracker.dto;

import com.financetracker.model.TransactionType;
import com.financetracker.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private TransactionType type;
    private Boolean isDefault;

}
