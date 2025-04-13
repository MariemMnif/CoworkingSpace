import { Component, OnInit } from '@angular/core';
import { Offre, OffreService } from '../../../services/offre.service';
import { Salle, SalleService } from '../../../services/salle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offre-edit',
  templateUrl: './offre-edit.component.html',
  styleUrl: './offre-edit.component.scss'
})
export class OffreEditComponent implements OnInit {
  offre: any = {
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    capaciteMax: 0,
    duree: '',
    salle: {
      id: 0,
      nom: '',
      etat: '',
      description: '',
      capacite: 0,
      image: '',
      categorie: null,
      equipements: null
    }
  };
  salles: Salle[] = [];

  constructor(
    private offreService: OffreService,
    private salleService: SalleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && !isNaN(+id)) {
      this.getOffreById(+id); // Charger l'offre avec l'id
      this.getAllSalles(); // Charger toutes les salles
    } else {
      console.error('ID invalide ou manquant:', id);
    }
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
  getOffreById(id: number): void {
    this.offreService.getOffreById(id).subscribe({
      next: (response) => {
        this.offre = response;
        if (this.offre.salle && this.salles.length) {
          this.offre.salle = this.salles.find(salle => salle.id === this.offre.salle.id);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'offre:', err);
      },
    });
  }


  onSubmit(): void {
    const updatedOffre = {
      ...this.offre,
      salle: this.offre.salle, // Salle sélectionnée
    };

    this.offreService.updateOffre(updatedOffre).subscribe({
      next: (response) => {
        console.log('Offre mise à jour avec succès:', response);
        this.router.navigate(['/offres/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l\'offre:', err);
      },
    });
  }
  goToListe(): void {
    this.router.navigate(['offres/list']);
  }
}