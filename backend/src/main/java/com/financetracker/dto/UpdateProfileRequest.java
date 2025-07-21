package com.financetracker.dto;

public class UpdateProfileRequest {
    private String username;
    private String email;
    private String currentPassword;
    private String newPassword;

    // Constructors
    public UpdateProfileRequest() {}

    public UpdateProfileRequest(String username, String email, String currentPassword, String newPassword) {
        this.username = username;
        this.email = email;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCurrentPassword() { return currentPassword; }
    public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
