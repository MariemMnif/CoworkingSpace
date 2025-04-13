import { Injectable } from '@angular/core';
import { Categorie } from './categorie.service';
import { Equipement } from './equipement.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Salle {
  id: number;
  nom: string;
  etat: string;
  description: string;
  capacite: number;
  image: string;
  categorie: Categorie;
  equipements: Equipement[];
}
@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://localhost:9002/api/salle';

  constructor(private http: HttpClient) {

  }

  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/all`);
  }

  getSalleById(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/${id}`);
  }

  findSalleByCategorie(categorieId: number): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/findSalleByCategorie/${categorieId}`);
  }

  createSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }


  updateSalle(salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/update`, salle);
  }


  deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}