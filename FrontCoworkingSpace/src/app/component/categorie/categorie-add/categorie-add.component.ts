import { Component, OnInit } from '@angular/core';
import { Categorie, CategorieService } from '../../../services/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrl: './categorie-add.component.scss'
})
export class CategorieAddComponent implements OnInit {
  categorie: any = { nom: '', description: '' };
  constructor(private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void { }
  onSubmit(): void {
    this.categorieService.createCategorie(this.categorie).subscribe({
      next: () => {
        this.router.navigate(['salles/categorie']);
      },
      error: (err) => {
        // Affichage de l'erreur
        if (err.status === 500) {
          alert('Erreur 500 : Une catégorie avec ce nom existe déjà !');
        } else {
          console.error('Erreur lors de la création de la catégorie:', err);
        }
      }
    });
  }
  goToListe(): void {
    this.router.navigate(['salles/categorie']); 
  }
}
