package com.example.projetDS.persistance.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.Equipement;

public interface EquipementRepository  extends JpaRepository<Equipement, Long> {
	 Equipement findByNom(String nom);

}
