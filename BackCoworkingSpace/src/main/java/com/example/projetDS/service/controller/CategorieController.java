package com.example.projetDS.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetDS.persistance.entities.Categorie;
import com.example.projetDS.service.impliments.CategorieService;

@RestController
@RequestMapping("/api/categorie")
@CrossOrigin(origins = "http://localhost:4200")
public class CategorieController {
	
    @Autowired
    private CategorieService categorieService;

    @GetMapping("/all")
    @CrossOrigin
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("getCategorieById/{id}")
    @CrossOrigin
    public Categorie getCategorieById(@PathVariable Long id) {
        return categorieService.getCategorieById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST, consumes="application/json", produces = "application/json")
    @CrossOrigin
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.saveCategorie(categorie);
    }
    
	@PutMapping("/update")
	 @CrossOrigin
	Categorie updateCategorie( @RequestBody Categorie categorie) {
		Categorie updatedCategorie = categorieService.updateCategorie(categorie);
	    return updatedCategorie;
	 }    

    @DeleteMapping("delete/{id}")
    @CrossOrigin
    public void deleteCategorie(@PathVariable Long id) {
        categorieService.deleteCategorie(id);
    }

    @GetMapping("/getCategorieByNom/{nom}")
    public Categorie getCategorieByNom(@PathVariable String nom) {
        return categorieService.getCategorieByNom(nom);
    }
	   
}//
