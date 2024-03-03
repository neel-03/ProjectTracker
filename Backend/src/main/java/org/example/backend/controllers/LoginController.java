package org.example.backend.controllers;

import org.example.backend.DTO.JwtRequest;
import org.example.backend.DTO.JwtResponse;
import org.example.backend.Entities.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JWTHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@Controller
@RequestMapping("/loginuser")
public class LoginController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JWTHelper helper;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    AuthenticationManager manager;

    @PostMapping("")
    public ResponseEntity<?> logInUser(@RequestBody JwtRequest request) {

        String email = request.getEmail();
        User user = userRepository.findByEmail(email);

        if(user == null){
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }else{
            if(!user.getPassword().equals(request.getPassword())){
                return new ResponseEntity<>("Incorrect Password", HttpStatus.BAD_REQUEST);
            }
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            //generate token for user
            String token = this.helper.generateToken(userDetails);

            System.out.println("token: "+ token);
            JwtResponse res = new JwtResponse(token, user.getName(), user.getRoles(), user.getEmail());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> exceptionHandler() {
        return ResponseEntity.ok("Credentials Invalid!!");
    }
}
