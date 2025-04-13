import { Injectable } from '@angular/core';
import { User } from './user.service';
import { Offre } from './offre.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from './salle.service';

export interface Reservation {
  id: number;
  dateDebut: string;
  dateFin: string;
  etat: string;
  commentaire: string;
  user: User;
  offre: Offre;
}
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:9002/api/reservation';

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}`, reservation);
  }


  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/update`, reservation);
  }


  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/getReservationById/${id}`);
  }


  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/all`);
  }


  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


  getReservationsByEtat(etat: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/getReservationsByEtat/${etat}`);
  }

  getReservationsByUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/getReservationsByUser/${userId}`);
  }

  getReservationsByOffre(offreId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/getReservationsByOffre/${offreId}`);
  }
  getOffreByIdReservation(reservationId: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/getOffreByIdReservation/${reservationId}`);
  }

  getSalleByIdReservation(reservationId: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/getSalleByIdReservation/${reservationId}`);
  }

  getUserByIdReservation(reservationId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserByIdReservation/${reservationId}`);
  }

}