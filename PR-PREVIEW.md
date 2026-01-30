# PR Preview Deployment

Este proyecto incluye un pipeline automatizado de GitHub Actions que crea vistas previas (previews) de los Pull Requests.

## 🚀 Cómo Funciona

Cuando se crea o actualiza un Pull Request:

1. **Build Automático**: Se construye el proyecto con una ruta base específica para el PR
2. **Deploy a GitHub Pages**: Se despliega en un subdirectorio dedicado: `/pr-preview/pr-{número}/`
3. **Comentario Automático**: Se añade un comentario al PR con el enlace a la vista previa
4. **Actualizaciones**: Cada vez que se hace push al PR, la vista previa se actualiza automáticamente
5. **Limpieza**: Cuando el PR se cierra o se fusiona, la vista previa se elimina automáticamente

## 📍 URLs de Preview

Las vistas previas se publican en:
```
https://ematgim.github.io/pr-preview/pr-{número}/
```

Por ejemplo:
- PR #1: `https://ematgim.github.io/pr-preview/pr-1/`
- PR #42: `https://ematgim.github.io/pr-preview/pr-42/`

## ⚙️ Configuración Técnica

### Workflow de GitHub Actions

El workflow `.github/workflows/pr-preview.yml` incluye dos jobs:

1. **deploy-preview**: Se ejecuta cuando el PR está abierto o se actualiza
   - Construye el proyecto con `VITE_BASE_PATH` dinámico
   - Despliega a la rama `gh-pages` en el subdirectorio apropiado
   - Crea o actualiza un comentario en el PR con el enlace

2. **cleanup-preview**: Se ejecuta cuando el PR se cierra
   - Elimina el directorio de preview de la rama `gh-pages`
   - Añade un comentario de confirmación de limpieza

### Configuración de Vite

El archivo `vite.config.ts` ha sido actualizado para soportar rutas base dinámicas:

```typescript
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
```

Esto permite que cada preview se construya con su propia ruta base sin afectar el deployment principal.

## 🔒 Permisos Requeridos

El workflow requiere los siguientes permisos:
- `contents: write` - Para escribir en la rama gh-pages
- `pull-requests: write` - Para añadir comentarios a los PRs

## 💡 Ventajas

- **Revisión Visual**: Los revisores pueden ver los cambios en acción antes de aprobar
- **Testing en Producción**: Prueba la build de producción en un entorno real
- **Sin Configuración**: Funciona automáticamente para todos los PRs
- **Limpieza Automática**: No deja archivos huérfanos en gh-pages

## 🛠️ Mantenimiento

Las vistas previas se mantienen automáticamente:
- Se crean cuando se abre un PR
- Se actualizan con cada push
- Se eliminan cuando el PR se cierra o fusiona

No se requiere intervención manual.
