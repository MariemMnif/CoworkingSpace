import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreClientListComponent } from './offre-client-list.component';

describe('OffreClientListComponent', () => {
  let component: OffreClientListComponent;
  let fixture: ComponentFixture<OffreClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffreClientListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
