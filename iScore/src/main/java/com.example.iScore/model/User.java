package com.example.iScore.model;

import jakarta.persistence.*;

@Entity
@Table(name = "logindata")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idlogindata;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String role;


    public User(String username, String password) {

        this.username = username;
        this.password = password;

    }

    public User() {

    }

    public Long getId() {
        return idlogindata;
    }
    public void setId(Long idlogindata) {
        this.idlogindata = idlogindata;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }




}
