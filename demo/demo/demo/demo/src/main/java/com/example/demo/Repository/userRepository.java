package com.example.demo.Repository;

import com.example.demo.model.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<user, Long> {
    user findByUsernameAndEmailAndPassword(String username, String email, String password);

    // New method to find by username
    user findByUsername(String username);  // Confirm this line exists
}
