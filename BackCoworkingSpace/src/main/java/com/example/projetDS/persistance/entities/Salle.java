package com.example.projetDS.persistance.entities;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty
    private String nom;
    @JsonProperty
    private String etat;
    @JsonProperty
    private String description;
    @JsonProperty
    private int capacite;
    @JsonProperty
    private String image;
    
   @ManyToOne
   @JsonProperty
   private Categorie categorie;
   
   @OneToMany(mappedBy = "salle")
   @JsonIgnore
   private List<Offre> offres;
   
   @ManyToMany
   private List<Equipement> equipements;

  public Salle() {
		super();
	}
   public Salle(Long id, String nom, String etat, String description, int capacite, String image, Categorie categorie,
		List<Offre> offres, List<Equipement> equipements) {
	super();
	this.id = id;
	this.nom = nom;
	this.etat = etat;
	this.description = description;
	this.capacite = capacite;
	this.image = image;
	this.categorie = categorie;
	this.offres = offres;
	this.equipements = equipements;
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
   public String getEtat() {
		return etat;
	}
   public void setEtat(String etat) {
		this.etat = etat;
	}
   public String getDescription() {
		return description;
	}
   public void setDescription(String description) {
		this.description = description;
	}
   public int getCapacite() {
		return capacite;
	}
   public void setCapacite(int capacite) {
		this.capacite = capacite;
	}
   public String getImage() {
		return image;
	}
   public void setImage(String image) {
		this.image = image;
	}
   public Categorie getCategorie() {
		return categorie;
	}
   public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}
   public List<Offre> getOffres() {
		return offres;
	}
   public void setOffres(List<Offre> offres) {
		this.offres = offres;
	}
	
   public List<Equipement> getEquipements() {
	return equipements;
}
public void setEquipements(List<Equipement> equipements) {
	this.equipements = equipements;
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
		Salle other = (Salle) obj;
		return Objects.equals(id, other.id);
	}
	@Override
	public String toString() {
		return "Salle [id=" + id + ", nom=" + nom + ", etat=" + etat + ", description=" + description + ", capacite="
				+ capacite + ", image=" + image + ", categorie=" + categorie + ", offres=" + offres + "]";
	}
   
   
   

}
