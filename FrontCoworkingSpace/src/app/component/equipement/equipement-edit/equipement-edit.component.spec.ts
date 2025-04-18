import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementEditComponent } from './equipement-edit.component';

describe('EquipementEditComponent', () => {
  let component: EquipementEditComponent;
  let fixture: ComponentFixture<EquipementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipementEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
