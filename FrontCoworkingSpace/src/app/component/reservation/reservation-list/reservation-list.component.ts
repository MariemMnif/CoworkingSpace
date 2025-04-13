import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {
  reservations: any[] = [];
  filteredReservations: any[] = [];
  searchTerm: string = '';

  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (response) => {
        this.reservations = response;
        this.filteredReservations = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations :', err);
      },
    });
  }

  onSearch(): void {
    this.filteredReservations = this.reservations.filter((reservation) =>
      reservation.etat.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onAddReservation(): void {
    console.log('Redirection vers le formulaire d’ajout de réservation.');
    this.router.navigate(['reservations/add-reservation']);
  }

  onEditReservation(id: number): void {
    console.log(`Modification de la réservation avec l’ID : ${id}`);
    this.router.navigate([`reservations/edit-reservation/${id}`]);
  }

  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        console.log('Réservation supprimée avec succès.');
        this.getAllReservations();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la réservation :', err);
      },
    });
  }
}
