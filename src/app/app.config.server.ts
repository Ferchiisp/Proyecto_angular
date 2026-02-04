// Importamos una utilidad para fusionar configuraciones.
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
// Importamos herramientas específicas para el renderizado en servidor (SSR).
import { provideServerRendering, withRoutes } from '@angular/ssr';
// Importamos la configuración base que usa el navegador.
import { appConfig } from './app.config';
// Importamos las rutas específicas del servidor.
import { serverRoutes } from './app.routes.server';

// Definimos la configuración exclusiva del servidor.
// Analogía: Son las reglas adicionales que solo aplican cuando estamos en la fábrica (servidor), no en la calle (navegador).
const serverConfig: ApplicationConfig = {
  providers: [
    // Activamos el renderizado del servidor y le pasamos sus rutas.
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

// Fusionamos la configuración base con la del servidor.
// Analogía: Tomamos el manual del coche (appConfig) y le pegamos el anexo de mantenimiento pesado (serverConfig) para tener el manual completo del servidor.
export const config = mergeApplicationConfig(appConfig, serverConfig);
