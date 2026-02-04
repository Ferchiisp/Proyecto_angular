import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Breadcrumbs } from './breadcrumbs';

describe('Breadcrumbs', () => {
  let component: Breadcrumbs;
  let fixture: ComponentFixture<Breadcrumbs>;

  beforeEach(async () => {
    // Configuración de la prueba.
    await TestBed.configureTestingModule({
      imports: [Breadcrumbs]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Breadcrumbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verificamos que la página se cree.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
