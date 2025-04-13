import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieListComponent } from './component/categorie/categorie-list/categorie-list.component';
import { CategorieAddComponent } from './component/categorie/categorie-add/categorie-add.component';
import { CategorieEditComponent } from './component/categorie/categorie-edit/categorie-edit.component';
import { EquipementListComponent } from './component/equipement/equipement-list/equipement-list.component';
import { EquipementAddComponent } from './component/equipement/equipement-add/equipement-add.component';
import { EquipementEditComponent } from './component/equipement/equipement-edit/equipement-edit.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { AdminListComponent } from './component/admin/admin-list/admin-list.component';
import { AdminAddComponent } from './component/admin/admin-add/admin-add.component';
import { AdminEditComponent } from './component/admin/admin-edit/admin-edit.component';
import { SalleListComponent } from './component/salle/salle-list/salle-list.component';
import { SalleEditComponent } from './component/salle/salle-edit/salle-edit.component';
import { SalleAddComponent } from './component/salle/salle-add/salle-add.component';
import { OffreAddComponent } from './component/offre/offre-add/offre-add.component';
import { OffreEditComponent } from './component/offre/offre-edit/offre-edit.component';
import { OffreListComponent } from './component/offre/offre-list/offre-list.component';
import { ReservationAddComponent } from './component/reservation/reservation-add/reservation-add.component';
import { ReservationEditComponent } from './component/reservation/reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './component/reservation/reservation-list/reservation-list.component';
import { PaiementListComponent } from './component/paiement/paiement-list/paiement-list.component';
import { PaiementAddComponent } from './component/paiement/paiement-add/paiement-add.component';
import { PaiementEditComponent } from './component/paiement/paiement-edit/paiement-edit.component';
import { FeedbackListComponent } from './component/feedback/feedback-list/feedback-list.component';
import { AdminAccueilComponent } from './component/admin-accueil/admin-accueil.component';
import { ClientAccueilComponent } from './component/client-accueil/client-accueil.component';
import { OffreClientListComponent } from './component/offre-client-list/offre-client-list.component';

const routes: Routes = [
  { path: 'salles/categorie', component: CategorieListComponent },
  { path: 'salles/add-categorie', component: CategorieAddComponent },
  { path: 'salles/edit-categorie/:id', component: CategorieEditComponent },
  { path: 'salles/equipement', component: EquipementListComponent },
  { path: 'salles/add-equipement', component: EquipementAddComponent },
  { path: 'salles/edit-equipement/:id', component: EquipementEditComponent },
  { path: 'salles/list', component: SalleListComponent },
  { path: 'salles/add-salle', component: SalleAddComponent },
  { path: 'salles/edit-salle/:id', component: SalleEditComponent },
  { path: 'users/client', component: UserListComponent },
  { path: 'users/add-client', component: UserAddComponent },
  { path: 'users/edit-client/:id', component: UserEditComponent },
  { path: 'users/admin', component: AdminListComponent },
  { path: 'users/add-admin', component: AdminAddComponent },
  { path: 'users/edit-admin/:id', component: AdminEditComponent },
  { path: 'offres/list', component: OffreListComponent },
  { path: 'offres/add-offre', component: OffreAddComponent },
  { path: 'offres/edit-offre/:id', component: OffreEditComponent },
  { path: 'reservations/list', component: ReservationListComponent },
  { path: 'reservations/add-reservation', component: ReservationAddComponent },
  { path: 'reservations/edit-reservation/:id', component: ReservationEditComponent },
  { path: 'paiements/list', component: PaiementListComponent },
  { path: 'paiements/add-paiement', component: PaiementAddComponent },
  { path: 'paiements/edit-paiement/:id', component: PaiementEditComponent },
  { path: 'feedbadk/list', component: FeedbackListComponent },
  { path: 'accueil/admin', component: AdminAccueilComponent },
  { path: '', redirectTo: 'accueil/admin', pathMatch: 'full' },
  { path: 'accueil/client', component: ClientAccueilComponent },
  { path: 'offres/:id', component: OffreClientListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
