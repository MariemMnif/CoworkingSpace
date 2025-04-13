import { Component, OnInit } from '@angular/core';
import { Categorie, CategorieService } from '../../../services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrl: './categorie-edit.component.scss'
})
export class CategorieEditComponent implements OnInit {
  categorie: Categorie = { id: 0, nom: '', description: '' };
  constructor(private categorieService: CategorieService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const categorieId = +this.route.snapshot.paramMap.get('id')!;
    if (categorieId) {
      this.loadCategorie(categorieId);
    }
  }
  loadCategorie(id: number) {
    this.categorieService.getCategorieById(id).subscribe((categorie) => {
      this.categorie = categorie;
    });
  }
  onSubmit() {

    this.categorieService.updateCategorie(this.categorie.id, this.categorie).subscribe({
      next: () => {
        this.router.navigate(['/salles/categorie']);
      },
      error: (err) => {
        if (err.status === 500) {
          alert('Erreur 500 : Une catégorie avec ce nom existe déjà !');
        } else {
          console.error('Erreur lors de la modification du médecin (ID ' + this.categorie.id + ') : ', err);
        }
      }
    });
  }
  goToListe(): void {
    this.router.navigate(['salles/categorie']);
  }
}
