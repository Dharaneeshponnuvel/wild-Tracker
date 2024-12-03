package com.example.demo.service;

import com.example.demo.model.user;
import com.example.demo.model.Admin;
import com.example.demo.Repository.AdminRepository;
import com.example.demo.Repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public String loginUser(String userType, String username, String email, String password) {
        if ("user".equalsIgnoreCase(userType)) {
            user athlete = userRepository.findByUsernameAndEmailAndPassword(username,email, password);
            if (athlete != null && passwordEncoder.matches(password, athlete.getPassword())) {
                return "user login successful";
            }
        } else if ("Admin".equalsIgnoreCase(userType)) {
            Admin coach = adminRepository.findByUsernameAndEmailAndPassword(username,email,password);
            if (coach != null && passwordEncoder.matches(password, coach.getPassword())) {
                return "admin login successful";
            }
        }
        return "Login failed. Invalid credentials or user type.";
    }
}
