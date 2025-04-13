import { Component, OnInit } from '@angular/core';
import { Paiement, PaiementService } from '../../../services/paiement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrl: './paiement-list.component.scss'
})
export class PaiementListComponent implements OnInit {
  paiements: Paiement[] = [];
  filteredPaiements: Paiement[] = [];
  searchTerm: string = '';

  constructor(private paiementService: PaiementService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllPaiements();
  }

  loadAllPaiements(): void {
    this.paiementService.getAllPaiements().subscribe({
      next: (response) => {
        this.paiements = response;
        this.filteredPaiements = response; // Initialiser avec tous les paiements
      },
      error: (err) => {
        console.error('Erreur lors du chargement des paiements', err);
        // Afficher un message d'erreur à l'utilisateur
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredPaiements = this.paiements.filter(paiement =>
        paiement.methodePaiement.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        paiement.datePaiement.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        paiement.montant.toString().includes(this.searchTerm)
      );
    } else {
      this.filteredPaiements = this.paiements; // Réinitialiser si le terme de recherche est vide
    }
  }
  onAddPaiement() {
    this.router.navigate(['paiements/add-paiement']);
  }

  onEditPaiement(id: number): void {
    this.router.navigate([`paiements/edit-paiement/${id}`]);
  }

  deletePaiement(id: number): void {
    console.log('Supprimer le paiement avec ID', id);
    this.paiementService.deletePaiement(id).subscribe({
      next: () => {
        this.paiements = this.paiements.filter(paiement => paiement.id !== id);
        this.filteredPaiements = this.filteredPaiements.filter(paiement => paiement.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du paiement', err);
      }
    });
  }
}