import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { OffreService } from '../../services/offre.service';
import { ReservationService } from '../../services/reservation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrl: './admin-accueil.component.scss'
})
export class AdminAccueilComponent implements OnInit {
  feedbacks: any[] = [];
  offres: any[] = [];
  reservations: any[] = [];
  users: any[] = [];
  newReservations: any[] = [];
  constructor(
    private feedbackService: FeedbackService,
    private offreService: OffreService,
    private reservationService: ReservationService,
    private userService: UserService,
    // Injection du service des réservations
  ) { }

  ngOnInit(): void {
    this.loadFeedbacks();
    this.loadOffres();
    this.loadReservations(); // Charger les réservations
    this.loadUsers();
    this.loadNewReservations(); // Charger les utilisateurs
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  loadOffres(): void {
    this.offreService.getAllOffres().subscribe(data => {
      this.offres = data;
    });
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe(data => {
      this.reservations = data;
    });
  }
  loadUsers(): void {
    this.userService.getUsersByRole(0).subscribe(data => {
      this.users = data;
    });
  }
  loadNewReservations(): void {
    this.reservationService.getReservationsByEtat("En attente").subscribe(data => {
      this.newReservations = data;
    });
  }
}