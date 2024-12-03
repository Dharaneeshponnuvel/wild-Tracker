package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.demo.model.Admin;
import com.example.demo.model.user;
import com.example.demo.Repository.userRepository;
import com.example.demo.Repository.AdminRepository;
import com.example.demo.service.UserServiceImpl;
import com.example.demo.controller.loginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class loginController {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserServiceImpl userService; // Inject UserServiceImpl instance

    private user currentUser;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody loginRequest loginRequest) {
        String userType = loginRequest.getUserType();
        String username = loginRequest.getUsername();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, String> response = new HashMap<>();

        if ("user".equalsIgnoreCase(userType)) {
            currentUser = userRepository.findByUsernameAndEmailAndPassword(username, email, password);
            if (currentUser != null) {
                response.put("status", "success");
                response.put("redirect", "/home"); // Redirect to home for users
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "Invalid user credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else if ("admin".equalsIgnoreCase(userType)) {
            Admin admin = adminRepository.findByUsernameAndEmailAndPassword(username, email, password);
            if (admin != null) {
                currentUser = null;
                response.put("status", "success");
                response.put("redirect", "/dashboard"); // Redirect to dashboard for admins
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "Invalid admin credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            response.put("status", "error");
            response.put("message", "Invalid user type");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/user-details")
    public ResponseEntity<?> getUserDetails() {
        if (currentUser != null) {
            user userDetails = userService.getUser(currentUser.getUsername()); // Calls getUser on the instance
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No user is logged in.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        currentUser = null;
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
}
