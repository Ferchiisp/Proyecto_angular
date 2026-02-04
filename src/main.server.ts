// Importaciones necesarias para el arranque en el servidor.
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
// Importamos el componente principal 'App'.
import { App } from './app/app';
// Importamos la configuración específica para el servidor.
// Analogía: Es un manual de instrucciones diferente al del navegador, adaptado para funcionar en un servidor.
import { config } from './app/app.config.server';

// Esta función es la que arranca la aplicación en el servidor.
// Recibe un 'contexto' de arranque.
const bootstrap = (context: BootstrapContext) =>
    // Iniciamos la aplicación Angular (App) con la configuración del servidor (config) y el contexto dado.
    // Analogía: Es como encender la maquinaria en la fábrica (servidor) en lugar de en el coche del usuario (navegador).
    bootstrapApplication(App, config, context);

// Exportamos esta función por defecto para que el servidor pueda usarla.
export default bootstrap;
