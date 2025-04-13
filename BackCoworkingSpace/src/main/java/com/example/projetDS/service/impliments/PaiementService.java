package com.example.projetDS.service.impliments;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.PaiementRepository;
import com.example.projetDS.persistance.dao.ReservationRepository;
import com.example.projetDS.persistance.entities.Paiement;
import com.example.projetDS.persistance.entities.Reservation;
import com.example.projetDS.persistance.entities.User;
import com.example.projetDS.service.interfaces.IPaiement;

@Service
public class PaiementService implements IPaiement{

    @Autowired
    private PaiementRepository  paiementRepository;
    
	@Autowired
	ReservationRepository reservationRepository;
	
    
	@Override
	public List<Paiement> getAllPaiements() {
		// TODO Auto-generated method stub
		return paiementRepository.findAll();
	}

	@Override
	public Paiement getPaiementById(Long id) {
		// TODO Auto-generated method stub
		return paiementRepository.findById(id).get();
	}



	@Override
	public Paiement createPaiement(Paiement paiement) {
		// TODO Auto-generated method stub
	    Reservation reservation = reservationRepository.findById(paiement.getReservation().getId())
	            .orElseThrow(() -> new IllegalArgumentException("reservation non trouvé"));
	    paiement.setReservation(reservation);
		return paiementRepository.save(paiement);
	}

	@Override
	public Paiement updatePaiement(Paiement paiement) {
		// TODO Auto-generated method stub
	    Optional<Paiement> existingPaiementOptional = paiementRepository.findById(paiement.getId());
	    
	    if (existingPaiementOptional.isPresent()) {
	        Paiement existingPaiement = existingPaiementOptional.get();
	        
	        Reservation reservation = reservationRepository.findById(paiement.getReservation().getId())
	                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));

	        existingPaiement.setMontant(paiement.getMontant());
	        existingPaiement.setDatePaiement(paiement.getDatePaiement());
	        existingPaiement.setMethodePaiement(paiement.getMethodePaiement());
	        existingPaiement.setReservation(reservation);
	        
	        return paiementRepository.save(existingPaiement);
	    } else {
	        throw new RuntimeException("Paiement non trouvé !");
	    }
	}

	@Override
	public void deletePaiement(Long id) {
		// TODO Auto-generated method stub
		paiementRepository.deleteById(id);
		
	}

	@Override
	public List<Paiement> findByReservation(Reservation reservation) {
		// TODO Auto-generated method stub
		return paiementRepository.findByReservation(reservation);
	}


	@Override
	public List<Paiement> findByMethodePaiement(String methodePaiement) {
		// TODO Auto-generated method stub
		return paiementRepository.findByMethodePaiement(methodePaiement);
	}
	

}
