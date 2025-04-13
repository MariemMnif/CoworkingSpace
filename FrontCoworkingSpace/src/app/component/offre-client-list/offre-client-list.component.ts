import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from '../../services/offre.service';
import { SalleService } from '../../services/salle.service';

@Component({
  selector: 'app-offre-client-list',
  templateUrl: './offre-client-list.component.html',
  styleUrl: './offre-client-list.component.scss'
})
export class OffreClientListComponent implements OnInit {
  categorieId: string | null = null;
  offres: any[] = [];
  categorieTitle: string = '';
  categorieText: string = '';

  constructor(  private router: Router,private route: ActivatedRoute, private offreService: OffreService, private salleService: SalleService) { }

  ngOnInit(): void {

    this.categorieId = this.route.snapshot.paramMap.get('id');
    this.setCategorieText();
    this.loadOffres();
  }
  loadOffres(): void {
    if (this.categorieId) {
      this.salleService.findSalleByCategorie(Number(this.categorieId)).subscribe({
        next: (salles) => {
          this.offres = [];
          salles.forEach((salle) => {
            this.offreService.getOffresBySalle(salle.id).subscribe({
              next: (offres) => {
                this.offres.push(...offres);
              },
              error: (err) => console.error('Erreur lors de la récupération des offres :', err)
            });
          });
        },
        error: (err) => console.error('Erreur lors de la récupération des salles :', err)
      });
    }
  }
  setCategorieText(): void {
    switch (this.categorieId) {
      case '1':
        this.categorieTitle = 'Un environnement collaboratif pour booster votre productivité';
        this.categorieText = 'Workzone vous propose un espace de coworking professionnel et propice à votre réussite. Nous accueillons des créateurs d’entreprises, des freelancers indépendants ou encore des étudiants pour travailler dans un cadre motivant et dynamique.  ';
        break;
      case '3':
        this.categorieTitle = 'Un espace professionnel pour tous vos Meetings';
        this.categorieText = 'Workzone dispose de salles de réunion entièrement équipées pour recevoir vos visiteurs et organiser vos événements. Un entretien d’embauche, une réunion professionnelle ou une session de formation, impressionnez vos visiteurs grâce à nos meetings room.';

        break;
      case '2':
        this.categorieTitle = 'Des bureaux privatifs pour plus d’autonomie';
        this.categorieText = 'Louer un bureau privé est une belle option si vous avez besoin de plus de confidentialité ou d’augmenter votre confort. Nos bureaux privés sont conçus pour les professionnels et sont adaptés pour étendre leur activité. Ils vous permettent de travailler tranquillement en facilitant la concentration et en améliorant la productivité.';

        break;
      default:
        this.categorieTitle = 'Découvrez nos offres exceptionnelles';
        break;
    }
  }
}
