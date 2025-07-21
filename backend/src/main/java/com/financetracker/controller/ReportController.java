package com.financetracker.controller;

import com.financetracker.dto.ExpenseReportResponse;
import com.financetracker.dto.TransactionResponse;
import com.financetracker.model.User;
import com.financetracker.service.EmailService;
import com.financetracker.service.ReportService;
import com.financetracker.service.TransactionService;
import com.financetracker.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;
    private final TransactionService transactionService;
    private final EmailService emailService;
    private final UserService userService;

    public ReportController(ReportService reportService, TransactionService transactionService,
                            EmailService emailService, UserService userService) {
        this.reportService = reportService;
        this.transactionService = transactionService;
        this.emailService = emailService;
        this.userService = userService;
    }

    @GetMapping("/weekly")
    public ResponseEntity<ExpenseReportResponse> getWeeklyReport(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        ExpenseReportResponse report = reportService.getWeeklyReport(user.getId());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/monthly")
    public ResponseEntity<ExpenseReportResponse> getMonthlyReport(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        ExpenseReportResponse report = reportService.getMonthlyReport(user.getId());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/yearly")
    public ResponseEntity<ExpenseReportResponse> getYearlyReport(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        ExpenseReportResponse report = reportService.getYearlyReport(user.getId());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportTransactionsCSV(Authentication authentication) throws IOException {
        User user = userService.findByEmail(authentication.getName());
        List<TransactionResponse> transactions = transactionService.getUserTransactions(user.getId());

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        StringBuilder csv = new StringBuilder();
        csv.append("Date,Type,Category,Amount,Note\n");

        for (TransactionResponse transaction : transactions) {
            csv.append(transaction.getDate()).append(",")
                    .append(transaction.getType()).append(",")
                    .append(transaction.getCategory()).append(",")
                    .append(transaction.getAmount()).append(",")
                    .append(transaction.getNote() != null ? transaction.getNote() : "").append("\n");
        }

        outputStream.write(csv.toString().getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "transactions.csv");

        return ResponseEntity.ok()
                .headers(headers)
                .body(outputStream.toByteArray());
    }

    @PostMapping("/email/{period}")
    public ResponseEntity<?> emailReport(@PathVariable String period, Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            ExpenseReportResponse report;

            switch (period.toLowerCase()) {
                case "weekly":
                    report = reportService.getWeeklyReport(user.getId());
                    break;
                case "monthly":
                    report = reportService.getMonthlyReport(user.getId());
                    break;
                case "yearly":
                    report = reportService.getYearlyReport(user.getId());
                    break;
                default:
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid period"));
            }

            emailService.sendExpenseReport(user.getEmail(), user.getUsername(), report);
            return ResponseEntity.ok(Map.of("message", "Report sent successfully to " + user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to send email: " + e.getMessage()));
        }
    }
}
