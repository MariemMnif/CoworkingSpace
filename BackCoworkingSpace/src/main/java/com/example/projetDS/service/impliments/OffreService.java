package com.example.projetDS.service.impliments;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.OffreRepository;
import com.example.projetDS.persistance.dao.SalleRepository;
import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.persistance.entities.Offre;
import com.example.projetDS.persistance.entities.Salle;
import com.example.projetDS.service.interfaces.IOffre;

@Service
public class OffreService implements IOffre {
	
    @Autowired
    private OffreRepository offreRepository;
    @Autowired
    private SalleRepository salleRepository;
    

	@Override
	public Offre saveOffre(Offre offre) {
		// TODO Auto-generated method stub
		Offre existingOffre = offreRepository.findByNom(offre.getNom());
        if (existingOffre != null) {
            throw new RuntimeException("Une offre avec ce nom existe déjà !");
        }

        if (offre.getPrix() <= 0) {
            throw new RuntimeException("Le prix de l'offre doit être supérieur à zéro");
        }
        if (offre.getSalle() == null || offre.getSalle().getId() == null) {
            throw new RuntimeException("La salle associée à l'offre ne peut pas être nulle");
        }

        Salle salle = salleRepository.findById(offre.getSalle().getId())
            .orElseThrow(() -> new RuntimeException("Salle non trouvée"));

        offre.setSalle(salle);

        return offreRepository.save(offre);
    }

	@Override
	public Offre updateOffre(Offre offre) {
		// TODO Auto-generated method stub
	    Optional<Offre> existingOffreOptional = offreRepository.findById(offre.getId());
	    if (existingOffreOptional.isPresent()) {
	        Offre existingOffre = existingOffreOptional.get();
	        
	        Offre offreWithSameName = offreRepository.findByNom(offre.getNom());
	        if (offreWithSameName != null && !offreWithSameName.getId().equals(offre.getId())) {
	            throw new RuntimeException("Une offre avec ce nom existe déjà !");
	        }
	        
	        existingOffre.setNom(offre.getNom());
	        existingOffre.setPrix(offre.getPrix());
	        existingOffre.setDescription(offre.getDescription());
	        existingOffre.setCapaciteMax(offre.getCapaciteMax());
	        existingOffre.setDuree(offre.getDuree());
	        Salle salle = salleRepository.findById(offre.getSalle().getId())
	                .orElseThrow(() -> new RuntimeException("Salle non trouvée"));

	            offre.setSalle(salle);
	        existingOffre.setSalle(salle);
	        
	        return offreRepository.save(existingOffre);
	    } else {
	        throw new RuntimeException("Offre non trouvée !");
	    }
	}

	@Override
	public Offre getOffreById(Long id) {
		// TODO Auto-generated method stub
		return offreRepository.findById(id).get();
	}

	@Override
	public List<Offre> getAllOffres() {
		// TODO Auto-generated method stub
		return offreRepository.findAll();
	}

	@Override
	public void deleteOffre(Long id) {
		// TODO Auto-generated method stub
		offreRepository.deleteById(id);
	}

	@Override
	public List<Offre> getOffresBySalle(Long salleId) {
		// TODO Auto-generated method stub
		return offreRepository.findBySalleId(salleId);
	}

	@Override
	public Offre getOffreByNom(String nom) {
		// TODO Auto-generated method stub
		return offreRepository.findByNom(nom);
	}

	@Override
	public List<Offre> findOffresBySalle(Salle salle) {
		// TODO Auto-generated method stub
		return offreRepository.findBySalle(salle);
	}


}
