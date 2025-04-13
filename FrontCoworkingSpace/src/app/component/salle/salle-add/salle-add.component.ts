import { Component, OnInit } from '@angular/core';
import { SalleService } from '../../../services/salle.service';
import { CategorieService } from '../../../services/categorie.service';
import { Router } from '@angular/router';
import { EquipementService } from '../../../services/equipement.service';


@Component({
  selector: 'app-salle-add',
  templateUrl: './salle-add.component.html',
  styleUrl: './salle-add.component.scss'
})
export class SalleAddComponent implements OnInit {

  salle: any = { nom: '', etat: '', description: '', capacite: null, image: '', categorie: null };
  categories: any[] = [];
  equipements: any[] = [];
  constructor(private salleService: SalleService, private equipementService: EquipementService, private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllEquipements();
  }
  getAllEquipements(): void {
    this.equipementService.getAllEquipements().subscribe({
      next: (response) => {
        this.equipements = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des equipements:', err);
      }
    });
  }
  getSalleById(id: number): void {
    this.salleService.getSalleById(id).subscribe({
      next: (response) => {
        console.log('Salle récupérée:', response);
        this.salle = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la salle:', err);
      }
    });
  }

  getAllCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log('Categories:', this.categories);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileName = this.generateShortFileName(file.name);
      console.log('Nom réduit de l\'image:', fileName);

      reader.onload = () => {
        this.salle.image = reader.result as string;
        console.log('Image Base64:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  generateShortFileName(originalName: string): string {
    const shortName = originalName.substring(0, 2); 
    const fileExtension = originalName.split('.').pop(); 
    return shortName + '.' + fileExtension;
  }


  onSubmit(): void {
    const newSalle = {
      ...this.salle,
      categorie: { id: this.salle.categorie },
      equipements: this.salle.equipements?.length
        ? this.salle.equipements.map((equipementId: number) => ({ id: equipementId }))
        : []
    };

    console.log("Formulaire soumis avec les données : ", newSalle);
    this.salleService.createSalle(newSalle).subscribe({
      next: (response) => {
        console.log("Salle ajoutée avec succès.");
        this.router.navigate(['salles/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la salle:', err);
        if (err.status === 500) {
          alert('Erreur 500 : Une erreur s\'est produite !');
        } else {
          console.error("Erreur inconnue", err);
        }
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['salles/list']);
  }

}