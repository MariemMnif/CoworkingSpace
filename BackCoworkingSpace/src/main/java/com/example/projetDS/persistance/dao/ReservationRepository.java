package com.example.projetDS.persistance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Reservation;
import com.example.projetDS.persistance.entities.User;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	
    List<Reservation> findByEtat(String etat);
    List<Reservation> findByUser(User user);
    List<Reservation> findByOffre(Offre offre);

}
