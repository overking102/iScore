package com.example.iScore.repository;

import com.example.iScore.model.ScoreData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreDataRepository extends JpaRepository<ScoreData,String>{


}
