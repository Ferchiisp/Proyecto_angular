import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    // Configuramos el módulo de pruebas importando el componente Layout.
    await TestBed.configureTestingModule({
      imports: [Layout]
    })
      .compileComponents();

    // Creamos la "maqueta" o fixture del Layout.
    fixture = TestBed.createComponent(Layout);
    // Obtenemos la instancia lógica.
    component = fixture.componentInstance;
    // Disparamos la detección de cambios inicial.
    fixture.detectChanges();
  });

  // Verificamos que el componente se cree correctamente.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
