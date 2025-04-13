package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.Equipement;

public interface IEquipement {
    List<Equipement> getAllEquipements();
    Equipement getEquipementById(Long id);
    Equipement saveEquipement(Equipement equipement);
    Equipement updateEquipement(Equipement equipement);
    void deleteEquipement(Long id);
    Equipement getEquipementByNom(String nom);

}
