package com.example.iScore.Service;

import com.example.iScore.model.ScoreData;

import org.springframework.stereotype.Service;
import java.util.concurrent.ThreadLocalRandom;


@Service
public class ScoreService {
    private static final int premiumminscore = 750;
    private static final int premiummaxscore = 1000;

    private static final int standardminscore = 500;
    private static final int standardmaxscore = 750;

    private static final int highriskminscore = 300;
    private static final int highriskmaxscore = 500;

    private static final int defaultminscore = 0;
    private static final int defaultmaxscore = 1000;

    public int generatescore(String segment){
        return switch (segment){
            case "Premium" ->   ThreadLocalRandom.current().nextInt(premiumminscore, premiummaxscore);
            case "standard" ->  ThreadLocalRandom.current().nextInt(standardminscore, standardmaxscore);
            case "highrisk" ->  ThreadLocalRandom.current().nextInt(highriskminscore, highriskmaxscore);
            case null, default ->  ThreadLocalRandom.current().nextInt(defaultminscore, defaultmaxscore);

        };


    }
}
