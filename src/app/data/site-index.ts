export type SiteItemType = 'pagina' | 'seccion';

export type SiteItem = {
  id: string;
  title: string;
  description: string;
  path: string;          // ruta Angular, ej: '/menu'
  type: SiteItemType;    // para filtrar (búsqueda avanzada)
  section: string;       // para filtrar por tema/sección
  keywords: string[];    // búsqueda simple
  otro?: String;// el simbolo de interrogación indica que el atributo puede ser opcional
};

export const SITE_INDEX: SiteItem[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    description: 'Página principal del sitio de práctica.',
    path: '/',
    type: 'pagina',
    section: 'Estructura del sitio',
    keywords: ['inicio', 'home', 'principal', 'estructura'],
    otro: "asdasd"
  },
  {
    id: 'elementos',
    title: 'Elementos del sitio',
    description: 'Identifica los elementos que componen un sitio web.',
    path: '/elementos',
    type: 'pagina',
    section: 'Estructura del sitio',
    keywords: ['elementos', 'sitio', 'header', 'footer', 'main', 'layout'],
  },
  {
    id: 'menu',
    title: 'Menú',
    description: 'Elementos principales del menú web y su utilidad.',
    path: '/menu',
    type: 'pagina',
    section: 'Navegación',
    keywords: ['menu', 'navegación', 'navbar', 'links', 'persistente'],
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Describe el funcionamiento y utilidad de los breadcrumbs.',
    path: '/breadcrumbs',
    type: 'pagina',
    section: 'Navegación',
    keywords: ['breadcrumbs', 'migas', 'ruta', 'navegación', 'ux'],
  },
  {
    id: 'mapa',
    title: 'Mapa del sitio',
    description: 'Diseño del mapa del sitio y relación con la navegación.',
    path: '/mapa-sitio',
    type: 'pagina',
    section: 'Estructura del sitio',
    keywords: ['mapa', 'sitio', 'sitemap', 'estructura', 'rutas'],
  },
  {
    id: 'error404',
    title: 'Error 404',
    description: 'Página para rutas no existentes (404).',
    path: '/no-existe',
    type: 'seccion',
    section: 'Errores',
    keywords: ['404', 'error', 'no encontrado', 'ruta'],
  },
];
