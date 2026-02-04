// Importaciones necesarias para crear el servidor y manejar Angular en el backend.
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// Define dónde está la carpeta con los archivos compilados para el navegador (browser).
// Analogía: Es saber en qué estante están guardados los folletos que vamos a entregar al público.
const browserDistFolder = join(import.meta.dirname, '../browser');

// Creamos una instancia de la aplicación Express.
// Analogía: Contratamos a un recepcionista (Express) que se encargará de gestionar todas las peticiones que lleguen.
const app = express();
// Inicializamos el motor de Angular para Node.js.
// Analogía: Es el "cerebro" que sabe cómo leer y ejecutar nuestra app de Angular desde el servidor.
const angularApp = new AngularNodeAppEngine();

/**
 * Aquí se pueden definir endpoints de API (puntos de acceso para datos).
 * Por ejemplo, si quisiéramos una ruta '/api/usuarios', la definiríamos aquí.
 */

/**
 * Sirve archivos estáticos desde la carpeta /browser.
 * Analogía: Si alguien pide una imagen o un archivo CSS, el recepcionista (Express) se lo da directamente del estante.
 * No necesita procesar nada, solo entregar el archivo.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y', // Cachear archivos por 1 año.
    index: false, // No servir index.html automáticamente aquí, lo manejaremos más abajo.
    redirect: false,
  }),
);

/**
 * Maneja todas las demás peticiones renderizando la aplicación Angular.
 * Analogía: Si la petición no fue por un archivo estático (imagen, css), entonces es una petición de página.
 * El recepcionista le pasa el trabajo al experto en Angular (angularApp) para que "dibuje" la página y la entregue lista.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      // Si Angular generó una respuesta, la enviamos. Si no (null), pasamos al siguiente manejador (next).
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next); // Si hubo un error, lo pasamos al sistema de manejo de errores de Express.
});

/**
 * Arranca el servidor si este módulo es el principal.
 * El servidor escucha en el puerto definido por la variable de entorno PORT o usa el 4000 por defecto.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Este es el manejador de peticiones usado por Angular CLI o Firebase.
 * Es la función que conecta todo lo anterior con el mundo exterior en entornos serverless o de desarrollo.
 */
export const reqHandler = createNodeRequestHandler(app);
