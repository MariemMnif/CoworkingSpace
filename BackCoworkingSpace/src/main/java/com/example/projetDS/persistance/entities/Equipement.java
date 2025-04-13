package com.example.projetDS.persistance.entities;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty
    private String nom;
    @JsonProperty
    private String description;
    @JsonProperty
    private int quantite;
    
    @ManyToMany(mappedBy = "equipements")
    @JsonIgnore
    private List<Salle> salles;

	public Equipement(Long id, String nom, String description, int quantite, List<Salle> salles) {
		super();
		this.id = id;
		this.nom = nom;
		this.description = description;
		this.quantite = quantite;
		this.salles = salles;
	}
    
	public Equipement() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public List<Salle> getSalles() {
		return salles;
	}

	public void setSalles(List<Salle> salles) {
		this.salles = salles;
	}

	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Equipement other = (Equipement) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Equipement [id=" + id + ", nom=" + nom + ", description=" + description + ", quantite=" + quantite
				+ ", salles=" + salles + "]";
	}

	

}
