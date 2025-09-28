package com.example.iScore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "scoredata")
public class ScoreData {

    @Id
    private String nationalId;



    // This is the important field now. It will store the user's segment.

    private String segment;




    // This field is not sent back to the user, but it's useful for us.
    // The @Transient annotation means it will NOT be stored in the database.
    // It will be calculated fresh for every request

    private int generatedScore;




    // --- Constructors ---
    public ScoreData() {
    }


    // --- Getters and Setters ---
    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }

    public int getGeneratedScore() {
        return generatedScore;}

    public void setGeneratedScore(int generatedScore) {
        this.generatedScore = generatedScore;
    }


}
