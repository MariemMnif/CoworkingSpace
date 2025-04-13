import { Component, OnInit } from '@angular/core';
import { SalleService } from '../../../services/salle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../../../services/categorie.service';
import { EquipementService } from '../../../services/equipement.service';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrl: './salle-list.component.scss'
})
export class SalleListComponent implements OnInit {
  salles: any[] = [];
  filteredSalles: any[] = [];
  searchTerm: string = '';

  constructor(private salleService: SalleService, private equipementService: EquipementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllSalles();
  }


  getAllSalles(): void {
    this.salleService.getAllSalles().subscribe({
      next: (response) => {
        // Assurez-vous que l'URL de l'image est correctement assignée
        this.salles = response.map(salle => ({
          ...salle,
          image: salle.image ? salle.image : './src/assets/images/default.jpg' // Valeur par défaut si pas d'image
        }));
        this.salles = response;
        this.filteredSalles = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des salles:', err);
      }
    });
  }

  loadEquipementsForSalles(): void {
    this.salles.forEach(salle => {
      salle.equipements = salle.equipements.map((equipementId: number) => {
        return this.equipementService.getEquipementById(equipementId).subscribe({
          next: (equipement) => {
            return equipement.nom;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération de l\'équipement:', err);
            return '';
          }
        });
      });
    });
  }

  onSearch(): void {
    this.filteredSalles = this.salles.filter((salle) =>
      salle.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  onAddSalle(): void {
    console.log('Redirection vers le formulaire d\'ajout de salle.');
    this.router.navigate(['salles/add-salle']);
  }


  onEditSalle(id: number): void {
    console.log(`Modification de la salle avec l'ID: ${id}`);
    this.router.navigate([`salles/edit-salle/${id}`]);
  }


  deleteSalle(id: number): void {

    this.salleService.deleteSalle(id).subscribe({});
    this.getAllSalles();

  }
}  