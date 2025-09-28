
package com.example.iScore.controller;


import com.example.iScore.model.ScoreData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import com.example.iScore.Service.ScoreService;
import com.example.iScore.repository.ScoreDataRepository;
import com.example.iScore.DTO.*;



@RestController
@RequestMapping("/home")

public class Controller {


    private final ScoreDataRepository scoreDataRepository;
    private final ScoreService scoreService;


    public Controller(ScoreDataRepository scoreDataRepository, ScoreService scoreService) {
        this.scoreDataRepository = scoreDataRepository;
        this.scoreService = scoreService;
    }

    @PostMapping
    public ResponseEntity<?> getCreditScore(@RequestBody InquiryRequest request) {
        String nationalId = request.nationalId();

        Optional<ScoreData> userProfileOptional = scoreDataRepository.findById(nationalId);

        if (userProfileOptional.isPresent()) {
            ScoreData userProfile = userProfileOptional.get();
            int randomScore = userProfile.getGeneratedScore();

            InquiryResponse response = new InquiryResponse(
                    userProfile.getNationalId(),
                    randomScore,
                    userProfile.getSegment()

            );

            return ResponseEntity.ok(response);
        } else {
            // If user not found, return an error
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }


    }
    @PostMapping("/create")
    public ResponseEntity<ScoreData> createProfile(@RequestBody ScoreData newProfile) {
        // The error occurs on the next line because newProfile.getNationalId() is null
// 1. Get the segment from the incoming profile (e.g., "highrisk")
        String segment = newProfile.getSegment();

        // 2. Use the service to generate a score based on the segment
        int score = scoreService.generatescore(segment);

        // 3. Set the generated score on the profile object
        newProfile.setGeneratedScore(score);

        newProfile.setGeneratedScore(scoreService.generatescore(newProfile.getSegment()));
        ScoreData savedProfile = scoreDataRepository.save(newProfile);

        return ResponseEntity.ok(savedProfile);
    }

}
