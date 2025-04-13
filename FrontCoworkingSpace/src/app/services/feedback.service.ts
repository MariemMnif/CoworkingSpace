import { Injectable } from '@angular/core';
import { User } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  id?: number;
  note: number;
  commentaire: string;
  user: User;
}
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:9002/api/feedback';

  constructor(private http: HttpClient) { }

  // Récupérer tous les feedbacks
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un feedback par ID
  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/getFeedbackById/${id}`);
  }

  // Créer un nouveau feedback
  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  // Mettre à jour un feedback existant
  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/update`, feedback);
  }

  // Supprimer un feedback par ID
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Récupérer les feedbacks pour un utilisateur spécifique par son ID
  getFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }
}