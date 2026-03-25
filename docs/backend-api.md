# Backend API - Herramientas y conceptos

Este documento recoge algunas herramientas y conceptos habituales en el desarrollo de APIs backend y su utilidad dentro de un proyecto como DoStack.

---

## 📡 Axios

### ¿Qué es?

Axios es una librería de JavaScript que permite hacer peticiones HTTP de forma sencilla (GET, POST, PUT, DELETE, etc.).

### ¿Para qué se usa?

Se utiliza en el frontend para comunicarse con el backend.

Ejemplo típico:

- obtener tareas
- crear una nueva tarea
- actualizar una tarea

### ¿Por qué es útil?

- Simplifica las peticiones HTTP frente a `fetch`
- Maneja mejor errores y respuestas
- Permite configurar interceptores (por ejemplo, para añadir headers)

### En este proyecto

En DoStack se usa `fetch` nativo, pero Axios sería una alternativa más potente si el proyecto creciera.

---

## 🧪 Postman / Thunder Client

### ¿Qué son?

Son herramientas para probar APIs manualmente sin necesidad de usar el frontend.

- Postman: aplicación completa externa
- Thunder Client: extensión dentro de VS Code

### ¿Para qué se usan?

Permiten:

- enviar peticiones HTTP
- probar endpoints
- verificar respuestas
- simular errores

### Ejemplos en este proyecto

Se han usado para probar:

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `PUT /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id/completed`
- `DELETE /api/v1/tasks/:id`

También para probar errores como:

- enviar datos inválidos → `400`
- eliminar una tarea inexistente → `404`

### ¿Por qué es importante?

Porque permite validar que la API funciona correctamente **independientemente del frontend**.

---

## 🚨 Sentry

### ¿Qué es?

Sentry es una herramienta de monitorización de errores en aplicaciones.

### ¿Para qué se usa?

- Detectar errores en producción
- Registrar fallos automáticamente
- Ver trazas de errores (stack trace)
- Analizar qué está fallando y dónde

### ¿Por qué es útil?

En un entorno real:

- no tienes consola del usuario
- necesitas saber cuándo algo falla en producción

Sentry permite ver errores en tiempo real sin depender del usuario.

### En este proyecto

No está implementado, pero sería una mejora clara para detectar errores del backend o frontend en producción.

---

## 📚 Swagger

### ¿Qué es?

Swagger es una herramienta para documentar APIs de forma visual e interactiva.

### ¿Para qué se usa?

Permite:

- ver todos los endpoints disponibles
- probar peticiones directamente desde el navegador
- entender qué datos espera la API

### ¿Por qué es útil?

- Facilita trabajar en equipo
- Sirve como documentación viva de la API
- Evita tener que leer el código para entender endpoints

### En este proyecto

Actualmente la API está documentada manualmente en el README del server, pero Swagger sería una mejora para:

- visualizar endpoints
- facilitar pruebas
- mejorar la experiencia de otros desarrolladores

---

## 🧠 Conclusión

Estas herramientas no son obligatorias para que una API funcione, pero son fundamentales en proyectos reales porque:

- facilitan el desarrollo
- mejoran el testing
- permiten detectar errores
- ayudan a documentar el sistema
