package org.example.backend.controllers;

import org.example.backend.DTO.UserRegisterDTO;
import org.example.backend.Entities.User;
import org.example.backend.service.CustomUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class RegisterController {

    private final CustomUserService userService;

    public RegisterController(CustomUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterDTO dto, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        User user = userService.save(dto);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User registration failed");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }
}

