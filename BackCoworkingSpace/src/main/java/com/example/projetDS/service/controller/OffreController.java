package com.example.projetDS.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Salle;
import com.example.projetDS.service.interfaces.IOffre;
import com.example.projetDS.service.interfaces.ISalle;


@RestController
@RequestMapping("/api/offre")
@CrossOrigin(origins = "http://localhost:4200")
public class OffreController {
    @Autowired
    private IOffre offreService;
    @Autowired
    private ISalle salleService;
    
    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public Offre createOffre(@RequestBody Offre offre) {
        return offreService.saveOffre(offre);
    }


    @PutMapping("/update")
    @CrossOrigin
    public Offre updateOffre(@RequestBody Offre offre) {
        return offreService.updateOffre(offre);
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public Offre getOffreById(@PathVariable Long id) {
        return offreService.getOffreById(id);
    }

    @GetMapping("/all")
    @CrossOrigin
    public List<Offre> getAllOffres() {
        return offreService.getAllOffres();
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin
    public void deleteOffre(@PathVariable Long id) {
        offreService.deleteOffre(id);
    }

    @GetMapping("/salle/{salleId}")
    @CrossOrigin
    public List<Offre> getOffresBySalle(@PathVariable Long salleId) {
        return offreService.getOffresBySalle(salleId);
    }

    @GetMapping("/getOffreByNom/{nom}")
    @CrossOrigin
    public Offre getOffreByNom(@PathVariable String nom) {
        return offreService.getOffreByNom(nom);
    }
   @CrossOrigin
    @GetMapping("/findOffreBySalle/{salleId}")
    public List<Offre> findOffreBySalle( @PathVariable Long salleId) {
    	    Salle salle = salleService.getSalleById(salleId);
    return offreService.findOffresBySalle(salle);
    }
   
}

