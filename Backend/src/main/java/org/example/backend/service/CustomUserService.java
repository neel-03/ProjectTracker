package org.example.backend.service;

import org.example.backend.Entities.Roles;
import org.example.backend.Entities.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Component
@Service
public class CustomUserService {

    @Autowired
    UserRepository userRepository;

    public List<User> findMentors() {
        return userRepository.findByRole("MENTOR");
    }
    public List<User> findAdmins() {
        return userRepository.findByRole("ADMIN");
    }
}
