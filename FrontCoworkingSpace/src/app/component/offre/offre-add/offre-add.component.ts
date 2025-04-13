import { Component, OnInit } from '@angular/core';
import { Offre, OffreService } from '../../../services/offre.service';
import { Router } from '@angular/router';
import { Salle, SalleService } from '../../../services/salle.service';

@Component({
  selector: 'app-offre-add',
  templateUrl: './offre-add.component.html',
  styleUrl: './offre-add.component.scss'
})
export class OffreAddComponent implements OnInit {
  offre: any = {
    nom: '',
    prix: 0,
    description: '',
    capaciteMax: 0,
    duree: '',
    salle: null,
  };
  salles: any[] = [];

  constructor(
    private offreService: OffreService,
    private salleService: SalleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSalles();
  }

  getAllSalles(): void {
    this.salleService.getAllSalles().subscribe({
      next: (response) => {
        this.salles = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des salles:', err);
      },
    });
  }

  onSubmit(): void {
    console.log('Nouvelle offre:', this.offre);
    const newOffre = {
      ...this.offre,
      salle: this.offre.salle,
    };

    this.offreService.createOffre(newOffre).subscribe({
      next: (response) => {
        console.log('Offre créée avec succès:', response);
        this.router.navigate(['/offres/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'offre:', err);
      },
    });
  }
  goToListe(): void {
    this.router.navigate(['offres/list']);
  }
}