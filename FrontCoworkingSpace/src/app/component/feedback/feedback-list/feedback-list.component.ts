import { Component, OnInit } from '@angular/core';
import { Feedback, FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks1(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des feedbacks', error);
      }
    );
  }
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (response) => {
        this.feedbacks = response;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des feedbacks', err);
      }
    });
  }
}