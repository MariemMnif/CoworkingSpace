package com.example.projetDS.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Reservation;
import com.example.projetDS.persistance.entities.Salle;
import com.example.projetDS.persistance.entities.User;
import com.example.projetDS.service.interfaces.IOffre;
import com.example.projetDS.service.interfaces.IReservation;
import com.example.projetDS.service.interfaces.IUser;

@RestController
@RequestMapping("/api/reservation")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController { 
    @Autowired
    private IReservation reservationService;
    
    @Autowired
    private IOffre offreService;
    
    @Autowired
    private IUser userService;


    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @CrossOrigin
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }


    @PutMapping("/update")
    @CrossOrigin
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservationService.updateReservation(reservation);
    }

    @GetMapping("/getReservationById/{id}")
    @CrossOrigin
    public Reservation getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @GetMapping("/getOffreByIdReservation/{id}")
    @CrossOrigin
    public Offre getOffreByIdReservation(@PathVariable Long id) {
        return reservationService.getOffreByIdReservation(id);
    }
    
    @GetMapping("/getSalleByIdReservation/{id}")
    @CrossOrigin
    public Salle getSalleByIdReservation(@PathVariable Long id) {
        return reservationService.getSalleByIdReservation(id);
    }
    @GetMapping("/getUserByIdReservation/{id}")
    @CrossOrigin
    public User getUserByIdReservation(@PathVariable Long id) {
        return reservationService.getUserByIdReservation(id);
    }

    @GetMapping("/all")
    @CrossOrigin
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }


    @DeleteMapping("/delete/{id}")
    @CrossOrigin
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }


    @GetMapping("/getReservationsByEtat/{etat}")
    @CrossOrigin
    public List<Reservation> getReservationsByEtat(@PathVariable String etat) {
        return reservationService.getReservationByEtat(etat);
    }


    @GetMapping("/getReservationsByUser/{userId}")
    @CrossOrigin
    public List<Reservation> getReservationsByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);  
        return reservationService.getReservationsByUser(user);
    }


    @GetMapping("/getReservationsByOffre/{offreId}")
    @CrossOrigin
    public List<Reservation> getReservationsByOffre(@PathVariable Long offreId) {
        Offre offre = offreService.getOffreById(offreId);
        return reservationService.getReservationsByOffre(offre);
    }
}