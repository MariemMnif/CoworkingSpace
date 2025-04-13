package com.example.projetDS.service.impliments;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.CategorieRepository;
import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.service.interfaces.ICategorie;

@Service
public class CategorieService implements ICategorie {
	
    @Autowired
    private CategorieRepository categorieRepository;

	@Override
	public List<Categorie> getAllCategories() {
		// TODO Auto-generated method stub
		return categorieRepository.findAll();
	}

	@Override
	public Categorie getCategorieById(Long id) {
		// TODO Auto-generated method stub
		return categorieRepository.findById(id).get();
	}

	@Override
	public Categorie saveCategorie(Categorie categorie) {
		// TODO Auto-generated method stub
		if (categorieRepository.findByNom(categorie.getNom()) != null) {
			  throw new RuntimeException("Une catégorie avec ce nom existe déjà !");
		}
		return categorieRepository.save(categorie);
	}
	
	@Override
	public Categorie updateCategorie(Categorie categorie) {
		// TODO Auto-generated method stub
		 Optional<Categorie> existingCategorie = categorieRepository.findById(categorie.getId());
		    if (existingCategorie.isPresent()) {
		        Categorie categorieWithSameName = categorieRepository.findByNom(categorie.getNom());
		        
		        if (categorieWithSameName != null && !categorieWithSameName.getId().equals(categorie.getId())) {
		           throw new RuntimeException("Une catégorie avec ce nom existe déjà !");
		        }
		    }
		        existingCategorie.get().setNom(categorie.getNom());
		        existingCategorie.get().setDescription(categorie.getDescription());
		        return categorieRepository.saveAndFlush(existingCategorie.get());	    
    }
	

	@Override
	public void deleteCategorie(Long id) {
		// TODO Auto-generated method stub
		categorieRepository.deleteById(id);
	}

	@Override
	public Categorie getCategorieByNom(String nom) {
		// TODO Auto-generated method stub
		return categorieRepository.findByNom(nom);
	}



}
