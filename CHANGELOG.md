# Changelog

Todas las mejoras notables y actualizaciones del proyecto "EcoAventura: Guardianes del Bosque" se documentarán en este archivo.

## [1.0.0] - 2026-01-14

### 🚀 Novedades (Features)
- **Nuevo Diseño "Light & Fresh"**: Reemplazo total de la estética oscura anterior por un diseño luminoso, limpio y premium, utilizando blancos niebla, verdes bosque y acentos naranjas.
- **Mapa Estilo Bitácora**:
  - Fondo con textura de papel ahuesado y cuadrícula sutil.
  - **Camino Dorado Dinámico**: El sendero se rellena visualmente con tinta dorada a medida que el usuario completa misiones.
  - **Nodos Interactivos**: Botones animados con estados (bloqueado, desbloqueado, completado) y efectos de pulso.
- **Sistema de Progresión**:
  - Barra de porcentaje en el Header.
  - **Auto-Scroll Móvil**: El mapa se desliza automáticamente al siguiente objetivo desbloqueado en dispositivos móviles.
- **Experiencia Móvil Mejorada**:
  - **Scroll Horizontal**: Implementación de un contenedor de mapa scrolleable con fondo infinito, evitando cortes visuales.
  - **Modal Compacto**: Reducción inteligente del tamaño de las imágenes y textos en los modales de información ("overlay") para evitar scrolls excesivos en pantallas pequeñas.
  - Header adaptativo que prioriza iconos y oculta textos secundarios.
- **Celebración Visual**: Integración de un sistema de partículas (Confetti) que se dispara al completar una misión con éxito.

### 🐛 Correcciones (Bug Fixes)
- **Alineación del Mapa**: Recalibración matemática (Curvas Bezier) de las posiciones de todos los nodos (Zorro, Quillay, Loica, Peumo, Puma) para que coincidan perfectamente con el trazado del camino SVG.
- **Fix de Fondo Cortado**: Solución al problema donde el fondo del mapa desaparecía al hacer scroll horizontal en móviles, mediante una reestructuración del DOM (`.map-scroll-content`).
- **Limpieza de Código**: Eliminación de dependencias rotas (`animejs`) y refactorización de componentes principales (`GameMap.tsx`, `App.tsx`) para eliminar lógica duplicada.
- **Estabilidad**: Corrección de importaciones circulares y errores de sintaxis en el componente `Header`.

### 💅 Estilos
- Migración completa a **Vanilla CSS** moderno con Variables CSS para un mantenimiento sencillo y carga rápida.
- Tipografía mejorada para legibilidad y jerarquía (fuentes sans-serif modernas).

---
*Hecho con dedicación para la educación ambiental.*
