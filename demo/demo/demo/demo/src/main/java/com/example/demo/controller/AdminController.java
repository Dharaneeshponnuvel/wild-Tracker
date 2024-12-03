package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/signup")
    public Admin saveAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }
}
