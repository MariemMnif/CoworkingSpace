package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.persistance.entities.Salle;

public interface ISalle {
    List<Salle> getAllSalles();
    Salle getSalleById(Long id);
    Salle saveSalle(Salle salle);
    Salle updateSalle(Salle salle);
    void deleteSalle(Long id);
    List<Salle> findSalleByCategorie (Categorie categorie);
}
