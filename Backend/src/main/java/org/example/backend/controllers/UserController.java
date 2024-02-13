package org.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {
    @RequestMapping("")
    public String hello(){
        return "User hello";
    }
    @RequestMapping("/admin")
    public String abc(){
        return "Admin page";
    }
}
