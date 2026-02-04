// Importamos herramientas de Angular. 'Component' para crear el componente y 'signal' para manejar datos reactivos.
import { Component, signal } from '@angular/core';
// Importamos 'RouterOutlet' para poder mostrar las páginas según la ruta.

// Importamos nuestro componente de diseño principal 'Layout'.
import { Layout } from './layout/layout';

// @Component es un decorador que marca a esta clase como un Componente de Angular.
// Analogía: Es como ponerle una etiqueta a una caja que dice "Esto es una pieza de Lego inteligente".
@Component({
  // selector: El nombre de la etiqueta HTML personalizada para usar este componente.
  // Analogía: Es el nombre que usaremos para invocar a este componente, como <app-root>.
  selector: 'app-root',
  // imports: La caja de herramientas. Aquí listamos qué otras "piezas" necesitamos dentro de este componente.
  // En este caso, necesitamos el sistema de rutas (RouterOutlet) y nuestro diseño base (Layout).
  imports: [ Layout],
  // templateUrl: La ubicación del archivo HTML que define la estructura visual de este componente.
  // Analogía: Es el plano arquitectónico de esta parte de la casa.
  templateUrl: './app.html',
  // styleUrl: La ubicación de los estilos CSS específicos para este componente.
  // Analogía: Es el decorador de interiores que solo trabaja en esta habitación específica.
  styleUrl: './app.css'
})
// La clase lógica del componente. Aquí va el código que controla el comportamiento.
export class App {
  // Una propiedad 'title' que es una señal (signal).
  // Analogía: Una señal es como un cartel luminoso. Si cambias el texto del cartel,
  // cualquiera que lo esté mirando se enterará instantáneamente.
  protected readonly title = signal('sitio-estructura');
}
