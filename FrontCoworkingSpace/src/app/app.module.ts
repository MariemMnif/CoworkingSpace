import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { CategorieListComponent } from './component/categorie/categorie-list/categorie-list.component';
import { FormsModule } from '@angular/forms';
import { CategorieAddComponent } from './component/categorie/categorie-add/categorie-add.component';
import { CategorieEditComponent } from './component/categorie/categorie-edit/categorie-edit.component';
import { EquipementListComponent } from './component/equipement/equipement-list/equipement-list.component';
import { EquipementAddComponent } from './component/equipement/equipement-add/equipement-add.component';
import { EquipementEditComponent } from './component/equipement/equipement-edit/equipement-edit.component';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { AdminEditComponent } from './component/admin/admin-edit/admin-edit.component';
import { AdminAddComponent } from './component/admin/admin-add/admin-add.component';
import { AdminListComponent } from './component/admin/admin-list/admin-list.component';
import { SalleListComponent } from './component/salle/salle-list/salle-list.component';
import { SalleAddComponent } from './component/salle/salle-add/salle-add.component';
import { SalleEditComponent } from './component/salle/salle-edit/salle-edit.component';
import { OffreEditComponent } from './component/offre/offre-edit/offre-edit.component';
import { OffreListComponent } from './component/offre/offre-list/offre-list.component';
import { OffreAddComponent } from './component/offre/offre-add/offre-add.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    SideBarComponent,
    CategorieListComponent,
    CategorieAddComponent,
    CategorieEditComponent,
    EquipementListComponent,
    EquipementAddComponent,
    EquipementEditComponent,
    UserAddComponent,
    UserEditComponent,
    AdminEditComponent,
    AdminAddComponent,
    AdminListComponent,
    SalleListComponent,
    SalleAddComponent,
    SalleEditComponent,
    OffreEditComponent,
    OffreListComponent,
    OffreAddComponent,
    ReservationAddComponent,
    ReservationEditComponent,
    ReservationListComponent,
    PaiementListComponent,
    PaiementAddComponent,
    PaiementEditComponent,
    FeedbackListComponent,
    AdminAccueilComponent,
    ClientAccueilComponent,
    OffreClientListComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
