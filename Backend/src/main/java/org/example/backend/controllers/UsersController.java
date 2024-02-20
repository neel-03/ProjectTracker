package org.example.backend.controllers;

import org.example.backend.Entities.Roles;
import org.example.backend.Entities.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JWTHelper;
import org.example.backend.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UsersController {
    User user;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JWTHelper helper;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    AuthenticationManager manager;

    @Autowired
    CustomUserService customUserService;

    @PostMapping("")
    public ResponseEntity<?> addUser(@RequestBody User user){
        System.out.println("Add user...");

        User u = userRepository.findByEmail(user.getEmail());

        // check if user already exist or not
        if(u != null){
            return new ResponseEntity<>("User with "+ user.getEmail() +" mail is already exist", HttpStatus.CONFLICT);
        }
        Roles role = roleRepository.findById(2L).orElseThrow(() -> new NoSuchElementException("Role not found with ID: 2"));

        List<Roles>roles = new ArrayList<>();
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        return new ResponseEntity<>("User created", HttpStatus.OK);
    }
}
