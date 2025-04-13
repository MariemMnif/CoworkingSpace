import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../services/equipement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipement-edit',
  templateUrl: './equipement-edit.component.html',
  styleUrl: './equipement-edit.component.scss'
})
export class EquipementEditComponent implements OnInit {
  equipement: any = { id: 0, nom: '', description: '', quantite: 0 };
  constructor(private equipementService: EquipementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const equipementId = +this.route.snapshot.paramMap.get('id')!;
    if (equipementId) {
      this.loadEquipement(equipementId);
    }
  }

  loadEquipement(id: number) {
    this.equipementService.getEquipementById(id).subscribe((equipement) => {
      this.equipement = equipement;
    });
  }
  onSubmit() {

    this.equipementService.updateEquipement(this.equipement.id, this.equipement).subscribe({
      next: () => {
        this.router.navigate(['/salles/equipement']);
      },
      error: (err) => {
        if (err.status === 500) {
          alert('Erreur 500 : Un equipementId avec ce nom existe déjà !');
        } else {
          console.error('Erreur lors de la modification du equipement (ID ' + this.equipement.id + ') : ', err);
        }
      }
    });
  }
  goToListe(): void {
    this.router.navigate(['salles/equipement']);
  }
}
/*  */