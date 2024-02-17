package org.example.backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class UserLoginDTO {
    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email field should not be empty")
    private String email;
    @NotBlank(message = "Password field should not be empty")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
