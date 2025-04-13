import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleEditComponent } from './salle-edit.component';

describe('SalleEditComponent', () => {
  let component: SalleEditComponent;
  let fixture: ComponentFixture<SalleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
