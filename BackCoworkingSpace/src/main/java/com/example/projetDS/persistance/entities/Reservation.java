package com.example.projetDS.persistance.entities;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Reservation {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty
    private String dateDebut;
    @JsonProperty
    private String dateFin;
    @JsonProperty
    private String etat; // En attente, Confirmée, refusée
    @JsonProperty
    private String commentaire;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty
    private User user; 

    @ManyToOne
    @JoinColumn(name = "offre_id")
    @JsonProperty
    private Offre offre; 


	public Reservation(Long id, String dateDebut, String dateFin, String etat, String commentaire, User user,
			Offre offre) {
		super();
		this.id = id;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.etat = etat;
		this.commentaire = commentaire;
		this.user = user;
		this.offre = offre;
	} 	
	public Reservation() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDateDebut() {
		return dateDebut;
	}
	public void setDateDebut(String dateDebut) {
		this.dateDebut = dateDebut;
	}
	public String getDateFin() {
		return dateFin;
	}
	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
	}
	public String getEtat() {
		return etat;
	}
	public void setEtat(String etat) {
		this.etat = etat;
	}
	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Offre getOffre() {
		return offre;
	}
	public void setOffre(Offre offre) {
		this.offre = offre;
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
		Reservation other = (Reservation) obj;
		return Objects.equals(id, other.id);
	}
	@Override
	public String toString() {
		return "Reservation [id=" + id + ", dateDebut=" + dateDebut + ", dateFin=" + dateFin + ", etat=" + etat
				+ ", commentaire=" + commentaire + ", user=" + user + ", offre=" + offre + 
				"]";
	} 
    
    

}
