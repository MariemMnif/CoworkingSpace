import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  role: number;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9002/api/user';

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`, {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    });
  }


  getUsersByRole(role: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getUserByRole/${role}`);
  }


  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserById/${id}`);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Récupérer un utilisateur par son email
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserByEmail/${email}`);
  }
}