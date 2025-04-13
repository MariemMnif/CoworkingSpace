import { Injectable } from '@angular/core';
import { Reservation } from './reservation.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface Paiement {
  id: number;
  montant: number;
  datePaiement: string;
  methodePaiement: string;
  reservation: Reservation;
}
@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://localhost:9002/api/paiement'; 

  constructor(private http: HttpClient) { }

 
  getAllPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/all`);
  }

  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/getPaiementById/${id}`);
  }

 
  createPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }


  updatePaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/update`, paiement);
  }

  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


  findByReservation(reservationId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/findByReservation/${reservationId}`);
  }


  findByMethodePaiement(methodePaiement: string): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/findByMethodePaiement/${methodePaiement}`);
  }
}
