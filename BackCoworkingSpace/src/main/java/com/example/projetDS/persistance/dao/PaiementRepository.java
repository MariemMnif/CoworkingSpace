package com.example.projetDS.persistance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.Paiement;
import com.example.projetDS.persistance.entities.Reservation;

public interface PaiementRepository extends JpaRepository<Paiement, Long>  {
	
    List<Paiement> findByReservation(Reservation reservation);
    List<Paiement> findByMethodePaiement(String methodePaiement);

}
