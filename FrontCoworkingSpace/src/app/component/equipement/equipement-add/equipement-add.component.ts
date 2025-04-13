import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../services/equipement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipement-add',
  templateUrl: './equipement-add.component.html',
  styleUrl: './equipement-add.component.scss'
})
export class EquipementAddComponent implements OnInit {
  equipement: any = { nom: '', description: '', quantite: 0 };
  constructor(private equipementService: EquipementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log("Formulaire soumis avec les données : ", this.equipement);
    this.equipementService.createEquipement(this.equipement).subscribe({
      next: () => {
        console.log("Équipement ajouté avec succès.");
        this.router.navigate(['salles/equipement']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'équipement:', err);
        if (err.status === 500) {
          alert('Erreur 500 : Un équipement avec ce nom existe déjà !');
        } else {
          console.error("Erreur inconnue", err);
        }
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['salles/equipement']);
  }

}
