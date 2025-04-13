import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.scss'
})
export class AdminAddComponent implements OnInit {
  admin: any = { nom: '', prenom: '', email: '', mdp: '', role: 1 };
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log("Formulaire soumis avec les données : ", this.admin);
    this.userService.addUser(this.admin).subscribe({
      next: () => {
        console.log("admin ajouté avec succès.");
        this.router.navigate(['users/admin']);
      },
      error: (err) => {
        console.error('Erreur lors de la création du admin:', err);
        if (err.status === 500) {
          alert('Erreur 500 : Un admin avec ce nom existe déjà !');
        } else {
          console.error("Erreur inconnue", err);
        }
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['users/admin']);
  }

}

