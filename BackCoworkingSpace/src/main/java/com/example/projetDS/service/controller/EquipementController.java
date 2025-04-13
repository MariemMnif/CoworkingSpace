package com.example.projetDS.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.projetDS.persistance.entities.Equipement;
import com.example.projetDS.service.impliments.EquipementService;

@RestController
@RequestMapping("/api/equipement")
@CrossOrigin(origins = "http://localhost:4200")
public class EquipementController {
	@Autowired
    private EquipementService equipementService;

    @GetMapping("/all")
    @CrossOrigin
    public List<Equipement> getAllEquipements() {
        return equipementService.getAllEquipements();
    }

    @GetMapping("/getEquipementById/{id}")
    @CrossOrigin
    public Equipement getEquipementById(@PathVariable Long id) {
        return equipementService.getEquipementById(id);
    }

    @RequestMapping(method = RequestMethod.POST, consumes="application/json", produces = "application/json")
    @CrossOrigin
    public Equipement createEquipement(@RequestBody Equipement equipement) {
        return equipementService.saveEquipement(equipement);
    }

    @PutMapping("/update")
    @CrossOrigin
    public Equipement updateEquipement(@RequestBody Equipement equipement) {
        return equipementService.updateEquipement(equipement);
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin
    public void deleteEquipement(@PathVariable Long id) {
        equipementService.deleteEquipement(id);
    }

    @GetMapping("/getEquipementByNom/{nom}")
    @CrossOrigin
    public Equipement getEquipementByNom(@PathVariable String nom) {
        return equipementService.getEquipementByNom(nom);
    }
}