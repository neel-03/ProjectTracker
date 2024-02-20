package org.example.backend.service;

import org.example.backend.Entities.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public class CustomUserService {
    @Autowired
    UserRepository userRepository;

    public User saveUser(User user){
        userRepository.save(user);
        return user;
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void deleteUser(Long id){
        //remaining
    }
}
