import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementAddComponent } from './equipement-add.component';

describe('EquipementAddComponent', () => {
  let component: EquipementAddComponent;
  let fixture: ComponentFixture<EquipementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipementAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
