import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormMaterialComponent } from './password-form-material.component';

describe('PasswordFormMaterialComponent', () => {
  let component: PasswordFormMaterialComponent;
  let fixture: ComponentFixture<PasswordFormMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFormMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFormMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
