package com.example.projetDS.persistance.entities;

import java.util.Objects;

import jakarta.persistence.*;

@Entity
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private double prix;
    private String description;
    private int capaciteMax;
    private String  duree; 

    @ManyToOne
    private Salle salle;

	public Offre(Long id, String nom, double prix, String description, int capaciteMax, String duree, Salle salle) {
		super();
		this.id = id;
		this.nom = nom;
		this.prix = prix;
		this.description = description;
		this.capaciteMax = capaciteMax;
		this.duree = duree;
		this.salle = salle;
	}
    
	public Offre() {
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

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCapaciteMax() {
		return capaciteMax;
	}

	public void setCapaciteMax(int capaciteMax) {
		this.capaciteMax = capaciteMax;
	}

	public String getDuree() {
		return duree;
	}

	public void setDuree(String duree) {
		this.duree = duree;
	}

	public Salle getSalle() {
		return salle;
	}

	public void setSalle(Salle salle) {
		this.salle = salle;
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
		Offre other = (Offre) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Offre [id=" + id + ", nom=" + nom + ", prix=" + prix + ", description=" + description + ", capaciteMax="
				+ capaciteMax + ", duree=" + duree + ", salle=" + salle + "]";
	}
    
    
}
