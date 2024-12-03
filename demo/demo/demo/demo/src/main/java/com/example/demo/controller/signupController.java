package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.model.user;
import com.example.demo.Repository.userRepository;
import com.example.demo.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class signupController {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private AdminRepository AdminRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        if (signupRequest.getUserType().equalsIgnoreCase("user")) {
            user user = new user();
            user.setFirstname(signupRequest.getFirstname());
            user.setLastname(signupRequest.getLastname());
            user.setUsername(signupRequest.getUsername());
            user.setPassword(signupRequest.getPassword());
            user.setEmail(signupRequest.getEmail());
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else if (signupRequest.getUserType().equalsIgnoreCase("Admin")) {
            Admin admin = new Admin();
            admin.setFirstname(signupRequest.getFirstname());
            admin.setLastname(signupRequest.getLastname());
            admin.setUsername(signupRequest.getUsername());
            admin.setPassword(signupRequest.getPassword());
            admin.setEmail(signupRequest.getEmail());
            AdminRepository.save(admin);
            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else {
            return ResponseEntity.badRequest().body("Invalid user type!");
        }

    }

}



