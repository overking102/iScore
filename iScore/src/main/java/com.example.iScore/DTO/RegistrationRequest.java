package com.example.iScore.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record  RegistrationRequest(@NotEmpty(message = "Username cannot be empty")
                                   @Size(min = 3, message = "Username must be at least 3 characters long")
                                   String username,

                                   @NotEmpty(message = "Password cannot be empty")
                                   @Size(min = 6, message = "Password must be at least 6 characters long")
                                   String password)

{}

