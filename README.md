# Portfolio v2 - Emilio

Portfolio profesional desarrollado con React, TypeScript, Tailwind CSS y Vite.

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx      # Barra de navegación
│   ├── Footer.tsx      # Pie de página
│   └── index.ts        # Barrel exports
│
├── sections/           # Secciones principales del portfolio
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ContactSection.tsx
│   └── index.ts
│
├── hooks/              # Custom React hooks
│   └── useScrollTracking.ts
│
├── types/              # Definiciones de TypeScript
│   └── index.ts
│
├── constants/          # Datos y configuraciones
│   └── data.tsx
│
├── App.tsx            # Componente principal (limpio y modular)
├── main.tsx           # Entry point
└── index.css          # Estilos globales
```

## 🎯 Características

- **Arquitectura Modular**: Componentes y secciones separadas para facilitar el mantenimiento
- **TypeScript**: Tipado fuerte para prevenir errores
- **Custom Hooks**: Lógica reutilizable (scroll tracking)
- **Constantes Centralizadas**: Datos separados de la presentación
- **Barrel Exports**: Imports más limpios y organizados

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 🛠️ Stack Tecnológico

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (iconos)

## � SEO & Performance

El portfolio está optimizado para motores de búsqueda con:

- ✅ **Meta tags completas**: Open Graph, Twitter Card, y meta tags primarias
- ✅ **Datos estructurados**: JSON-LD con schema.org (Person, WebSite)
- ✅ **PWA Ready**: Manifest.json configurado
- ✅ **Sitemap.xml**: Todas las secciones indexadas
- ✅ **robots.txt**: Optimizado para crawlers
- ✅ **Canonical URLs**: Prevención de contenido duplicado
- ✅ **Hreflang tags**: Soporte multiidioma
- ✅ **Página 404 personalizada**
- ✅ **Build optimizado**: Code splitting, minificación, tree shaking
- ✅ **Accesibilidad**: Etiquetas alt, HTML semántico

Ver [SEO-IMPROVEMENTS.md](./SEO-IMPROVEMENTS.md) para detalles completos.

## 📝 Buenas Prácticas

1. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad única
2. **DRY (Don't Repeat Yourself)**: Datos en constantes, lógica en hooks
3. **Tipado Estricto**: Interfaces para todos los props
4. **Estructura Escalable**: Fácil añadir nuevas secciones o componentes
5. **SEO-First**: Optimizado desde el diseño para buscadores
