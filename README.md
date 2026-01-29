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

## 📝 Buenas Prácticas

1. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad única
2. **DRY (Don't Repeat Yourself)**: Datos en constantes, lógica en hooks
3. **Tipado Estricto**: Interfaces para todos los props
4. **Estructura Escalable**: Fácil añadir nuevas secciones o componentes
