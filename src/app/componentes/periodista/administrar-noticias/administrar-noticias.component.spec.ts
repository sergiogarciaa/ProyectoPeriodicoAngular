import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarNoticiasComponent } from './administrar-noticias.component';

describe('AdministrarNoticiasComponent', () => {
  let component: AdministrarNoticiasComponent;
  let fixture: ComponentFixture<AdministrarNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarNoticiasComponent]
    });
    fixture = TestBed.createComponent(AdministrarNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
