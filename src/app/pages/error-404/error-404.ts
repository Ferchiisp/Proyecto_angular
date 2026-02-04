import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  // Selector para la página de error.
  selector: 'app-error-404',
  // Importamos RouterLink para poder poner un enlace de "Volver al inicio".
  imports: [RouterLink],
  templateUrl: './error-404.html',
  styleUrl: './error-404.css',
})
export class Error404 {
  // Lógica para cuando el usuario se pierde.
}
