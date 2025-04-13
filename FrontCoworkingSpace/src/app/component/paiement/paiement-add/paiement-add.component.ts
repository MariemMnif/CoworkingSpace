import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paiement, PaiementService } from '../../../services/paiement.service';
import { Reservation, ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-paiement-add',
  templateUrl: './paiement-add.component.html',
  styleUrl: './paiement-add.component.scss'
})
export class PaiementAddComponent implements OnInit {
  paiement: any = {
    montant: 0,
    datePaiement: '',
    methodePaiement: '',
    reservation: {
      user: { id: 0, nom: "", prenom: "", email: "", mdp: "", role: 0, },
      offre: null,
      salle: null,
      dateDebut: '',
      dateFin: '',
      etat: '',
      commentaire: '',
    },
  };
  reservations: Reservation[] = [];

  constructor(
    private paiementService: PaiementService,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllReservations();
    this.paiement.datePaiement = this.getTodayDate();
  }

  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (response) => {
        // Filtrer les réservations non payées
        this.reservations = [];
        response.forEach((reservation) => {
          this.paiementService.findByReservation(reservation.id).subscribe({
            next: (paiements) => {
              // Si aucun paiement n'est trouvé pour cette réservation, on la garde
              if (paiements.length === 0) {
                this.reservations.push(reservation);
              }
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des paiements:', err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations:', err);
      },
    });
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  // Mettre à jour les champs lorsque la réservation change
  onReservationChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    const selectedReservation = this.reservations.find(reservation => reservation.id === +value);
    if (selectedReservation) {
      this.paiement.reservation = selectedReservation;
      this.paiement.montant = selectedReservation.offre ? selectedReservation.offre.prix : 0;
    }
  }



  // Soumission du formulaire
  onSubmit(): void {
    console.log('Nouveau paiement:', this.paiement);


    this.paiementService.createPaiement(this.paiement).subscribe({
      next: (response) => {
        console.log('Paiement créé avec succès:', response);
        this.router.navigate(['/paiements/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la création du paiement:', err);
      },
    });
  }
  goToListe(): void {
    this.router.navigate(['paiements/list']);
  }
}