package com.example.projetDS.persistance.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.Categorie;
public interface CategorieRepository  extends JpaRepository<Categorie, Long>{
	Categorie findByNom(String nom);

}
