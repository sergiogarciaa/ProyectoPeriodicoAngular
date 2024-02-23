import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPanelComponent } from './ver-panel.component';

describe('VerPanelComponent', () => {
  let component: VerPanelComponent;
  let fixture: ComponentFixture<VerPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPanelComponent]
    });
    fixture = TestBed.createComponent(VerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
