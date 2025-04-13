import { Component, OnInit } from '@angular/core';
import { Salle, SalleService } from '../../../services/salle.service';
import { User, UserService } from '../../../services/user.service';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';
import { Offre, OffreService } from '../../../services/offre.service';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrl: './reservation-add.component.scss'
})
export class ReservationAddComponent implements OnInit {
  reservation: any = {
    user: null,
    offre: null,
    salle: null,
    dateDebut: '',
    dateFin: '',
    etat: '',
    commentaire: '',
  };
  salles: Salle[] = [];
  filteredUsers: User[] = [];
  users: User[] = [];
  offres: Offre[] = [];  // Ajouter un tableau pour les offres de la salle sélectionnée

  constructor(
    private reservationService: ReservationService,
    private salleService: SalleService,
    private userService: UserService,
    private offreService: OffreService, // Ajoutez le service Offre
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSalles();
    this.loadUsersByRole(0);
  }

  getAllSalles(): void {
    this.salleService.getAllSalles().subscribe({
      next: (response) => {
        this.salles = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des salles:', err);
      },
    });
  }

  loadUsersByRole(role: number): void {
    this.userService.getUsersByRole(role).subscribe(
      (data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Erreur de chargement des utilisateurs par rôle:', error);
      }
    );
  }

  onSalleChange(salle: Salle): void {
    // Lorsque la salle change, charger les offres associées
    if (salle) {
      this.offreService.getOffresBySalle(salle.id).subscribe({
        next: (offres: Offre[]) => {
          this.offres = offres;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des offres:', err);
        }
      });
    }
  }

  onSubmit(): void {
    const newReservation = {
      ...this.reservation,
      user: this.reservation.user,
      salle: this.reservation.salle,
      offre: this.reservation.offre, // Inclure l'offre sélectionnée
    };

    this.reservationService.createReservation(newReservation).subscribe({
      next: (response) => {
        this.router.navigate(['/reservations/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la réservation:', err);
      },
    });
  }
  goToListe(): void {
    this.router.navigate(['/reservations/list']);
  }
}