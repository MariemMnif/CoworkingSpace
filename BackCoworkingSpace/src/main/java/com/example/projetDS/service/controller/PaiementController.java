package com.example.projetDS.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.projetDS.persistance.entities.Paiement;
import com.example.projetDS.persistance.entities.Reservation;
import com.example.projetDS.service.interfaces.IPaiement;
import com.example.projetDS.service.interfaces.IReservation;

@RestController
@RequestMapping("api/paiement")
@CrossOrigin(origins = "http://localhost:4200")
public class PaiementController {
	
	    @Autowired
	    private IPaiement paiementService;
	    
	    @Autowired
	    private IReservation reservationService;

	    @PostMapping(consumes = "application/json", produces = "application/json")
	    @CrossOrigin
	    public Paiement createPaiement(@RequestBody Paiement paiement) {
	        return paiementService.createPaiement(paiement);
	    }

	    @PutMapping("/update")
	    @CrossOrigin
	    public Paiement updatePaiement(@RequestBody Paiement paiement) {
	        return paiementService.updatePaiement(paiement);
	    }

	    @GetMapping("/getPaiementById/{id}")
	    @CrossOrigin
	    public Paiement getPaiementById(@PathVariable Long id) {
	        return paiementService.getPaiementById(id);
	    }

	    @GetMapping("/all")
	    @CrossOrigin
	    public List<Paiement> getAllPaiements() {
	        return paiementService.getAllPaiements();
	    }

	    @DeleteMapping("/delete/{id}")
	    @CrossOrigin
	    public void deletePaiement(@PathVariable Long id) {
	        paiementService.deletePaiement(id);
	    }

	    @GetMapping("/findByReservation/{reservationId}")
	    @CrossOrigin
	    public List<Paiement> findByReservation(@PathVariable Long reservationId) {
	        Reservation reservation = reservationService.getReservationById(reservationId);
	        return paiementService.findByReservation(reservation);
	    }

	    @GetMapping("/findByMethodePaiement/{methodePaiement}")
	    @CrossOrigin
	    public List<Paiement> findByMethodePaiement(@PathVariable String methodePaiement) {
	        return paiementService.findByMethodePaiement(methodePaiement);
	    }
	


}
