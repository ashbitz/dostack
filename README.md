![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

# ✅ DoStack

DoStack es una aplicación web para **gestionar tareas de forma simple y visual**.

Permite crear, editar, completar, eliminar, buscar y filtrar tareas desde una interfaz clara, responsive y fácil de usar tanto en **desktop** como en **móvil**.

Actualmente el proyecto está dividido en dos partes:

- **Frontend** → interfaz de usuario hecha con HTML, JavaScript vanilla y Tailwind CSS.
- **Backend** → API REST construida con Node.js y Express para gestionar las tareas.

---

## 📱 Descripción del proyecto

DoStack permite organizar tareas desde una interfaz clara, visual y responsive.

La aplicación está pensada para gestionar tareas de forma sencilla, manteniendo una separación entre la parte visual del proyecto y una API REST encargada de gestionar los datos.

El frontend ya está conectado al backend mediante peticiones HTTP, por lo que **las tareas ya no se guardan en `localStorage`** como sistema principal.

> ℹ️ Actualmente solo se mantiene en `localStorage` la preferencia del tema visual, claro u oscuro.

---

## ✨ Características principales

- Crear nuevas tareas.
- Editar tareas existentes.
- Marcar tareas como completadas.
- Eliminar tareas.
- Marcar todas las tareas como completadas.
- Buscar tareas por texto.
- Filtrar por estado, categoría y prioridad.
- Ordenar la lista de tareas.
- Usar la app cómodamente en desktop y móvil.
- Mantener la preferencia de tema claro/oscuro.
- Mostrar estados visuales de carga y error en la carga inicial.

---

## 🛠 Tecnologías

### Frontend

| Tecnología         | Uso                                                |
| ------------------ | -------------------------------------------------- |
| HTML5              | Estructura principal de la aplicación              |
| JavaScript Vanilla | Lógica de la interfaz y gestión dinámica de tareas |
| Tailwind CSS       | Estilos y diseño responsive                        |
| PostCSS            | Procesado de estilos                               |

### Backend

| Tecnología | Uso                                            |
| ---------- | ---------------------------------------------- |
| Node.js    | Entorno de ejecución del servidor              |
| Express    | Creación de la API REST                        |
| CORS       | Comunicación entre frontend y backend          |
| dotenv     | Gestión de variables de entorno                |
| Nodemon    | Reinicio automático del servidor en desarrollo |

---

## 🧱 Estructura general del proyecto

```txt
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

- Formulario de creación de tareas.
- Lista de tareas dinámica.
- Filtros y buscador.
- Sistema de ordenación.
- Modo claro / oscuro.
- Diseño responsive.

---

## ⚙️ Backend

El backend de DoStack está construido con **Express** y sigue una arquitectura por capas para mantener el código más limpio y organizado.

Se encarga de:

- Recibir peticiones HTTP.
- Validar datos.
- Gestionar tareas.
- Devolver respuestas JSON.
- Manejar errores.

### Funcionalidades del backend

- Obtener todas las tareas.
- Crear tareas.
- Actualizar tareas.
- Cambiar el estado `completed`.
- Eliminar tareas.

### Endpoint principal

```txt
http://localhost:3000/api/v1/tasks
```

> 📌 La documentación técnica completa del backend está en `server/README.md`.

---

## ▶️ Ejecución en local

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

- Formulario visible para crear tareas.
- Barra superior de búsqueda, filtros y ordenación.
- Panel lateral de categorías.

### Móvil

- Menú hamburguesa para filtros.
- Botón flotante para crear tareas.
- Modal para añadir tareas.
- Controles adaptados a pantalla pequeña.

---

## 🚧 Estado del proyecto

Actualmente DoStack ya cuenta con:

- Frontend funcional.
- Backend con Express funcionando.
- API REST conectada al frontend.
- CRUD completo operativo.
- Validaciones básicas en frontend y backend.
- Gestión visual de carga y errores en la carga inicial.
- Limpieza de persistencia local de tareas.
- Acción de “completar todas” sincronizada con backend.

---

## ⚠️ Limitación actual

En esta fase del proyecto, el backend guarda las tareas **en memoria**.

Eso significa que:

- Si se apaga el servidor.
- O si se reinicia.

👉 Las tareas se pierden.

Esto es normal en esta etapa y forma parte del proceso de construir primero la API antes de conectar una base de datos real.

---

## 📚 Documentación adicional

- `server/README.md` → documentación técnica del backend.
- `docs/` → documentación auxiliar del proyecto.

---

## 📈 Posibles mejoras futuras

Algunas mejoras naturales para el proyecto serían:

- Añadir base de datos.
- Autenticación de usuarios.
- Persistencia real entre reinicios.
- Documentación Swagger.
- Tests automáticos.
- Mejoras de accesibilidad.
- Exportación/importación de tareas.

---

## 👨‍💻 Autor

Ashbitz
