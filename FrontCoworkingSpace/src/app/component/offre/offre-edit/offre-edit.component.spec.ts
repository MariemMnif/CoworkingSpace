import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreEditComponent } from './offre-edit.component';

describe('OffreEditComponent', () => {
  let component: OffreEditComponent;
  let fixture: ComponentFixture<OffreEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffreEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
