import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inicio } from './inicio';

describe('Inicio', () => {
  let component: Inicio;
  let fixture: ComponentFixture<Inicio>;

  beforeEach(async () => {
    // Configuración de la prueba.
    await TestBed.configureTestingModule({
      imports: [Inicio]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Inicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
