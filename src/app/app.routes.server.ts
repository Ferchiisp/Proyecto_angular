// Importamos los modos de renderizado.
import { RenderMode, ServerRoute } from '@angular/ssr';

// Definimos cómo deben comportarse las rutas en el servidor.
export const serverRoutes: ServerRoute[] = [
  {
    // Para todas las rutas ('**')...
    path: '**',
    // Usamos el modo de prerenderizado (Prerender).
    // Analogía: En lugar de cocinar el plato cuando el cliente lo pide, cocinamos todos los platos al principio del día (durante el build) y los tenemos listos para calentar y servir.
    renderMode: RenderMode.Prerender
  }
];
