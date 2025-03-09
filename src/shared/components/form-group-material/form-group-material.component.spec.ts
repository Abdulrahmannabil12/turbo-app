import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupMaterialComponent } from './form-group-material.component';

describe('FormGroupMaterialComponent', () => {
  let component: FormGroupMaterialComponent;
  let fixture: ComponentFixture<FormGroupMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
