package com.financetracker.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import com.financetracker.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netBalance;
    private Map<String, BigDecimal> expensesByCategory;
    private List<TransactionResponse> recentTransactions;
    
}
