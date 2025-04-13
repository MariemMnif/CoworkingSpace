package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.Feedback;

public interface IFeedback {
    List<Feedback> getAllFeedbacks();
    Feedback getFeedbackById(Long id);
    Feedback saveFeedback(Feedback feedback);
    Feedback updateFeedback(Feedback feedback);
    void deleteFeedback(Long id);
    List<Feedback> getFeedbacksByUserId(Long userId);

}
