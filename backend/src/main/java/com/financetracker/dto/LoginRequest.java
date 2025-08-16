package com.financetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor // Generates no-args constructor
@AllArgsConstructor // Generates all-args constructor
public class LoginRequest {
    private String email;
    private String password;
}
