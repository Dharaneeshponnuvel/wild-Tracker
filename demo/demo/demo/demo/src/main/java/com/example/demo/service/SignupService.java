package com.example.demo.service;

import com.example.demo.model.user;
import com.example.demo.model.Admin;
import com.example.demo.Repository.userRepository;
import com.example.demo.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(String userType, String firstname, String lastname, String middlename, String username, String email, String password) {
        if ("user".equalsIgnoreCase(userType)) {
            user user = new user();
            user.setFirstname(firstname);
            user.setLastname(lastname);
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password)); // Encrypt password before saving
            userRepository.save(user);
        } else if ("admin".equalsIgnoreCase(userType)) {
            Admin admin = new Admin();
            admin.setFirstname(firstname);
            admin.setLastname(lastname);
            admin.setUsername(username);
            admin.setEmail(email);
            admin.setPassword(password);
            adminRepository.save(admin);
        }
    }
}
