package com.example.projetDS.service.impliments;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.FeedbackRepository;
import com.example.projetDS.persistance.entities.Feedback;
import com.example.projetDS.service.interfaces.IFeedback;

@Service
public class FeedbackService implements IFeedback {

    @Autowired
    private FeedbackRepository feedbackRepository;

	@Override
	public List<Feedback> getAllFeedbacks() {
		// TODO Auto-generated method stub
		return feedbackRepository.findAll();
	}

	@Override
	public Feedback getFeedbackById(Long id) {
		// TODO Auto-generated method stub
		return feedbackRepository.findById(id).get();
	}

	@Override
	public Feedback saveFeedback(Feedback feedback) {
		// TODO Auto-generated method stub
        if (feedback.getNote() < 1 || feedback.getNote() > 5) {
            throw new RuntimeException("La note doit être entre 1 et 5 !");
        }
        return feedbackRepository.save(feedback);
	}

	@Override
	public Feedback updateFeedback(Feedback feedback) {
		// TODO Auto-generated method stub
        if (!feedbackRepository.existsById(feedback.getId())) {
            throw new RuntimeException("Feedback introuvable !");
        }
        if (feedback.getNote() < 1 || feedback.getNote() > 5) {
            throw new RuntimeException("La note doit être entre 1 et 5 !");
        }
        return feedbackRepository.save(feedback);
	}

	@Override
	public void deleteFeedback(Long id) {
		// TODO Auto-generated method stub
		feedbackRepository.deleteById(id);
	}

	@Override
	public List<Feedback> getFeedbacksByUserId(Long userId) {
		// TODO Auto-generated method stub
		return feedbackRepository.findByUserId(userId);
	}
}