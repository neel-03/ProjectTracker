package org.example.backend.controllers;

import jakarta.validation.Valid;
import org.example.backend.DTO.UserLoginDTO;
import org.example.backend.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {

    @Autowired
    private CustomUserService userService;

    @PostMapping("/loginuser")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginDTO dto, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        UserDetails userDetails;
        try {
            userDetails = userService.loadUserByUsername(dto.getEmail());
        } catch (UsernameNotFoundException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(userDetails, HttpStatus.OK);
    }
}
