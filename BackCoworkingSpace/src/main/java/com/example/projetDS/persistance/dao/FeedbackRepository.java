package com.example.projetDS.persistance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>  {
	   List<Feedback> findByUserId(Long userId);

}
