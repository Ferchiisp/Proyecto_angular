import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf, AsyncPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, finalize } from 'rxjs';

import { SearchApi, SearchFilters } from '../../services/search';
import { SiteItem } from '../../data/site-index';

/**
 * @Component
 *
 * ANALOGÍA:
 * Piensa en un componente como si fuera una "Receta de Cocina" completa.
 * - selector: Es el nombre del platillo ('app-busqueda'). Así lo pides en el HTML.
 * - imports: Son los ingredientes que necesitas comprar antes de empezar (otros módulos o componentes).
 * - templateUrl: Es la foto de cómo debe verse el platillo servido (el HTML).
 * - styleUrl: Es la decoración específica del plato (el CSS).
 */
@Component({
  selector: 'app-busqueda',
  standalone: true,
  // Aquí importamos las "herramientas" que vamos a usar en el HTML (ngFor, ngIf, forms, links...)
  imports: [RouterModule, FormsModule, NgFor, NgIf, AsyncPipe, TitleCasePipe],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  // Variables que guardan el estado actual de la pantalla (el "Model" de la vista).

  // Entrada (búsqueda simple)
  query = '';

  // Filtros (búsqueda avanzada)
  filters: SearchFilters = {
    type: 'todos',
    section: 'todas',
  };

  // Datos para filtros que llenan el <select>
  sections: string[] = [];

  // Resultados (como “API”)
  results$!: Observable<SiteItem[]>;
  cargando = false;

  /**
   * CONSTRUCTOR
   * Es lo primero que se ejecuta cuando el componente nace.
   * Aquí pedimos nuestras herramientas (Inyección de Dependencias):
   * 1. route: Para leer la barra de direcciones del navegador.
   * 2. api: Nuestro servicio de búsqueda (la navaja suiza que creamos antes).
   */
  constructor(private route: ActivatedRoute, private api: SearchApi) {
    // 1. Llenamos el dropdown de secciones pidiéndoselo a la API.
    this.sections = this.api.getSections();

    // 2. Escuchamos cambios en la URL (por si el usuario refresca o comparte el link).
    // Si la URL es "/busqueda?q=menu", entonces params.get('q') valdrá "menu".
    this.route.queryParamMap.subscribe(params => {
      // El operador ?? significa: "Si lo de la izquierda es null/undefined, usa lo de la derecha".
      const q = params.get('q') ?? '';
      this.query = q;
      // Disparamos la búsqueda automáticamente al entrar.
      this.doSearch();
    });
  }

  // Método que ejecuta la acción de buscar
  doSearch(): void {
    this.cargando = true;
    this.results$ = this.api.search(this.query, this.filters).pipe(
      finalize(() => this.cargando = false)
    );
  }

  // Método para reiniciar todo a cero
  clear(): void {
    this.query = '';
    this.filters = { type: 'todos', section: 'todas' };
    this.doSearch();
  }
}
