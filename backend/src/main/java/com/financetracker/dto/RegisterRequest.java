package com.financetracker.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // generates getters, setters, toString, equals, hashCode
@AllArgsConstructor // generates constructor with all fields
@NoArgsConstructor  // generates no-args constructor
public class RegisterRequest {
    private String email;
    private String password;
    private String username;
}

