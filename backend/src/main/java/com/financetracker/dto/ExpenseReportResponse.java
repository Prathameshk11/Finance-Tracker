package com.financetracker.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import com.financetracker.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseReportResponse {
    private String period;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netBalance;
    private Map<String, BigDecimal> categoryBreakdown;
    private Integer transactionCount;

}
