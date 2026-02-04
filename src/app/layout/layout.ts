import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Breadcrumb } from '../component/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, FormsModule, Breadcrumb],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  quickQuery = '';

  constructor(private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollPosition / scrollHeight) : 0;

    // Actualizamos la variable global en el documento
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent.toString());
  }

  goSearch(): void {
    const q = (this.quickQuery || '').trim();
    // Navega a /busqueda?q=...
    this.router.navigate(['/busqueda'], { queryParams: { q } });
  }
}
