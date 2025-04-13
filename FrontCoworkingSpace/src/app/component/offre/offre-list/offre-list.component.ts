import { Component, OnInit } from '@angular/core';
import { OffreService } from '../../../services/offre.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrl: './offre-list.component.scss'
})
export class OffreListComponent implements OnInit {
  offres: any[] = [];
  filteredOffres: any[] = [];
  searchTerm: string = '';

  constructor(private offreService: OffreService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe({
      next: (response) => {
        this.offres = response;
        this.filteredOffres = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des offres :', err);
      },
    });
  }

  onSearch(): void {
    this.filteredOffres = this.offres.filter((offre) =>
      offre.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onAddOffre(): void {
    this.router.navigate(['offres/add-offre']);
  }

  onEditOffre(id: number): void {
    this.router.navigate([`offres/edit-offre/${id}`]);
  }

  deleteOffre(id: number): void {
    this.offreService.deleteOffre(id).subscribe({
      next: () => {
        console.log('Offre supprimée avec succès.');
        this.getAllOffres();
      },
      error: (err) => {
        alert('Erreur lors de la suppression de l’offre ');
      },
    });
  }
}

