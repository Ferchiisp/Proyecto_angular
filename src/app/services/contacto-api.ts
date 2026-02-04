import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export type ContactoPayload = {
  nombre: string;
  correo: string;
  confirmarCorreo: string;
  mensaje: string;
  respuesta: string
};

export type ApiFieldErrors = Record<string, string>;

export type ApiResponseOk = {
  ok: true;
  message: string;
};

export type ApiResponseFail = {
  ok: false;
  message: string;
  fieldErrors?: ApiFieldErrors;
};

export type ApiResponse = ApiResponseOk | ApiResponseFail;

@Injectable({ providedIn: 'root', })

export class ContactoApi {
  private emailUsados = new Set<string>([
    'test@correo.com',
    'demo@utcv.edu.mx'
  ]);

  //Expresión regular para validar formato de correo
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  submit(payload: ContactoPayload): Observable<ApiResponse> {
    console.log('[API] submit() payload recibido:', payload);

    const errors: ApiFieldErrors = {};

    const nombre = (payload.nombre ?? '').trim();
    const correo = (payload.correo ?? '').trim().toLowerCase();
    const confirmarCorreo = (payload.confirmarCorreo ?? '').trim().toLowerCase();
    const mensaje = (payload.mensaje ?? '').trim();
    const respuesta = (payload.respuesta ?? '').trim();

    //Reglas de negocio
    if (!nombre) errors['nombre'] = 'El nombre es obligatorio (Backend).';
    if (!correo) errors['correo'] = 'El correo es obligatorio (Backend).';
    if (!confirmarCorreo) errors['confirmarCorreo'] = 'El correo es obligatorio (Backend).';
    if (!mensaje) errors['mensaje'] = 'El mensaje es obligatorio (Backend).';
    if (!respuesta) errors['respuesta'] = 'La respuesta es obligatoria (Backend).';

    //Formato de correo
    if (correo && !this.emailRegex.test(correo)) {
      errors['correo'] = 'Formato del correo inválido (Backend).';
    }
    if (confirmarCorreo && !this.emailRegex.test(correo)) {
      errors['confirmarCorreo'] = 'Formato del correo inválido (Backend).';
    }

    //Coherencia (los correos deben ser iguales)
    if (correo && confirmarCorreo && correo !== confirmarCorreo) {
      errors['confirmarCorreo'] = 'Los correos no coinciden (Backend).';
    }

    //Longitud del mensaje
    if (mensaje) {
      if (mensaje.length < 10) errors['mensaje'] = 'El mensaje debe de tener al menos 10 caracteres (Backend).';
      if (mensaje.length > 500) errors['mensaje'] = 'El mensaje no debe superar 500 caracteres (Backend).';

    }

    //Dato unico (Simulacion de "Este correo ya existe")
    if (correo && this.emailUsados.has(correo)) {
      errors['correo'] = 'Este correo ya fue utilizado (Backend).';
    }

    //Verificacion humana (Captcha simple)
    if (respuesta && respuesta !== '7') {
      errors['respuesta'] = 'Verificacion humana incorrecta (Backend).';
    }

    //RESPUESTA
    if (Object.keys(errors).length > 0) {
      const fail: ApiResponseFail = {
        ok: false,
        message: 'No se pudo enviar.Revisa los campos marcados.',
        fieldErrors: errors,
      };

      console.log('[API] Respuesta FAIL:', fail);
      return of(fail).pipe(delay(400));
    }

    //Si todo esta bien
    this.emailUsados.add(correo);

    const ok: ApiResponseOk = {
      ok: true,
      message: 'Mensaje enviado correctamente (Backend).',
    };

    console.log('[API] Respuesta OK:', ok);
    return of(ok).pipe(delay(400));
  }
}