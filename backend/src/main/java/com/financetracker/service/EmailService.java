package com.financetracker.service;

import com.financetracker.dto.ExpenseReportResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Map;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendExpenseReport(String toEmail, String username, ExpenseReportResponse report) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Your " + report.getPeriod() + " Expense Report - FinanceTracker");
        message.setText(generateReportEmailBody(username, report));

        mailSender.send(message);
    }

    private String generateReportEmailBody(String username, ExpenseReportResponse report) {
        StringBuilder body = new StringBuilder();
        body.append("Dear ").append(username).append(",\n\n");
        body.append("Here's your ").append(report.getPeriod().toLowerCase()).append(" expense report:\n\n");
        body.append("📊 FINANCIAL SUMMARY\n");
        body.append("Period: ").append(report.getStartDate()).append(" to ").append(report.getEndDate()).append("\n");
        body.append("Total Income: ₹").append(report.getTotalIncome()).append("\n");
        body.append("Total Expenses: ₹").append(report.getTotalExpenses()).append("\n");
        body.append("Net Balance: ₹").append(report.getNetBalance()).append("\n");
        body.append("Total Transactions: ").append(report.getTransactionCount()).append("\n\n");

        if (!report.getCategoryBreakdown().isEmpty()) {
            body.append("💰 EXPENSE BREAKDOWN BY CATEGORY\n");
            for (Map.Entry<String, BigDecimal> entry : report.getCategoryBreakdown().entrySet()) {
                body.append("• ").append(entry.getKey()).append(": ₹").append(entry.getValue()).append("\n");
            }
            body.append("\n");
        }

        body.append("Keep tracking your expenses to achieve your financial goals!\n\n");
        body.append("Best regards,\n");
        body.append("FinanceTracker Team");

        return body.toString();
    }
}
