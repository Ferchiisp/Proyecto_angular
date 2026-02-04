import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    // Preparamos el entorno de pruebas para el componente Breadcrumb.
    await TestBed.configureTestingModule({
      imports: [Breadcrumb]
    })
      .compileComponents();

    // Creamos la instancia.
    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verificamos que se cree correctamente.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
