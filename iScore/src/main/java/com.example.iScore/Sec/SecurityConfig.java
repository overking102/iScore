package com.example.iScore.Sec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Enable CORS using the global configuration from WebConfig
                .cors(withDefaults())

                // 2. Disable CSRF (Cross-Site Request Forgery) - common for stateless APIs
                .csrf(csrf -> csrf.disable())

                // 3. Define authorization rules
                .authorizeHttpRequests(authz -> authz

                        .requestMatchers("/auth/**").permitAll()
                        // Allow all requests to /home and its subpaths.
                        // You can make this more specific later.
                        .requestMatchers("/home/**").permitAll()
                        // Require authentication for any other request
                        .anyRequest().authenticated()
                );

        return http.build();
    }


}
