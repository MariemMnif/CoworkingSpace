import { Component, OnInit } from '@angular/core';
import { Equipement, EquipementService } from '../../../services/equipement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipement-list',
  templateUrl: './equipement-list.component.html',
  styleUrl: './equipement-list.component.scss'
})
export class EquipementListComponent implements OnInit {
  equipements: Equipement[] = [];
  filteredEquipements: Equipement[] = [];
  searchTerm: string = '';

  constructor(private categoryService: EquipementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEquipements();
  }

  loadEquipements() {
    this.categoryService.getAllEquipements().subscribe(
      (data: Equipement[]) => {
        this.equipements = data;
        this.filteredEquipements = data;
      }
    );
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredEquipements = this.equipements.filter(e =>
        e.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEquipements = this.equipements;
    }
  }


  onAddEquipement() {
    this.router.navigate(['salles/add-equipement']);

  }

  onEditCategory(id: number) {
    this.router.navigate([`salles/edit-equipement/${id}`]);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteEquipement(id).subscribe(() => {
      console.log('Equipement supprimée avec succès');
      this.loadEquipements();
    });
  }
}