package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Salle;

public interface IOffre {
    Offre saveOffre(Offre offre);
    Offre updateOffre(Offre offre);
    Offre getOffreById(Long id);
    List<Offre> getAllOffres();
    void deleteOffre(Long id);
    List<Offre> getOffresBySalle(Long salleId);
    Offre getOffreByNom(String nom);
    List<Offre> findOffresBySalle(Salle salle);

}
