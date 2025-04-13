package com.example.projetDS.persistance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Salle;

public interface OffreRepository  extends JpaRepository<Offre, Long> {
	
    @Query("SELECT o FROM Offre o WHERE o.salle.id = :salleId")
    List<Offre> findBySalleId(@Param("salleId") Long salleId);
    
    Offre findByNom(String nom);
    List<Offre> findBySalle(Salle salle);

}
