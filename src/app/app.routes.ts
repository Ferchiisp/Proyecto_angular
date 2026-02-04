// Importamos el tipo 'Routes' para definir nuestro mapa de navegación.
import { Routes } from '@angular/router';
// Importamos los componentes que serán nuestras "páginas".
import { Inicio } from './pages/inicio/inicio';
import { ElementosSitio } from './pages/elementos-sitio/elementos-sitio';
import { Menu } from './pages/menu/menu';
import { Breadcrumbs } from './pages/breadcrumbs/breadcrumbs';
import { MapaSitio } from './pages/mapa-sitio/mapa-sitio';
import { Error404 } from './pages/error-404/error-404';
import { Busqueda } from './pages/busqueda/busqueda';
import { Contacto } from './pages/contacto/contacto';

// Definimos el arreglo de rutas.
// Analogía: Es como el índice de un libro o el GPS del coche.
// Dice: "Si vas a tal dirección, te muestro esta página".
export const routes: Routes = [
  {
    // path: '' significa la ruta raíz (el home).
    path: '',
    // component: Inicio es el componente que se cargará.
    component: Inicio,
    // pathMatch: 'full' asegura que solo cargue si la URL es exactamente vacía, no solo si "empieza" con vacío.
    pathMatch: 'full',
  },
  {
    // Ruta: /elementos
    path: 'elementos',
    component: ElementosSitio,
  },
  {
    // Ruta: /menu
    path: 'menu',
    component: Menu,
  },
  {
    // Ruta: /breadcrumbs
    path: 'breadcrumbs',
    component: Breadcrumbs,
  },
  {
    // Ruta: /mapa-sitio
    path: 'mapa-sitio',
    component: MapaSitio,
  },
  {
    path: 'busqueda',
    component: Busqueda,
  },
  {
    path: 'contacto',
    component: Contacto,
  },
  {
    // Ruta: '**' es un comodín (wildcard).
    // Significa "cualquier cosa que no coincida con las rutas anteriores".
    // Analogía: Es la oficina de objetos perdidos. Si no encontramos lo que buscas, te mandamos aquí.
    path: '**',
    component: Error404,
  },
];
