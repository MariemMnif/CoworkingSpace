import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {

  client: any = { id: 0, nom: '', prenom: '', email: '', mdp: '', role: 0 };
  loading: boolean = false; // Etat de chargement
  errorMessage: string | null = null; // Message d'erreur

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;
    if (!clientId || isNaN(clientId)) {
      this.errorMessage = 'ID de client invalide';
      console.error('ID de client invalide');
      return;
    }
    this.loadClient(clientId);
  }


  loadClient(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (client) => {
        console.log('Client chargé : ', client); // Assurez-vous que la structure est correcte
        this.client = client;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du chargement des données.';
        console.error('Erreur lors du chargement du client (ID ' + id + ') : ', err);
      }
    });
  }


  onSubmit() {
    console.log(this.client.id);
    this.userService.updateUser(this.client.id, this.client).subscribe({
      next: () => {
        this.router.navigate(['/users/client']);
      },
      error: (err) => {
        console.error('Erreur lors de la modification du client (ID ' + this.client.id + ') : ', err);
        if (err.status === 0) {
          alert('Erreur réseau : Impossible de joindre le serveur.');
        } else {
          alert('Erreur inconnue : ' + err.message);
        }
      }
    });
  }


  goToListe(): void {
    this.router.navigate(['users/client']);
  }
}