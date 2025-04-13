package com.example.projetDS.persistance.entities;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty
    private int note; // note entre 1 et 5
    @JsonProperty
    private String commentaire;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty
    private User user;

	public Feedback(Long id, int note, String commentaire, User user) {
		super();
		this.id = id;
		this.note = note;
		this.commentaire = commentaire;
		this.user = user;
	}
	public Feedback() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getNote() {
		return note;
	}
	public void setNote(int note) {
		this.note = note;
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
		Feedback other = (Feedback) obj;
		return Objects.equals(id, other.id);
	}
	@Override
	public String toString() {
		return "Feedback [id=" + id + ", note=" + note + ", commentaire=" + commentaire + ", user=" + user + "]";
	}
    
    

}
