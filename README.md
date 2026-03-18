# DoStack

Aplicación web de gestión de tareas construida con HTML, JavaScript vanilla y Tailwind CSS. Permite crear, editar, eliminar, completar, filtrar, buscar y reordenar tareas, con persistencia local mediante `localStorage` y una experiencia adaptada a desktop y móvil.

## Descripción breve

DoStack es una webapp ligera para organizar tareas por categoría y prioridad. La interfaz combina:

- Vista desktop con formulario de alta, barra de filtros, ordenación y panel lateral de categorías.
- Vista móvil con drawer de filtros, botón específico de ordenación, botón flotante para crear tareas y modal de alta.
- Persistencia automática de tareas y preferencia de tema claro/oscuro.

## Vista general

La aplicación está pensada como una SPA estática sin backend:

- No requiere base de datos.
- No usa frameworks de frontend.
- Guarda la información en el navegador.
- Se puede abrir localmente como sitio estático.

## Características principales

- Crear tareas con título, categoría y prioridad.
- Validar campos obligatorios antes de guardar.
- Evitar títulos duplicados.
- Editar tareas existentes en línea.
- Eliminar tareas.
- Marcar tareas como completadas individualmente.
- Marcar todas las tareas como completadas.
- Filtrar por estado: todas, abiertas o completadas.
- Filtrar por prioridad.
- Filtrar por categoría.
- Buscar por texto en título y categoría.
- Limpiar filtros en desktop y móvil.
- Ordenar por modo manual, alfabético, categoría o prioridad.
- Reordenar manualmente mediante drag & drop cuando la vista lo permite.
- Alternar entre modo claro y modo oscuro.
- Interfaz responsive con flujos diferenciados para desktop y móvil.

## Tecnologías usadas

- `HTML5` para la estructura de la interfaz.
- `JavaScript vanilla` para la lógica de la aplicación.
- `Tailwind CSS` para el sistema visual de utilidades.
- `PostCSS` para compilar los estilos.
- `localStorage` para persistencia en cliente.

## Estructura básica del proyecto

```text
.
├── index.html          # Estructura de la aplicación
├── app.js              # Estado, lógica de tareas y comportamiento UI
├── input.css           # Entrada de Tailwind/PostCSS
├── output.css          # CSS generado que carga la aplicación
├── tailwind.config.js  # Configuración de Tailwind
├── postcss.config.js   # Configuración de PostCSS
├── package.json        # Dependencias y scripts
├── icon.png            # Icono/logo de la app
└── docs/               # Material auxiliar del proyecto
```

## Instalación

1. Clona o descarga el proyecto.
2. Instala las dependencias:

```bash
npm install
```

## Ejecución en local

La aplicación es estática, así que hay dos formas sencillas de usarla:

### Opción 1: abrir el HTML directamente

Abre `index.html` en el navegador.

### Opción 2: usar un servidor estático local

Recomendado si quieres trabajar más cómodo durante el desarrollo. Puedes abrir la carpeta con Live Server o con cualquier servidor estático de tu entorno.

## Scripts disponibles

Los scripts definidos actualmente en `package.json` son:

```bash
npm run build
```

Compila `input.css` y genera `output.css` usando PostCSS.

```bash
npm run watch
```

Lanza el compilador en modo observación para regenerar `output.css` automáticamente al cambiar estilos o clases detectadas.

## Cómo funciona el build de CSS

El proyecto usa Tailwind a través de PostCSS:

- `input.css` importa Tailwind y define la variante `dark`.
- `tailwind.config.js` escanea `index.html` y `app.js`.
- `postcss.config.js` activa `@tailwindcss/postcss`.
- El resultado final se escribe en `output.css`, que es el archivo enlazado en `index.html`.

## Cómo usar la app

### Crear una tarea

En desktop:

- Usa el formulario superior `Nueva tarea`.
- Introduce un título.
- Selecciona categoría y prioridad.
- Pulsa `Añadir`.

En móvil:

- Pulsa el botón flotante `+`.
- Rellena el formulario del modal.
- Pulsa `Añadir`.

### Gestionar tareas

Cada tarea permite:

- Marcarse como completada con el checkbox.
- Editarse en línea.
- Guardar o cancelar los cambios.
- Eliminarse.

### Filtrar y buscar

- Filtra por categoría desde el panel lateral en desktop o desde el drawer en móvil.
- Filtra por prioridad y estado.
- Busca por texto en título y categoría.
- Usa `Limpiar` para volver al estado base de filtrado.

### Ordenar y reordenar

- Elige el modo de ordenación desde el control de ordenar.
- En modo `Manual`, la lista conserva el orden personalizado.
- En modos `Alfabético A-Z`, `Categoría` o `Prioridad`, el drag & drop se desactiva para evitar inconsistencias.

## Ejemplos de uso

### Ejemplo 1: crear una tarea personal

1. Escribe `Pedir cita médica`.
2. Selecciona la categoría `Salud`.
3. Elige prioridad `Alta`.
4. Pulsa `Añadir`.

Resultado: la tarea aparece en la lista y queda guardada en el navegador.

### Ejemplo 2: localizar tareas urgentes

1. Abre el filtro de prioridad.
2. Selecciona `Alta`.

Resultado: la lista muestra solo las tareas de prioridad alta.

### Ejemplo 3: buscar por texto

1. Escribe `estudio` en el campo de búsqueda.

Resultado: se muestran las tareas cuyo título o categoría contienen ese texto.

### Ejemplo 4: reordenar manualmente

1. Deja los filtros en estado base.
2. Selecciona el modo `Manual`.
3. Arrastra una tarea hasta la posición deseada.

Resultado: el nuevo orden se guarda y se recupera al volver a abrir la app.

### Ejemplo 5: editar una tarea existente

1. Pulsa el botón de edición de una tarea.
2. Cambia el título, la categoría o la prioridad.
3. Pulsa `Guardar`.

Resultado: la tarea se actualiza sin recargar la página.

### Ejemplo 6: usar la app en móvil

1. Abre el menú hamburguesa para acceder a filtros.
2. Usa el botón de ordenar de la cabecera de tareas.
3. Crea nuevas tareas desde el botón flotante `+`.
4. Usa `Marcar todas` al final del listado si quieres completar todas de una vez.

## Documentación funcional y arquitectura

La lógica principal vive en `app.js`. Aunque el archivo está organizado de forma lineal, internamente se divide bastante bien por responsabilidades.

### 1. Persistencia y almacenamiento local

Funciones relevantes:

- `getStorageItem`
- `setStorageItem`
- `removeStorageItem`
- `saveTasks`
- `loadTasks`

Qué hacen:

- Guardan y recuperan la lista de tareas.
- Persisten el tema seleccionado.
- Manejan errores de lectura o escritura en `localStorage`.
- Normalizan datos almacenados previamente si detectan formatos incompletos o inválidos.

Por qué son importantes:

- Permiten que la app siga funcionando sin backend.
- Hacen que la experiencia sea persistente entre sesiones.

### 2. Normalización y validación de datos

Funciones relevantes:

- `normalizeTextValue`
- `normalizeCategoryValue`
- `normalizeTask`
- `validateTextField`
- `validateCategoryField`
- `validateTaskInput`

Qué hacen:

- Limpian espacios.
- Validan que el título tenga entre 3 y 20 caracteres.
- Comprueban que la categoría y la prioridad sean válidas.
- Evitan tareas con títulos duplicados.
- Generan tareas consistentes antes de renderizarlas o guardarlas.

Por qué son importantes:

- Evitan estados incoherentes en la interfaz.
- Mantienen la persistencia limpia y homogénea.

### 3. Estado de vista, filtros y búsqueda

Funciones relevantes:

- `getViewState`
- `setViewState`
- `setViewCategoryFilter`
- `setViewStatusFilter`
- `setViewPriorityFilter`
- `setViewSearchTerm`
- `clearViewFilters`
- `applyFilter`

Qué hacen:

- Mantienen estado de filtros separado para desktop y móvil.
- Controlan categoría, estado, prioridad y búsqueda.
- Sincronizan el estado con los controles visibles en cada interfaz.
- Deciden qué tareas se muestran y cuáles se ocultan.

Por qué son importantes:

- Permiten una UX adaptada a cada viewport sin duplicar la lógica central de tareas.
- Mantienen coherencia entre estado interno y DOM.

### 4. Ordenación y orden manual

Funciones relevantes:

- `getSortModeForSurface`
- `getActiveSortMode`
- `getOrderedTasksForDisplay`
- `setSortModeForSurface`
- `syncSortUI`

Qué hacen:

- Gestionan modos de ordenación independientes para desktop y móvil.
- Permiten ordenar por:
  - Manual
  - Alfabético A-Z
  - Categoría
  - Prioridad
- Conservan el orden manual del usuario cuando vuelve al modo `Manual`.

Por qué son importantes:

- Separan el orden visual del orden persistido cuando se usan ordenaciones temporales.
- Evitan perder la personalización del usuario.

### 5. Drag & drop y reordenación manual

Funciones relevantes:

- `canReorderTasksInCurrentView`
- `updateTaskDraggability`
- `getDragAfterElement`
- `placeDragIndicator`
- `finalizeDraggedTaskPosition`
- `syncTaskOrderWithDOM`
- `attachTaskListDragAndDropHandlers`

Qué hacen:

- Activan el arrastre solo cuando la lista está en condiciones seguras:
  - sin filtros activos
  - sin búsqueda activa
  - en modo de ordenación manual
- Calculan la posición visual de inserción.
- Actualizan el array de tareas según el orden real del DOM.

Por qué son importantes:

- Garantizan que el orden persistido coincida con el orden que ve el usuario.
- Evitan inconsistencias cuando la lista está parcialmente filtrada u ordenada por otros criterios.

### 6. Renderizado y sincronización con el DOM

Funciones relevantes:

- `createTaskElement`
- `addTaskToDOM`
- `renderStoredTasks`
- `updateTaskContent`
- `updateTaskStyle`
- `syncTaskCompletionState`
- `commitTasksChange`

Qué hacen:

- Construyen cada tarjeta de tarea desde JavaScript.
- Aplican clases según estado, prioridad y edición.
- Sincronizan cambios de datos con el DOM.
- Reaplican filtros y guardado después de cada cambio significativo.

Por qué son importantes:

- Son el puente entre el estado `tasks` y la interfaz visible.
- Hacen que la app funcione sin plantillas ni framework.

### 7. Edición, creación y borrado de tareas

Funciones relevantes:

- `submitNewTask`
- `attachTaskEventHandlers`
- `setTaskEditMode`
- `populateTaskEditor`
- `closeAllTaskEditors`

Qué hacen:

- Gestionan el alta de nuevas tareas.
- Permiten editar una tarea en el mismo artículo del listado.
- Manejan guardar, cancelar, completar y eliminar.

Por qué son importantes:

- Concentrar estos flujos simplifica la interacción principal de la app.

### 8. Tema oscuro

Funciones relevantes:

- `updateThemeButton`
- lectura/escritura de `STORAGE_KEYS.theme`

Qué hacen:

- Alternan la clase `dark` en `body`.
- Actualizan el icono del botón de tema.
- Guardan la preferencia del usuario.

Por qué son importantes:

- Mejoran la experiencia visual y respetan la preferencia persistida entre sesiones.

### 9. Responsive y flujos móviles

Funciones relevantes:

- `isDesktopViewport`
- `setMobileFilterDrawerOpen`
- `setMobileTaskModalOpen`
- `updateMobileOverlayLock`
- `renderCategoryAsideFilters`

Qué hacen:

- Separan el comportamiento de desktop y móvil.
- Controlan drawer de filtros, modal de creación y botón flotante.
- Mantienen sincronizada la experiencia móvil con el mismo estado de tareas.

Por qué son importantes:

- La app no solo cambia de layout: también cambia de flujo de interacción.

## Persistencia de datos

La aplicación usa `localStorage` con dos claves principales:

- `tasks`: almacena la lista completa de tareas serializada en JSON.
- `theme`: guarda si el tema activo es `light` o `dark`.

Esto implica que:

- Los datos persisten entre recargas.
- La información queda ligada al navegador y dispositivo del usuario.
- No existe sincronización en la nube ni entre navegadores.

## Responsive y experiencia de usuario

### Desktop

- Panel lateral de categorías.
- Formulario visible de nueva tarea.
- Barra superior de búsqueda, filtros, limpiar, ordenar y acción masiva.
- Más espacio para edición en línea y gestión rápida.

### Móvil

- Menú hamburguesa dedicado a filtros.
- Botón específico para ordenar.
- FAB para crear tareas.
- Modal inferior para alta de nuevas tareas.
- Acción `Marcar todas` al final del listado.

## Decisiones de diseño visibles en el proyecto

- La app está pensada para funcionar completamente en cliente.
- El estado principal es un array de tareas en memoria sincronizado con el DOM.
- El renderizado de tareas se hace dinámicamente desde JavaScript.
- La experiencia responsive no se limita a CSS: también cambia la lógica de interacción.
- El orden manual se trata como un dato persistente, no solo como una apariencia visual.

## Posibles mejoras futuras

Estas mejoras no están implementadas actualmente, pero encajan bien con la base actual:

- Fechas límite y recordatorios.
- Subtareas o checklist por tarea.
- Sincronización con backend o nube.
- Etiquetas adicionales además de categoría.
- Tests automatizados para la lógica de validación y ordenación.
- Exportación e importación de tareas.
- Mejoras de accesibilidad adicionales para navegación por teclado y lectores de pantalla.

## Autor

Primera versión de documentación para el proyecto DoStack.

Si vas a publicar el repositorio, puedes completar esta sección con:

- Nombre o alias
- Perfil de GitHub
- Portfolio o sitio personal
