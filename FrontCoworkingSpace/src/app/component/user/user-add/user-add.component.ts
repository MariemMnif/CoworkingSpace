import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent implements OnInit {
  client: any = { nom: '', prenom: '', email: '', mdp: '', role: 0 };
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log("Formulaire soumis avec les données : ", this.client);
    this.userService.addUser(this.client).subscribe({
      next: () => {
        console.log("Client ajouté avec succès.");
        this.router.navigate(['users/client']);
      },
      error: (err) => {
        console.error('Erreur lors de la création du client:', err);
        if (err.status === 500) {
          alert('Erreur 500 : Un client avec ce nom existe déjà !');
        } else {
          console.error("Erreur inconnue", err);
        }
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['users/client']);
  }

}
