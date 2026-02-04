import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Necesario porque usamos RouterLink
import { Error404 } from './error-404';

describe('Error404', () => {
  let component: Error404;
  let fixture: ComponentFixture<Error404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error404],
      providers: [provideRouter([])] // Proveemos un enrutador falso para las pruebas.
    })
      .compileComponents();

    fixture = TestBed.createComponent(Error404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
