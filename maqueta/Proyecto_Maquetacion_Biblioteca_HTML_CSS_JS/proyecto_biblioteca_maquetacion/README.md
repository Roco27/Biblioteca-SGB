# Proyecto de Maquetación — Sistema de Gestión Bibliotecaria

## Descripción
Maquetación web del **Sistema de Gestión Bibliotecaria** desarrollada con HTML5, CSS3 y JavaScript, tomando como base la evidencia **GA5-220501095-AA1-EV03 — Elaboración de Interfaz Gráfica y Mapa de Navegación**.

La propuesta implementa las diez pantallas/prototipos definidos en la evidencia:
- P-01 Inicio de sesión
- P-02 Panel principal
- P-03 Catálogo de libros
- P-04 Búsqueda de libros
- P-05 Detalle del libro
- P-06 Reserva de libro
- P-07 Gestión de préstamos
- P-08 Devolución
- P-09 Gestión de usuarios
- P-10 Gestión de libros

## Tecnologías
- HTML5
- CSS3
- JavaScript ES6+
- Diseño responsive
- Componentes reutilizables mediante funciones JavaScript

## Estructura
```text
proyecto_biblioteca_maquetacion/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── (reservado para imágenes/logos)
```

## Cómo ejecutar
1. Descomprimir el proyecto.
2. Abrir `index.html` en un navegador.
3. Seleccionar un rol de demostración:
   - Administrador
   - Bibliotecario
   - Usuario
4. Navegar por los módulos disponibles.

No requiere servidor para la demostración de la maquetación.

## Correspondencia con los requisitos
- RF-01 a RF-03: inicio de sesión y acceso según rol.
- RF-04 a RF-05: panel y navegación por permisos.
- RF-06 a RF-07: catálogo y disponibilidad.
- RF-08 a RF-09: búsqueda y resultados.
- RF-10 a RF-11: detalle y disponibilidad.
- RF-12 a RF-13: reserva.
- RF-14 a RF-15: préstamos.
- RF-16 a RF-17: devoluciones y actualización de disponibilidad.
- RF-18 a RF-19: usuarios y roles.
- RF-20 a RF-22: gestión de libros.

## Alcance
Este proyecto corresponde a una **maquetación funcional de interfaz**. Los datos son de demostración y no se conecta todavía con PHP/MySQL. La persistencia, autenticación real y operaciones CRUD definitivas pueden incorporarse posteriormente.

## Criterios de usabilidad y accesibilidad
Se incluyen navegación consistente, botones identificables, etiquetas de formularios, mensajes de retroalimentación, diseño adaptable a diferentes resoluciones y una opción de contraste reforzado.

## Evidencia base
La estructura sigue la propuesta de interfaz y navegación del documento del SENA, que define una aplicación web con HTML5, CSS3 y JavaScript, con perfiles de Administrador, Bibliotecario y Usuario.
