# DoStack

DoStack es una aplicación web para **gestionar tareas de forma simple y visual**.

Permite crear, editar, completar, eliminar, buscar y filtrar tareas desde una interfaz clara, responsive y fácil de usar tanto en **desktop** como en **móvil**.

Actualmente el proyecto está dividido en dos partes:

- **Frontend**: interfaz de usuario hecha con HTML, JavaScript vanilla y Tailwind CSS.
- **Backend**: API REST construida con Node.js y Express para gestionar las tareas.

---

## ✨ Qué permite hacer

Con DoStack puedes:

- Crear nuevas tareas
- Editar tareas existentes
- Marcar tareas como completadas
- Eliminar tareas
- Marcar todas las tareas como completadas
- Buscar tareas por texto
- Filtrar por estado, categoría y prioridad
- Ordenar la lista de tareas
- Usar la app cómodamente en desktop y móvil
- Mantener tu preferencia de tema claro/oscuro

---

## 🧰 Tecnologías utilizadas

### Frontend

- **HTML5**
- **JavaScript (Vanilla JS)**
- **Tailwind CSS**
- **PostCSS**

### Backend

- **Node.js**
- **Express**
- **CORS**
- **dotenv**
- **Nodemon**

---

## 🧱 Estructura general del proyecto

```bash
.
├── docs/
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── .env
│   └── package.json
├── app.js
├── index.html
├── input.css
├── output.css
├── styles.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🖥️ Frontend

La parte visual de DoStack está hecha sin frameworks, usando JavaScript puro.

Incluye:

- formulario de creación de tareas
- lista de tareas dinámica
- filtros y buscador
- sistema de ordenación
- modo claro / oscuro
- diseño responsive

El frontend ya está conectado al backend mediante peticiones HTTP, por lo que **las tareas ya no se guardan en `localStorage`** como sistema principal.

> ℹ️ Actualmente solo se mantiene en `localStorage` la preferencia del tema visual (claro/oscuro).

---

## ⚙️ Backend

El backend de DoStack está construido con **Express** y sigue una arquitectura por capas para mantener el código más limpio y organizado.

Se encarga de:

- recibir peticiones HTTP
- validar datos
- gestionar tareas
- devolver respuestas JSON
- manejar errores

### Funcionalidades del backend

- Obtener todas las tareas
- Crear tareas
- Actualizar tareas
- Cambiar el estado `completed`
- Eliminar tareas

### Endpoint principal

```bash
http://localhost:3000/api/v1/tasks
```

> 📌 La documentación técnica completa del backend está en `server/README.md`.

---

## 🚀 Cómo ejecutar el proyecto

### 1. Instalar dependencias del frontend

En la raíz del proyecto:

```bash
npm install
```

### 2. Instalar dependencias del backend

Entrar en la carpeta `server`:

```bash
cd server
npm install
```

### 3. Crear el archivo `.env` del servidor

Dentro de `server/`, crea un archivo `.env` con este contenido:

```env
PORT=3000
```

### 4. Iniciar el backend

Desde la carpeta `server/`:

```bash
npm run dev
```

### 5. Iniciar el frontend

Puedes abrir directamente `index.html` o usar una extensión como **Live Server** para trabajar más cómodamente.

---

## 📦 Scripts disponibles

### En la raíz del proyecto

```bash
npm run build
```

Compila los estilos con Tailwind/PostCSS.

```bash
npm run watch
```

Mantiene la compilación activa mientras haces cambios.

### En `server/`

```bash
npm run dev
```

Inicia el servidor backend con **nodemon**.

---

## 📱 Responsive

DoStack está adaptado para diferentes tamaños de pantalla.

### Desktop

- formulario visible para crear tareas
- barra superior de búsqueda, filtros y ordenación
- panel lateral de categorías

### Móvil

- menú hamburguesa para filtros
- botón flotante para crear tareas
- modal para añadir tareas
- controles adaptados a pantalla pequeña

---

## 🔍 Estado actual del proyecto

Actualmente DoStack ya cuenta con:

- Frontend funcional
- Backend con Express funcionando
- API REST conectada al frontend
- CRUD completo operativo
- Validaciones básicas en frontend y backend
- Gestión visual de carga y errores en la carga inicial
- Limpieza de persistencia local de tareas
- Acción de “completar todas” sincronizada con backend

---

## ⚠️ Limitación actual

En esta fase del proyecto, el backend guarda las tareas **en memoria**.

Eso significa que:

- si se apaga el servidor,
- o si se reinicia,

👉 las tareas se pierden.

Esto es normal en esta etapa y forma parte del proceso de construir primero la API antes de conectar una base de datos real.

---

## 📚 Documentación adicional

- `server/README.md` → documentación técnica del backend
- `docs/` → documentación auxiliar del proyecto

---

## 📈 Posibles mejoras futuras

Algunas mejoras naturales para el proyecto serían:

- añadir base de datos
- autenticación de usuarios
- persistencia real entre reinicios
- documentación Swagger
- tests automáticos
- mejoras de accesibilidad
- exportación/importación de tareas

---

## 👨‍💻 Autor

Ashbitz
