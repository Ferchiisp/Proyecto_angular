import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementosSitio } from './elementos-sitio';

describe('ElementosSitio', () => {
  let component: ElementosSitio;
  let fixture: ComponentFixture<ElementosSitio>;

  beforeEach(async () => {
    // Configuración de la prueba.
    await TestBed.configureTestingModule({
      imports: [ElementosSitio]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ElementosSitio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
