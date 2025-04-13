import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.scss'
})
export class AdminEditComponent implements OnInit {

  admin: any = { id: 0, nom: '', prenom: '', email: '', mdp: '', role: 0 };
  loading: boolean = false; // Etat de chargement
  errorMessage: string | null = null; // Message d'erreur

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const adminId = +this.route.snapshot.paramMap.get('id')!;
    if (!adminId || isNaN(adminId)) {
      this.errorMessage = 'ID de admin invalide';
      console.error('ID de admin invalide');
      return;
    }
    this.loadadmin(adminId);
  }


  loadadmin(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (admin) => {
        console.log('admin chargé : ', admin); // Assurez-vous que la structure est correcte
        this.admin = admin;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du chargement des données.';
        console.error('Erreur lors du chargement du admin (ID ' + id + ') : ', err);
      }
    });
  }


  onSubmit() {
    console.log(this.admin.id);
    this.userService.updateUser(this.admin.id, this.admin).subscribe({
      next: () => {
        this.router.navigate(['/users/admin']);
      },
      error: (err) => {
        console.error('Erreur lors de la modification du admin (ID ' + this.admin.id + ') : ', err);
        if (err.status === 0) {
          alert('Erreur réseau : Impossible de joindre le serveur.');
        } else {
          alert('Erreur inconnue : ' + err.message);
        }
      }
    });
  }


  goToListe(): void {
    this.router.navigate(['users/admin']);
  }
}