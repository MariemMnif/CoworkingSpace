package com.example.projetDS.service.impliments;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.EquipementRepository;
import com.example.projetDS.persistance.entities.Equipement;
import com.example.projetDS.service.interfaces.IEquipement;

@Service
public class EquipementService implements IEquipement {
	 @Autowired
	    private EquipementRepository equipementRepository;

	@Override
	public List<Equipement> getAllEquipements() {
		// TODO Auto-generated method stub
		return equipementRepository.findAll();
	}

	@Override
	public Equipement getEquipementById(Long id) {
		// TODO Auto-generated method stub
		return equipementRepository.findById(id).get();
	}

	@Override
	public Equipement saveEquipement(Equipement equipement) {
		// TODO Auto-generated method stub
        Equipement existingEquipement = equipementRepository.findByNom(equipement.getNom());
        if (existingEquipement != null) {
            throw new RuntimeException("Un équipement avec ce nom existe déjà !");
        }
        return equipementRepository.save(equipement);
	}

	@Override
	public Equipement updateEquipement(Equipement equipement) {
		// TODO Auto-generated method stub
        Optional<Equipement> existingEquipementOptional = equipementRepository.findById(equipement.getId());
        if (existingEquipementOptional.isPresent()) {
            Equipement equipementWithSameName = equipementRepository.findByNom(equipement.getNom());
            if (equipementWithSameName != null && !equipementWithSameName.getId().equals(equipement.getId())) {
                throw new RuntimeException("Un équipement avec ce nom existe déjà !");
            }

            Equipement existingEquipement = existingEquipementOptional.get();
            existingEquipement.setNom(equipement.getNom());
            existingEquipement.setDescription(equipement.getDescription());
            existingEquipement.setQuantite(equipement.getQuantite());

            return equipementRepository.saveAndFlush(existingEquipement);
        } else {
            throw new RuntimeException("Equipement non trouvé !");
        }
	}

	@Override
	public void deleteEquipement(Long id) {
		// TODO Auto-generated method stub
		equipementRepository.deleteById(id);
		
	}

	@Override
	public Equipement getEquipementByNom(String nom) {
		// TODO Auto-generated method stub
		return equipementRepository.findByNom(nom);
	}

}
