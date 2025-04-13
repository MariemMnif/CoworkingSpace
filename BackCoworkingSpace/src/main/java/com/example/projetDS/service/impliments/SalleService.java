package com.example.projetDS.service.impliments;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.CategorieRepository;
import com.example.projetDS.persistance.dao.SalleRepository;
import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.persistance.entities.Salle;
import com.example.projetDS.service.interfaces.ISalle;

@Service
public class SalleService implements ISalle{
    @Autowired
    private SalleRepository salleRepository;
    @Autowired
    private CategorieRepository categorieRepository;

	@Override
	public List<Salle> getAllSalles() {
		// TODO Auto-generated method stub
		return salleRepository.findAll();
	}

	@Override
	public Salle getSalleById(Long id) {
		// TODO Auto-generated method stub
		return salleRepository.findById(id).get();
	}

	@Override
	public Salle saveSalle(Salle salle) {
		// TODO Auto-generated method stub
        Salle existingSalle = salleRepository.findByNom(salle.getNom());
        if (existingSalle != null) {
            throw new RuntimeException("Une salle avec ce nom existe déjà !");
        }
        if (salle.getCategorie() != null && salle.getCategorie().getId() != null) {
            Categorie categorie = categorieRepository.findById(salle.getCategorie().getId())
                    .orElseThrow(() -> new RuntimeException("Categorie not found"));
            salle.setCategorie(categorie);
        }
            
        if (salle.getEquipements() != null && !salle.getEquipements().isEmpty()) {
            salle.setEquipements(salle.getEquipements());  
        }
        return salleRepository.save(salle);
	}

	@Override
	public Salle updateSalle(Salle salle) {
		// TODO Auto-generated method stub
        Salle existingSalle = salleRepository.findById(salle.getId())
                .orElseThrow(() -> new RuntimeException("Salle introuvable !"));
        
        Salle salleWithSameName = salleRepository.findByNom(salle.getNom());
        if (salleWithSameName != null && !salleWithSameName.getId().equals(salle.getId())) {
            throw new RuntimeException("Une salle avec ce nom existe déjà !");
        }

        existingSalle.setNom(salle.getNom());
        existingSalle.setEtat(salle.getEtat());
        existingSalle.setDescription(salle.getDescription());
        existingSalle.setCapacite(salle.getCapacite());
        existingSalle.setImage(salle.getImage());
        existingSalle.setCategorie(salle.getCategorie());
        existingSalle.setEquipements(salle.getEquipements());

        return salleRepository.save(existingSalle);
	}

	@Override
	public void deleteSalle(Long id) {
		// TODO Auto-generated method stub
		salleRepository.deleteById(id);
		
	}

	@Override
	public List<Salle> findSalleByCategorie(Categorie categorie) {
		// TODO Auto-generated method stub
		return salleRepository.findByCategorie(categorie);
	}

}
