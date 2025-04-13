import { Component, OnInit } from '@angular/core';
import { Salle, SalleService } from '../../../services/salle.service';
import { CategorieService } from '../../../services/categorie.service';
import { EquipementService } from '../../../services/equipement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-salle-edit',
  templateUrl: './salle-edit.component.html',
  styleUrl: './salle-edit.component.scss'
})
export class SalleEditComponent implements OnInit {
  salle: Salle = { id: 0, nom: '', etat: '', description: '', capacite: 0, image: '', categorie: { id: 0, nom: '', description: '' }, equipements: [] };

  categories: any[] = [];
  equipements: any[] = [];

  constructor(
    private salleService: SalleService,
    private categorieService: CategorieService,
    private equipementService: EquipementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && !isNaN(+id)) {
      const idNumber = +id;
      this.getSalleById(idNumber); // Charger la salle avec l'id
      this.getAllCategories(); // Charger toutes les catégories
      this.getAllEquipements(); // Charger tous les équipements
    } else {
      console.error('ID invalide ou manquant:', id);
    }
  }


  getAllCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });
  }

  getAllEquipements(): void {
    const salleId = +this.route.snapshot.paramMap.get('id')!;
    if (salleId) {
      this.loadSalle(salleId);
    }
    this.equipementService.getAllEquipements().subscribe({
      next: (response) => {
        this.equipements = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des équipements:', err);
      }
    });
  }


  loadSalle(id: number): void {
    this.salleService.getSalleById(id).subscribe({
      next: (response) => {
        this.salle = response;
        const selectedCategory = this.categories.find(c => c.id === this.salle.categorie.id);
        if (selectedCategory) {
          this.salle.categorie = selectedCategory;
        }
        this.salle.equipements.forEach((equipement: any) => {
          const equip = this.equipements.find(e => e.id === equipement.id);
          if (equip) {
            equip.selected = true;
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la salle:', err);
      }
    });
  }



  getSalleById(id: number): void {
    this.salleService.getSalleById(id).subscribe({
      next: (response) => {
        this.salle = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la salle:', err);
      }
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.salle.image = reader.result as string;  // Assigner l'image à la salle
      };
    }
  }

  onSubmit(): void {
    const equipementsSelectionnes = this.equipements.filter(e => e.selected);
    const salleToUpdate = {
      id: this.salle.id,
      nom: this.salle.nom,
      etat: this.salle.etat,
      description: this.salle.description,
      capacite: this.salle.capacite,
      image: this.salle.image,
      // La catégorie est envoyée de manière correcte
      categorie: {
        id: this.salle.categorie.id,
        nom: this.salle.categorie.nom,
        description: this.salle.categorie.description
      },
      // Equipements : envoyez un tableau complet avec les propriétés attendues
      equipements: equipementsSelectionnes.map((equipement: any) => ({
        id: equipement.id,            // Id de l'équipement
        nom: equipement.nom,          // Nom de l'équipement
        description: equipement.description, // Description de l'équipement
        quantite: equipement.quantite  // Quantité de l'équipement
      }))
    };

    // Appel au service pour mettre à jour la salle
    this.salleService.updateSalle(salleToUpdate).subscribe({
      next: (response) => {
        console.log('Salle mise à jour avec succès!');
        this.router.navigate(['salles/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la salle:', err);
      }
    });
  }


  goToListe(): void {
    this.router.navigate(['salles/list']);
  }
}