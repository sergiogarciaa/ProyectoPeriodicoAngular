import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNoticiaComponent } from './crear-noticia.component';

describe('CrearNoticiaComponent', () => {
  let component: CrearNoticiaComponent;
  let fixture: ComponentFixture<CrearNoticiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearNoticiaComponent]
    });
    fixture = TestBed.createComponent(CrearNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
