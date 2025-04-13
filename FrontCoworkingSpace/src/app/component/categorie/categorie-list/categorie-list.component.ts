import { Component, OnInit } from '@angular/core';
import { Categorie, CategorieService } from '../../../services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrl: './categorie-list.component.scss'
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];
  filteredCategories: Categorie[] = [];
  searchTerm: string = '';

  constructor(private categoryService: CategorieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
        this.filteredCategories = data;
      }
    );
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredCategories = this.categories.filter(c =>
        c.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCategories = this.categories;
    }
  }


  onAddCategory() {
    this.router.navigate(['salles/add-categorie']);

  }

  onEditCategory(id: number) {
    this.router.navigate([`salles/edit-categorie/${id}`]);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategorie(id).subscribe(() => {
      console.log('Catégorie supprimée avec succès');
      this.loadCategories();
    });
  }
}