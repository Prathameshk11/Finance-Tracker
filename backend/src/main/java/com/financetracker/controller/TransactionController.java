package com.financetracker.controller;

import com.financetracker.dto.DashboardResponse;
import com.financetracker.dto.TransactionRequest;
import com.financetracker.dto.TransactionResponse;
import com.financetracker.model.Transaction;
import com.financetracker.model.User;
import com.financetracker.service.TransactionService;
import com.financetracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    public TransactionController(TransactionService transactionService, UserService userService) {
        this.transactionService = transactionService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(
            @RequestBody TransactionRequest request,
            Authentication authentication) {

        User user = userService.findByEmail(authentication.getName());
        Transaction transaction = transactionService.createTransaction(user, request);

        TransactionResponse response = new TransactionResponse(
                transaction.getId(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getNote()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getUserTransactions(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<TransactionResponse> transactions = transactionService.getUserTransactions(user.getId());
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponse> updateTransaction(
            @PathVariable Long id,
            @RequestBody TransactionRequest request,
            Authentication authentication) {

        User user = userService.findByEmail(authentication.getName());
        Transaction transaction = transactionService.updateTransaction(id, user, request);

        TransactionResponse response = new TransactionResponse(
                transaction.getId(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getNote()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        transactionService.deleteTransaction(id, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        DashboardResponse dashboard = transactionService.getDashboardData(user.getId());
        return ResponseEntity.ok(dashboard);
    }
}
