import { Component, OnInit } from '@angular/core';
import { Feedback, FeedbackService } from '../../services/feedback.service';
import { Categorie, CategorieService } from '../../services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-accueil',
  templateUrl: './client-accueil.component.html',
  styleUrl: './client-accueil.component.scss'
})
export class ClientAccueilComponent implements OnInit {
  feedbacks: Feedback[] = [];
  categories: Categorie[] = [];
  ngOnInit(): void {
    this.loadFeedbacks()
    this.loadCategories()
  }
  constructor( private router: Router,private feedbackService: FeedbackService, private categorieService: CategorieService) { }
  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des categories', err);
      }
    });
  }
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (response) => {
        this.feedbacks = response;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des feedback', err);
      }
    });
  } feedback = { note: 4.5 };  // Exemple de feedback

  // Fonction pour obtenir l'étoile complète, moitié, ou vide
  getStars(note: number): string[] {
    let stars = [];
    const fullStars = Math.floor(note); // Nombre d'étoiles pleines
    const hasHalfStar = note % 1 >= 0.5; // Vérifie si on a une demi-étoile

    for (let i = 0; i < fullStars; i++) {
      stars.push('full'); // Ajouter une étoile pleine
    }

    if (hasHalfStar) {
      stars.push('half'); // Ajouter une demi-étoile
    }

    // Compléter avec des étoiles vides si nécessaire
    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  }
  voirOffres(categorieId: number): void {
    this.router.navigate(['/offres', categorieId]);  // Redirige vers la page des offres
  }
}
