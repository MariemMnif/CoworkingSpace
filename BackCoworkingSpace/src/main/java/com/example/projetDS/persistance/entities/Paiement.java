package com.example.projetDS.persistance.entities;

import java.util.Objects;

import jakarta.persistence.*;

@Entity
public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double montant;
    private String datePaiement;
    private String methodePaiement;

    @OneToOne
    @JoinColumn(name = "reservation_id") 
    private Reservation reservation;
    

    
	public Paiement(Long id, double montant, String datePaiement, String methodePaiement, Reservation reservation) {
		super();
		this.id = id;
		this.montant = montant;
		this.datePaiement = datePaiement;
		this.methodePaiement = methodePaiement;
		this.reservation = reservation;
	}

	public Paiement() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getMontant() {
		return montant;
	}

	public void setMontant(double montant) {
		this.montant = montant;
	}

	public String getDatePaiement() {
		return datePaiement;
	}

	public void setDatePaiement(String datePaiement) {
		this.datePaiement = datePaiement;
	}

	public String getMethodePaiement() {
		return methodePaiement;
	}

	public void setMethodePaiement(String methodePaiement) {
		this.methodePaiement = methodePaiement;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}

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
		Paiement other = (Paiement) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Paiement [id=" + id + ", montant=" + montant + ", datePaiement=" + datePaiement + ", methodePaiement="
				+ methodePaiement + "]";
	}

	
}
