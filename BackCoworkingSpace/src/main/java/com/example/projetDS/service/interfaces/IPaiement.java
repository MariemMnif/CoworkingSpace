package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.Paiement;
import com.example.projetDS.persistance.entities.Reservation;

public interface IPaiement {
    List<Paiement> getAllPaiements();
    Paiement getPaiementById(Long id);
    Paiement createPaiement(Paiement paiement);
    Paiement updatePaiement(Paiement paiement);
    void deletePaiement(Long id);
    List<Paiement> findByReservation(Reservation reservation);
    List<Paiement> findByMethodePaiement(String methodePaiement);
}
