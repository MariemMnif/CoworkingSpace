package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.Categorie;

public interface ICategorie {
    List<Categorie> getAllCategories();
    Categorie getCategorieById(Long id);
    Categorie saveCategorie(Categorie categorie);
    Categorie updateCategorie(Categorie categorie);
    Categorie getCategorieByNom(String nom);
    void deleteCategorie(Long id);
}
