import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionPrincipalComponent } from './administracion-principal.component';

describe('AdministracionPrincipalComponent', () => {
  let component: AdministracionPrincipalComponent;
  let fixture: ComponentFixture<AdministracionPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracionPrincipalComponent]
    });
    fixture = TestBed.createComponent(AdministracionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
