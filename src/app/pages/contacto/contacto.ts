import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

import { finalize } from 'rxjs';
import { ContactoApi, ApiFieldErrors, ContactoPayload } from '../../services/contacto-api';

/**
 * 🎓 COMPONENTE (Component)
 * -----------------------------------------------------------------------------------------
 * Un componente es como una pieza de LEGO. Tiene 3 partes:
 * 1. HTML (La apariencia, el molde).
 * 2. CSS (La pintura, el estilo).
 * 3. TypeScript (El cerebro, la lógica que lo hace moverse).
 *
 * @Component decora la clase para decirle a Angular: "¡Oye, esto es una pieza de LEGO!".
 */
@Component({
  selector: 'app-contacto', // Nombre de la etiqueta HTML personalizada: <app-contacto></app-contacto>
  standalone: true,         // Angular moderno: No necesitamos módulos complejos (NgModule).
  imports: [FormsModule, NgIf], // La mochila: metemos solo las herramientas que necesitamos (Formularios y NgIf).
  templateUrl: './contacto.html', // ¿De dónde saco mi apariencia?
  styleUrls: ['./contacto.css']   // ¿De dónde saco mi ropa/estilo?
})
export class Contacto {

  // 1. MODELO DE DATOS (El estado del componente)
  // Son las variables que guardan la información de la pantalla.

  form = {
    nombre: '',
    correo: '',
    confirmarCorreo: '',
    mensaje: '',
    respuesta: ''
  };

  // Variables para el desafío matemático (Captcha simple)
  desafioActual = '¿Cuánto es 3 + 4?';
  respuestaCorrecta = '7';

  // Estados de la interfaz (Banderas)
  enviado = false; // ¿Ya se envió el formulario con éxito?
  loading = false; // ¿Estamos esperando al servidor? (Espiral de carga)

  // Mensajes para mostrar al usuario
  apiMessage = '';
  apiFieldErrors: ApiFieldErrors = {}; // Libreta de errores que vienen del servidor

  // Regex para validación local del nombre (Solo letras y espacios)
  nombreRegex = "^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$";

  // Timer de seguridad por si el servidor nunca responde (evita que se trabe la pantalla)
  private loadingSafetyTimer: ReturnType<typeof setTimeout> | null = null;

  // Inyección de dependencias: Pedimos el servicio 'ContactoApi' en el constructor.
  // Angular nos lo trae automáticamente (como pedir servicio al cuarto).
  constructor(private api: ContactoApi) { }

  // ---------------------------------------------------------------------------------------
  // 🎓 VALIDACIONES DE LÓGICA (Validaciones cruzadas)
  // ---------------------------------------------------------------------------------------

  /** Verifica si los dos correos son iguales. */
  correosCoinciden(): boolean {
    // Convertimos a minúsculas y quitamos espacios para comparar peras con peras.
    return (this.form.correo || '').trim().toLowerCase() ===
      (this.form.confirmarCorreo || '').trim().toLowerCase();
  }

  /** Verifica si la respuesta al desafío matemático es correcta. */
  desafioValido(): boolean {
    return (this.form.respuesta || '').trim() === this.respuestaCorrecta;
  }

  // ---------------------------------------------------------------------------------------
  // 🎓 MANEJO DEL ENVÍO (Submit)
  // ---------------------------------------------------------------------------------------

  enviar(f: NgForm): void {

    // 1. Evitar doble envío (Anti-rebotar)
    // Si ya le diste click y está cargando, ignoramos nuevos clicks.
    if (this.loading) {
      return;
    }

    // 2. Limpiar estados anteriores
    this.enviado = false;
    this.apiMessage = '';
    this.apiFieldErrors = {};

    // 3. Validaciones de FrontEnd (La primera barrera de defensa)

    // Si el formulario HTML dice que es inválido (por los atributos required, minlength, etc.)
    if (f.invalid) {
      // Truco: Marcamos todos los campos como "tocados" para que se muestren los mensajes de error en rojo.
      Object.values(f.controls).forEach(c => c.markAsTouched());
      return;
    }

    // Validaciones extra que el HTML no puede hacer solo (lógica nuestra)
    if (!this.correosCoinciden()) {
      return;
    }
    if (!this.desafioValido()) {
      return;
    }

    // 4. Preparar el paquete para el servidor
    const payload: ContactoPayload = {
      nombre: this.form.nombre,
      correo: this.form.correo,
      confirmarCorreo: this.form.confirmarCorreo,
      mensaje: this.form.mensaje,
      respuesta: this.form.respuesta
    };

    console.log('[UI] Payload a enviar:', payload);

    // 5. Iniciar Carga (Loading)
    this.loading = true;

    // Timer de seguridad: Si en 5 segundos no pasa nada, desbloqueamos la pantalla.
    this.clearSafetyTimer();
    this.loadingSafetyTimer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.apiMessage = 'La operación tardó demasiado. Intenta de nuevo.';
      }
    }, 5000);

    // 6. Llamar al API (Enviar la carta)
    this.api.submit(payload)
      .pipe(
        // finalize: Se ejecuta SIEMPRE, salga bien o mal.
        // Es perfecto para apagar el 'loading'.
        finalize(() => {
          this.loading = false;
          this.clearSafetyTimer();
        })
      )
      .subscribe({
        // next: Si el servidor responde "algo" (sea éxito o error controlado)
        next: (res) => {

          if (res.ok) {
            // ¡Éxito!
            this.enviado = true;
            this.apiMessage = res.message;

            // Limpiamos el formulario para que quede listo para otro mensaje
            setTimeout(() => this.limpiar(f), 100);
            return;
          }

          // Error de negocio (ej: correo repetido, validación fallida)
          this.enviado = false;
          this.apiMessage = res.message;
          this.apiFieldErrors = res.fieldErrors || {}; // Mostramos errores específicos en cada campo

          // Marcamos como tocados para que el usuario vea dónde está el error
          Object.values(f.controls).forEach(c => c.markAsTouched());
        },
        // error: Si explota algo (Error 500, sin internet, etc.)
        error: (err) => {
          this.enviado = false;
          this.apiMessage = 'Error inesperado al enviar. Intenta de nuevo.';
        }
      });
  }

  /**
   * Limpia el formulario y resetea los estados.
   */
  limpiar(f?: NgForm): void {
    const defaults = {
      nombre: '',
      correo: '',
      confirmarCorreo: '',
      mensaje: '',
      respuesta: ''
    };

    this.form = { ...defaults };
    this.apiFieldErrors = {};

    // ✅ IMPORTANTÍSIMO: resetForm limpia el estado "tocado" (touched) y "sucio" (dirty) del formulario.
    // Le pasamos los valores por defecto para que no ponga todo en 'null'.
    f?.resetForm({ ...defaults });
  }

  /** Retorna true si el campo tiene un error que vino del servidor */
  hasApiError(field: keyof ContactoPayload): boolean {
    return !!this.apiFieldErrors[field];
  }

  /** Retorna el mensaje de error del servidor para ese campo */
  apiError(field: keyof ContactoPayload): string {
    return this.apiFieldErrors[field] ?? '';
  }

  /** Limpia el timer de seguridad para no dejar basura en memoria */
  private clearSafetyTimer(): void {
    if (this.loadingSafetyTimer) {
      clearTimeout(this.loadingSafetyTimer);
      this.loadingSafetyTimer = null;
    }
  }
}