// Importaciones para configurar la aplicación.
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importamos nuestras rutas definidas.
import { routes } from './app.routes';
// Importamos herramientas para la hidratación del cliente (hacer interactiva la página que vino del servidor).
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// appConfig: El objeto maestro de configuración.
// Analogía: Es el panel de control central donde activamos las funciones principales del sistema.
export const appConfig: ApplicationConfig = {
  providers: [
    // Activamos detectores de errores globales para el navegador.
    provideBrowserGlobalErrorListeners(),
    // Activamos la detección de cambios "zoneless" (sin Zone.js).
    // Analogía: Es un sistema de vigilancia moderno y eficiente que sabe cuándo actualizar la pantalla sin revisar todo constantemente.
    provideZonelessChangeDetection(),
    // Configuramos el "GPS" de la aplicación con nuestras rutas.
    provideRouter(routes),
    // Configuramos la hidratación.
    // Analogía: Es darle "vida" a la estatua de cera. El servidor manda la estructura (cera) y esto la hace moverse e interactuar.
    // 'withEventReplay' permite que si el usuario hizo clic antes de que la app cargara del todo, ese clic se "reproduzca" después.
    provideClientHydration(withEventReplay())
  ]
};
