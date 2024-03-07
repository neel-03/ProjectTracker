package org.example.backend.service;

import org.example.backend.DTO.UserResponse;
import org.example.backend.Entities.Roles;
import org.example.backend.Entities.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Service
public class CustomUserService {

    @Autowired
    UserRepository userRepository;

    public List<UserResponse> getAllUsersWithRoles() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private UserResponse convertToDTO(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRoles().get(0).getRole());
        return dto;
    }

    public List<User> findMentors() {
        return userRepository.findByRole("MENTOR");
    }
    public List<User> findAdmins() {
        return userRepository.findByRole("ADMIN");
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
