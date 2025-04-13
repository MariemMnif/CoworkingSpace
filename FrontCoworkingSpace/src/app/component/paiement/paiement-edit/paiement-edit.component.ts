import { Component, OnInit } from '@angular/core';
import { Paiement, PaiementService } from '../../../services/paiement.service';
import { Reservation, ReservationService } from '../../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paiement-edit',
  templateUrl: './paiement-edit.component.html',
  styleUrl: './paiement-edit.component.scss'
})
export class PaiementEditComponent implements OnInit {
  paiement: any = {
    id: 0,
    montant: 0,
    datePaiement: '',
    methodePaiement: '',
    reservation: {
      user: { id: 0, nom: "", prenom: "", email: "", mdp: "", role: 0 },
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllReservations();
    this.activatedRoute.params.subscribe(params => {
      const paiementId = +params['id'];
      this.getPaiement(paiementId);
    });
  }

  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (response) => {
        this.reservations = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations:', err);
      }
    });
  }

  getPaiement(id: number): void {
    this.paiementService.getPaiementById(id).subscribe({
      next: (paiement) => {
        this.paiement = paiement;
        if (this.paiement.reservation) {
          this.paiement.montant = this.paiement.reservation.offre ? this.paiement.reservation.offre.prix : 0;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du paiement:', err);
      }
    });
  }


  onReservationChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    const selectedReservation = this.reservations.find(reservation => reservation.id === +value);
    if (selectedReservation) {
      // Mise à jour de la réservation sélectionnée et du montant
      this.paiement.reservation = selectedReservation;
      this.paiement.montant = selectedReservation.offre ? selectedReservation.offre.prix : 0;
    }
  }

  onSubmit(): void {
    this.paiementService.updatePaiement(this.paiement).subscribe({
      next: (response) => {
        console.log('Paiement mis à jour avec succès:', response);
        this.router.navigate(['/paiements/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du paiement:', err);
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['/paiements/list']);
  }
}