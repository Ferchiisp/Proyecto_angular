// Importamos la función 'bootstrapApplication' desde la librería de Angular.
// Analogía: Imagina que esto es como la llave de encendido de un coche.
// Necesitamos esta función para arrancar nuestra aplicación y hacer que todo funcione.
import { bootstrapApplication } from '@angular/platform-browser';

// Importamos la configuración de la aplicación (appConfig).
// Analogía: Este es el manual de instrucciones o las configuraciones iniciales del coche,
// como ajustar los espejos y el asiento antes de arrancar.
import { appConfig } from './app/app.config';

// Importamos el componente raíz 'App'.
// Analogía: Este es el chasis del coche. Es la pieza principal sobre la que se construirá todo lo demás.
import { App } from './app/app';

// Aquí es donde realmente "giramos la llave" para arrancar la aplicación.
// Le decimos a Angular: "Arranca usando este chasis (App) y con estas configuraciones (appConfig)".
bootstrapApplication(App, appConfig)
  // Si algo sale mal durante el arranque (como si el motor fallara), capturamos el error aquí.
  // Analogía: Es como una luz de advertencia en el tablero que nos dice qué está mal.
  .catch((err) => console.error(err));
