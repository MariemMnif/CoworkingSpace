package com.example.projetDS.service.impliments;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.ReservationRepository;
import com.example.projetDS.persistance.dao.*;
import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Reservation;
import com.example.projetDS.persistance.entities.Salle;
import com.example.projetDS.persistance.entities.User;
import com.example.projetDS.service.interfaces.IReservation;


@Service
public class ReservationService implements IReservation {
	@Autowired
	ReservationRepository reservationRepository;
	
	@Autowired
	OffreRepository offreRepository;
	
	@Autowired
	UserRepository userRepository;

	@Override
	public List<Reservation> getAllReservations() {
		// TODO Auto-generated method stub
		return reservationRepository.findAll();
	}

	@Override
	public Reservation getReservationById(Long id) {
		// TODO Auto-generated method stub
		return reservationRepository.findById(id).get();
	}
	@Override
	public Offre getOffreByIdReservation(Long id) {
		// TODO Auto-generated method stub
		return reservationRepository.findById(id).get().getOffre();
	}
	@Override
	public Salle getSalleByIdReservation(Long id) {
		// TODO Auto-generated method stub
		return reservationRepository.findById(id).get().getOffre().getSalle();
	}
	
	@Override
	public User getUserByIdReservation(Long id) {
		// TODO Auto-generated method stub
		return reservationRepository.findById(id).get().getUser();
	}
	

	@Override
	public List<Reservation> getReservationByEtat(String etat) {
		// TODO Auto-generated method stub
		return reservationRepository.findByEtat(etat);
	}

	@Override
	public Reservation createReservation(Reservation reservation) {
		// TODO Auto-generated method stub


		    User user = userRepository.findById(reservation.getUser().getId())
		            .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));


		    Offre offre = offreRepository.findById(reservation.getOffre().getId())
		            .orElseThrow(() -> new RuntimeException("Offre non trouvée"));

		    reservation.setUser(user);
		    reservation.setOffre(offre);

		    return reservationRepository.save(reservation);
		}

	@Override
	public Reservation updateReservation(Reservation reservation) {
		// TODO Auto-generated method stub
	    Optional<Reservation> existingReservationOptional = reservationRepository.findById(reservation.getId());
	    
	    if (existingReservationOptional.isPresent()) {
	        Reservation existingReservation = existingReservationOptional.get();
	        Offre offre = offreRepository.findById(reservation.getOffre().getId())
	                .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
	        User user = userRepository.findById(reservation.getUser().getId())
	                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

	       
	        existingReservation.setUser(user);
	        existingReservation.setOffre(offre);
	        existingReservation.setDateDebut(reservation.getDateDebut());
	        existingReservation.setDateFin(reservation.getDateFin());
	        existingReservation.setEtat(reservation.getEtat());
	        existingReservation.setCommentaire(reservation.getCommentaire());
	        
	      
	        return reservationRepository.save(existingReservation);
	    } else {
	        throw new RuntimeException("Réservation non trouvée !");
	    }
	}

	@Override
	public void deleteReservation(Long id) {
		// TODO Auto-generated method stub
		reservationRepository.deleteById(id);
		
		
	}

	@Override
	public List<Reservation> getReservationsByUser(User user) {
		// TODO Auto-generated method stub
		return reservationRepository.findByUser(user);
	}

	@Override
	public List<Reservation> getReservationsByOffre(Offre offre) {
		// TODO Auto-generated method stub
		return reservationRepository.findByOffre(offre);
	}

}
