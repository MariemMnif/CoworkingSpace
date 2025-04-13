import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Categorie {
  id: number;
  nom: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:9002/api/categorie';  // URL de l'API des catégories

  // Récupérer toutes les catégories
  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/all`, {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    });
  }

  // Récupérer une catégorie par son ID
  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/getCategorieById/${id}`);
  }

  // Créer une nouvelle catégorie
  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Mettre à jour une catégorie existante
  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/update`, categorie, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Supprimer une catégorie
  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Récupérer une catégorie par son nom
  getCategorieByNom(nom: string): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/getCategorieByNom/${nom}`);
  }

}
