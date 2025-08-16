package com.financetracker.dto;

import com.financetracker.model.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.financetracker.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    private TransactionType type;
    private String category;
    private BigDecimal amount;
    private LocalDate date;
    private String note;
    

}
