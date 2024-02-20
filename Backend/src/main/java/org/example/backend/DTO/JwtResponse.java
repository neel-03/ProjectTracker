package org.example.backend.DTO;

import org.example.backend.Entities.Roles;

import java.util.List;

public class JwtResponse {
    private String token;
    private String username;
    private List<Roles> role;

    public JwtResponse() {}

    public JwtResponse(String token, String username, List<Roles> role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Roles> getRole() {
        return role;
    }

    public void setRole(List<Roles> role) {
        this.role = role;
    }
}
