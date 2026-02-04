// Importamos herramientas de prueba.
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

// describe: Define un grupo de pruebas (test suite) para el componente App.
// Analogía: Es como decir "Vamos a empezar el examen del componente App".
describe('App', () => {
  // beforeEach: Algo que se ejecuta antes de CADA prueba individual.
  // Analogía: Es como limpiar la mesa y sacar los lápices antes de cada pregunta del examen.
  beforeEach(async () => {
    // Configuramos un módulo de prueba dinámico.
    // Analogía: Construimos un laboratorio temporal con las herramientas necesarias (TestBed).
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()] // Proveemos la detección de cambios necesaria.
    }).compileComponents(); // Compilamos los componentes para que estén listos para usarse.
  });

  // it: Define una prueba individual (test case).
  // Analogía: Pregunta 1 del examen: "¿Debería crearse la aplicación?".
  it('should create the app', () => {
    // Creamos una instancia del componente App dentro del entorno de prueba.
    // fixture: Es el "muñeco de pruebas" que podemos manipular y observar.
    const fixture = TestBed.createComponent(App);
    // Obtenemos la instancia de la clase del componente.
    const app = fixture.componentInstance;
    // expect: La afirmación. Esperamos que 'app' sea verdadero (exista).
    expect(app).toBeTruthy();
  });

  // Analogía: Pregunta 2: "¿Debería renderizar el título?".
  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    // detectChanges: Forzamos a Angular a actualizar la vista.
    // Analogía: Le decimos al muñeco "¡Muévete!" para ver si reacciona.
    fixture.detectChanges();
    // Obtenemos el elemento HTML nativo.
    const compiled = fixture.nativeElement as HTMLElement;
    // Verificamos que el h1 contenga el texto esperado. Note: 'Hello, sitio-estructura' might not be there if I didn't verify app.html content, but assuming default test logic.
    // Actually, looking at app.ts logic, title is 'sitio-estructura'. But let's leave the expect as is or comment on it.
    // The original code had expect(compiled.querySelector('h1')?.textContent).toContain('Hello, sitio-estructura');
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, sitio-estructura');
  });
});
