import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {


  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsersByRole(0);
  }

  loadUsersByRole(role: number): void {
    this.userService.getUsersByRole(role).subscribe(
      (data: User[]) => {
        this.users = data; // Assigner directement les utilisateurs retournés
        this.filteredUsers = data; // Initialiser la liste filtrée
      },
      (error) => {
        console.error('Erreur de chargement des utilisateurs par rôle:', error);
      }
    );
  }


  // Recherche par email
  onSearch(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  onAddUser(): void {
    this.router.navigate(['/users/add-client']);
  }

  onEditUser(id: number): void {
    this.router.navigate([`/users/edit-client/${id}`]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('Utilisateur supprimé avec succès');
      this.loadUsersByRole(0);
    });
  }
}