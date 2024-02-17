package org.example.backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class UserRegisterDTO {
    @NotEmpty(message = "Username field should not be empty")
    private String username;

    @Email
    @NotEmpty(message = "Email field should not be empty")
    private String email;

    @NotEmpty(message = "Role should not be empty")
    private String role;

    @NotEmpty(message = "Password field should not be empty")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
