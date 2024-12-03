package com.example.demo.service;

import com.example.demo.model.user; // Make sure to import your user details model

import com.example.demo.Repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {

    @Autowired
    private userRepository userRepository;

    // Other methods...

    // Method to get user details
    public user getUserDetails(String username) {
        user user = userRepository.findByUsername(username); // Assuming you have this method in your repository
        if (user != null) {
            // Map user to userdetails as needed
            user userDetails = new user();
            userDetails.setUsername(user.getUsername());
            userDetails.setEmail(user.getEmail());
            // Add more fields as necessary
            return userDetails;
        }
        return null; // Return null or throw an exception if the user is not found
    }
    public user getUser(String username) {
        return userRepository.findByUsername(username); // Assumes findByUsername is defined in userRepository
    }
}
