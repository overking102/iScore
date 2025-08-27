package com.example.iScore.controller;

import java.util.HashMap; // <-- IMPORT THIS
import java.util.Map;
import org.springframework.http.HttpStatus;
import com.example.iScore.Sec.SecurityConfig;
import com.example.iScore.DTO.LoginRequest;
import com.example.iScore.DTO.RegistrationRequest;
import com.example.iScore.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.iScore.model.User;



@RestController
@RequestMapping("/auth")

public class AuthController {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userRepository.findByUsername(loginRequest.username())
                .map(user -> {
                    if (passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
                        Map<String, String> response = new HashMap<>();
                        response.put("message", "Login Successful");
                        // In a real app, you would add a JWT token here:
                        // response.put("token", "your_jwt_token");
                        return ResponseEntity.ok(response);
                    }
                    return ResponseEntity.status(401).body("Invalid credentials");
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        // Check if the username already exists
        if (userRepository.findByUsername(registrationRequest.username()).isPresent()) { // Use .username()
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        User newUser = new User();
        newUser.setUsername(registrationRequest.username()); // Use .username()
        newUser.setPassword(passwordEncoder.encode(registrationRequest.password())); // Use .password()

        newUser.setRole("USER");

        userRepository.save(newUser);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);


    }
}



