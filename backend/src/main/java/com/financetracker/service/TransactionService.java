package com.financetracker.service;

import com.financetracker.dto.DashboardResponse;
import com.financetracker.dto.TransactionRequest;
import com.financetracker.dto.TransactionResponse;
import com.financetracker.model.Transaction;
import com.financetracker.model.TransactionType;
import com.financetracker.model.User;
import com.financetracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction createTransaction(User user, TransactionRequest request) {
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setAmount(request.getAmount());
        transaction.setDate(request.getDate());
        transaction.setNote(request.getNote());

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, User user, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setAmount(request.getAmount());
        transaction.setDate(request.getDate());
        transaction.setNote(request.getNote());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id, User user) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        transactionRepository.delete(transaction);
    }

    public List<TransactionResponse> getUserTransactions(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserIdOrderByDateDesc(userId);
        return transactions.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public DashboardResponse getDashboardData(Long userId) {
        BigDecimal totalIncome = transactionRepository.getTotalByUserAndType(userId, TransactionType.INCOME);
        BigDecimal totalExpenses = transactionRepository.getTotalByUserAndType(userId, TransactionType.EXPENSE);

        if (totalIncome == null) totalIncome = BigDecimal.ZERO;
        if (totalExpenses == null) totalExpenses = BigDecimal.ZERO;

        BigDecimal netBalance = totalIncome.subtract(totalExpenses);

        // Get category breakdown for expenses
        List<Object[]> categoryData = transactionRepository.getCategoryTotals(userId, TransactionType.EXPENSE);
        Map<String, BigDecimal> expensesByCategory = new HashMap<>();
        for (Object[] row : categoryData) {
            expensesByCategory.put((String) row[0], (BigDecimal) row[1]);
        }

        // Get recent transactions (last 10)
        List<Transaction> recentTransactions = transactionRepository.findByUserIdOrderByDateDesc(userId)
                .stream()
                .limit(10)
                .collect(Collectors.toList());

        List<TransactionResponse> recentTransactionResponses = recentTransactions.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return new DashboardResponse(totalIncome, totalExpenses, netBalance, expensesByCategory, recentTransactionResponses);
    }

    private TransactionResponse convertToResponse(Transaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getNote()
        );
    }
}
