# DoStack Server

Backend de **DoStack**, desarrollado con **Node.js + Express**, encargado de gestionar la API de tareas de la aplicación.

Este servidor permite realizar operaciones **CRUD** sobre tareas y está preparado para integrarse con el frontend del proyecto.

---

## 📌 Objetivo

El propósito de este backend es separar la lógica de datos del frontend y ofrecer una API organizada, mantenible y escalable.

Actualmente, el servidor permite:

- Obtener todas las tareas
- Crear nuevas tareas
- Actualizar una tarea completa
- Marcar una tarea como completada o no completada
- Eliminar tareas

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **CORS**
- **dotenv**
- **Nodemon**

---

## 📂 Estructura del proyecto

```bash
server/
├── .env
├── package.json
├── package-lock.json
└── src/
    ├── config/
    │   └── env.js
    ├── controllers/
    │   └── task.controller.js
    ├── middlewares/
    │   └── error.middleware.js
    ├── routes/
    │   └── task.routes.js
    ├── services/
    │   └── task.service.js
    └── index.js
```

---

## 🧠 Arquitectura utilizada

El backend sigue una estructura modular por responsabilidades:

### `index.js`

Punto de entrada del servidor.

Se encarga de:

- Inicializar Express
- Configurar middlewares globales
- Registrar rutas
- Arrancar el servidor
- Aplicar el middleware de errores

### `config/env.js`

Gestiona las variables de entorno del proyecto.

Actualmente valida que exista el puerto configurado en `.env`.

### `routes/task.routes.js`

Define las rutas HTTP relacionadas con las tareas.

Aquí se conectan los endpoints con sus funciones del controlador.

### `controllers/task.controller.js`

Contiene la lógica que recibe las peticiones HTTP.

Su responsabilidad es:

- Leer datos de `req.body` o `req.params`
- Validar la información recibida
- Llamar al servicio correspondiente
- Devolver la respuesta HTTP adecuada

### `services/task.service.js`

Contiene la lógica de negocio y gestión de datos.

En este proyecto:

- Guarda las tareas en memoria
- Genera IDs únicos con `crypto.randomUUID()`
- Busca, actualiza y elimina tareas

> ⚠️ Importante: actualmente **las tareas no se guardan en base de datos ni en archivo**, solo viven en memoria mientras el servidor está encendido.

### `middlewares/error.middleware.js`

Middleware centralizado para manejar errores.

Actualmente controla:

- Recursos no encontrados (`404`)
- Errores internos del servidor (`500`)

Esto evita repetir lógica de errores en cada ruta.

---

## ⚙️ Instalación

### 1. Entrar en la carpeta del servidor

```bash
cd server
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo `.env`

Crear un archivo `.env` en la raíz de `server/` con este contenido:

```env
PORT=3000
```

### 4. Iniciar el servidor en desarrollo

```bash
npm run dev
```

Si todo va bien, verás algo parecido a:

```bash
Servidor escuchando en http://localhost:3000
```

---

## ▶️ Scripts disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor con **nodemon**, reiniciándolo automáticamente al guardar cambios.

---

## 🌐 Base URL

```bash
http://localhost:3000
```

### Endpoint base de tareas

```bash
http://localhost:3000/api/v1/tasks
```

---

## 📬 Endpoints disponibles

### `GET /api/v1/tasks`

Obtiene todas las tareas.

#### Respuesta esperada:

```json
[
  {
    "id": "uuid",
    "title": "Estudiar Node",
    "category": "estudio",
    "priority": "alta",
    "completed": false
  }
]
```

### `POST /api/v1/tasks`

Crea una nueva tarea.

#### Body requerido:

```json
{
  "title": "Hacer ejercicio",
  "category": "salud",
  "priority": "media",
  "completed": false
}
```

#### Respuesta esperada:

```json
{
  "id": "uuid",
  "title": "Hacer ejercicio",
  "category": "salud",
  "priority": "media",
  "completed": false
}
```

#### Validaciones aplicadas:

- `title`:
  - obligatorio
  - debe ser string
  - mínimo 3 caracteres
- `category`:
  - obligatoria
  - debe pertenecer a una categoría válida
- `priority`:
  - solo puede ser:
    - `alta`
    - `media`
    - `baja`
- `completed`:
  - debe ser booleano (`true` o `false`)

### `PUT /api/v1/tasks/:id`

Actualiza una tarea completa por ID.

#### Body requerido:

```json
{
  "title": "Actualizar tarea",
  "category": "trabajo",
  "priority": "alta",
  "completed": true
}
```

#### Respuesta esperada:

```json
{
  "id": "uuid",
  "title": "Actualizar tarea",
  "category": "trabajo",
  "priority": "alta",
  "completed": true
}
```

### `PATCH /api/v1/tasks/:id/completed`

Actualiza únicamente el estado `completed` de una tarea.

#### Body requerido:

```json
{
  "completed": true
}
```

#### Respuesta esperada:

```json
{
  "id": "uuid",
  "title": "Mi tarea",
  "category": "hogar",
  "priority": "baja",
  "completed": true
}
```

### `DELETE /api/v1/tasks/:id`

Elimina una tarea por ID.

#### Respuesta esperada:

```http
204 No Content
```

---

## 🧪 Ruta de prueba

### `GET /`

Permite comprobar rápidamente que el servidor está funcionando.

#### Respuesta:

```text
Servidor funcionando 🚀
```

---

## 🧾 Categorías válidas

Actualmente el sistema acepta estas categorías:

- `trabajo`
- `hogar`
- `estudio`
- `ocio`
- `personal`
- `salud`
- `otra`

---

## 🚨 Gestión de errores

El servidor devuelve errores claros según el caso:

### Error de validación (`400`)

Ejemplo:

```json
{
  "error": "El título es obligatorio y debe tener al menos 3 caracteres"
}
```

### Recurso no encontrado (`404`)

Ejemplo:

```json
{
  "error": "Recurso no encontrado"
}
```

### Error interno del servidor (`500`)

Ejemplo:

```json
{
  "error": "Error interno del servidor"
}
```

---

## ⚠️ Limitación actual

Actualmente las tareas se almacenan en un array en memoria dentro del servicio.

Eso significa que:

- si el servidor se reinicia,
- o si se detiene el proceso,

👉 **todas las tareas se pierden**.

Esto es normal en esta fase del proyecto y sirve para practicar la estructura backend antes de conectar una base de datos o persistencia real.

---

## 🔄 Flujo de funcionamiento

El flujo general del backend es este:

1. El cliente hace una petición HTTP
2. La petición entra por una ruta (`routes`)
3. El controlador (`controller`) valida y procesa la petición
4. El servicio (`service`) ejecuta la lógica de datos
5. Se devuelve una respuesta JSON al cliente
6. Si ocurre un error, lo captura el middleware de errores

---

## 📈 Posibles mejoras futuras

Este backend está preparado para crecer.

Algunas mejoras naturales serían:

- Conectar una base de datos (por ejemplo PostgreSQL o MongoDB)
- Persistir tareas aunque se reinicie el servidor
- Añadir autenticación de usuarios
- Separar validaciones en middlewares dedicados
- Añadir tests automáticos
- Documentar la API con Swagger
- Añadir paginación o filtros por categoría/estado

---

## 👨‍💻 Resumen técnico

Este servidor implementa una API REST sencilla estructurada con:

- separación de responsabilidades
- validación de datos
- manejo centralizado de errores
- rutas limpias y versionadas
- base preparada para futura escalabilidad

---

## 📌 Estado actual del backend

✔ CRUD funcional  
✔ Integración lista para frontend  
✔ Validaciones básicas implementadas  
✔ Middleware de errores implementado  
✔ Persistencia temporal en memoria
