import { Component, OnInit } from '@angular/core';
import { Salle, SalleService } from '../../../services/salle.service';
import { User, UserService } from '../../../services/user.service';
import { ReservationService } from '../../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre, OffreService } from '../../../services/offre.service';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrl: './reservation-edit.component.scss'
})
export class ReservationEditComponent implements OnInit {
  reservation: any = {
    id: 0,
    user: { id: 0, nom: "", prenom: "", email: "", mdp: "", role: 0, },
    offre: { nom: '', prix: 0, description: '', capaciteMax: 0, duree: '', salle: { nom: '', etat: '', description: '', capacite: null, image: '', categorie: null }, },
    dateDebut: '',
    dateFin: '',
    etat: '',
    commentaire: '',
  };
  salles: Salle[] = [];
  filteredUsers: User[] = [];
  users: User[] = [];
  offres: Offre[] = [];

  constructor(
    private reservationService: ReservationService,
    private salleService: SalleService,
    private userService: UserService, private offreService: OffreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.getReservationById(+id);
      this.getAllSalles();
      this.getAllOffres();
      this.loadUsersByRole(0);
    } else {
      console.error('ID invalide ou manquant:', id);
    }
  }
  getOffreBySalle(salleId: number): void {
    // Charge les offres associées à une salle spécifique
    this.offreService.getOffresBySalle(salleId).subscribe({
      next: (response) => {
        this.offres = response;
        console.log('Offres pour la salle:', response);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des offres:', err);
      },
    });
  }
  getOffreById(id: number): void {
    this.offreService.getOffreById(id).subscribe({
      next: (response) => {
        this.reservation.offre = response;

        // Charger les offres en fonction de la salle de la réservation (si applicable)
        if (this.reservation.offre && this.reservation.offre.salle) {
          this.getOffreBySalle(this.reservation.offre.salle.id);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'offre:', err);
      },
    });
  }

  getReservationById(id: number): void {
    this.reservationService.getReservationById(id).subscribe({
      next: (response) => {
        this.reservation = response;

        // Associer l'utilisateur
        this.userService.getUserById(this.reservation.user.id).subscribe({
          next: (user) => this.reservation.user = user,
          error: (err) => console.error('Erreur lors de la récupération de l\'utilisateur:', err),
        });

        if (this.reservation.offre?.salle?.id) {
          this.salleService.getSalleById(this.reservation.offre.salle.id).subscribe({
            next: (salle) => this.reservation.offre.salle = salle,
            error: (err) => console.error('Erreur lors de la récupération de la salle:', err),
          });
        }
        if (this.reservation.salle && this.reservation.salle.id) {
          console.log('Salle trouvée:', this.reservation.salle);
        }
        // Associer l'offre
        this.getOffreById(this.reservation.offre?.id);

        console.log('Données de la réservation chargées:', this.reservation);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la réservation:', err);
      },
    });
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

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe({
      next: (response) => {
        this.offres = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des salles:', err);
      },
    });
  }

  loadUsersByRole(role: number): void {
    this.userService.getUsersByRole(role).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: (err) => {
        console.error('Erreur de chargement des utilisateurs:', err);
      }
    });
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
    console.log('Réservation mise à jour:', this.reservation);
    const updatedReservation = {
      ...this.reservation,
      user: this.reservation.user,
      salle: this.reservation.salle,
    };

    this.reservationService.updateReservation(updatedReservation).subscribe({
      next: (response) => {
        console.log('Réservation mise à jour avec succès:', response);
        this.router.navigate(['/reservations/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la réservation:', err);
      },
    });
  }

  goToListe(): void {
    this.router.navigate(['/reservations/list']);
  }
}