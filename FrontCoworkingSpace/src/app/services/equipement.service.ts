import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Equipement {
  id: number;
  nom: string;
  description: string;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private apiUrl = 'http://localhost:9002/api/equipement'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  // Récupérer tous les équipements
  getAllEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.apiUrl}/all`, {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    });
  }

  // Récupérer un équipement par son ID
  getEquipementById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.apiUrl}/getEquipementById/${id}`);
  }

  // Créer un nouvel équipement
  createEquipement(equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(`${this.apiUrl}`, equipement, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  // Mettre à jour un équipement
  updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.apiUrl}/update`, equipement, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Supprimer un équipement
  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Récupérer un équipement par son nom
  getEquipementByNom(nom: string): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.apiUrl}/getEquipementByNom/${nom}`);
  }
}