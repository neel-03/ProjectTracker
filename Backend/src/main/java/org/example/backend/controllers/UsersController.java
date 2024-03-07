package org.example.backend.controllers;

import org.example.backend.DTO.EditUserReq;
import org.example.backend.DTO.UserRequest;
import org.example.backend.DTO.UserResponse;
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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> addUser(@RequestBody UserRequest userRequest){
        System.out.println("Add user...");

        User existingUser = userRepository.findByEmail(userRequest.getEmail());

        // check if user already exists
        if (existingUser != null) {
            System.out.println("inside if==================================");
            return new ResponseEntity<>("exist", HttpStatus.OK);
        }

        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());

        // retrieve role from the database based on the request body
        Roles role = roleRepository.findByRole(userRequest.getRole());
        if (role == null) {
            return new ResponseEntity<>("Invalid role", HttpStatus.OK);
        }

        // set the role for the user
        List<Roles> roles = new ArrayList<>();
        roles.add(role);
        user.setRoles(roles);

        // save the user
        userRepository.save(user);

        return new ResponseEntity<>("User created", HttpStatus.OK);
    }
    @GetMapping(value = "")
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        List<UserResponse> users = customUserService.getAllUsersWithRoles();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody EditUserReq req){
        Optional<User> u = userRepository.findById(req.getId());
        if (u.isPresent()) {
            User user = u.get();

            Roles role = roleRepository.findByRole(req.getRole());
            if (role == null) {
                return new ResponseEntity<>("invalid role", HttpStatus.OK);
            }

            List<Roles> roles = new ArrayList<>();
            roles.add(role);
            user.setRoles(roles);
            user.setName(req.getName());
            user.setEmail(req.getEmail());

            userRepository.save(user);
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not found", HttpStatus.OK);
        }
    }

    @GetMapping(value = "/mentors")
    public ResponseEntity<?> getMentors(){
        List<User> mentors = customUserService.findMentors();
        if (mentors.isEmpty()) {
            return new ResponseEntity<>("No mentors found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(mentors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        customUserService.deleteUser(userId);
    }
}
