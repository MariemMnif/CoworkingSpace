import { Injectable } from '@angular/core';
import { Salle } from './salle.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface Offre {
  id: number;
  nom: string;
  prix: number;
  description: string;
  capaciteMax: number;
  duree: string;
  salle: Salle;
}
@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:9002/api/offre';

  constructor(private http: HttpClient) { }


  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/all`);
  }


  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`);
  }


  createOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(this.apiUrl, offre);
  }

  updateOffre(offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/update`, offre);
  }


  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getOffresBySalle(salleId: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/salle/${salleId}`);
  }


  findOffresBySalle(salleId: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/findOffreBySalle/${salleId}`);
  }

  getOffreByNom(nom: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/getOffreByNom/${nom}`);
  }
}