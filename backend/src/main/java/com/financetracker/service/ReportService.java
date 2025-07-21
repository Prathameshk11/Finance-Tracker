package com.financetracker.service;

import com.financetracker.dto.ExpenseReportResponse;
import com.financetracker.model.TransactionType;
import com.financetracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final TransactionRepository transactionRepository;

    public ReportService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public ExpenseReportResponse getWeeklyReport(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);
        return generateReport(userId, "Weekly", startDate, endDate);
    }

    public ExpenseReportResponse getMonthlyReport(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.with(TemporalAdjusters.firstDayOfMonth());
        return generateReport(userId, "Monthly", startDate, endDate);
    }

    public ExpenseReportResponse getYearlyReport(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.with(TemporalAdjusters.firstDayOfYear());
        return generateReport(userId, "Yearly", startDate, endDate);
    }

    private ExpenseReportResponse generateReport(Long userId, String period, LocalDate startDate, LocalDate endDate) {
        List<Object[]> transactions = transactionRepository.findTransactionsByDateRange(userId, startDate, endDate);

        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpenses = BigDecimal.ZERO;
        Map<String, BigDecimal> categoryBreakdown = new HashMap<>();
        int transactionCount = 0;

        for (Object[] transaction : transactions) {
            TransactionType type = (TransactionType) transaction[0];
            String category = (String) transaction[1];
            BigDecimal amount = (BigDecimal) transaction[2];

            if (type == TransactionType.INCOME) {
                totalIncome = totalIncome.add(amount);
            } else {
                totalExpenses = totalExpenses.add(amount);
                categoryBreakdown.merge(category, amount, BigDecimal::add);
            }
            transactionCount++;
        }

        BigDecimal netBalance = totalIncome.subtract(totalExpenses);

        return new ExpenseReportResponse(period, startDate, endDate, totalIncome, totalExpenses,
                netBalance, categoryBreakdown, transactionCount);
    }
}
