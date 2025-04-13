package com.example.projetDS.persistance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.persistance.entities.Salle;

public interface SalleRepository extends JpaRepository<Salle, Long> {
	Salle findByNom(String nom);
	List<Salle> findByCategorie (Categorie categorie);

}
