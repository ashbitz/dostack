# Uso de Cursor en el proyecto TaskFlow

Durante el desarrollo del proyecto TaskFlow se utilizó Cursor como herramienta de apoyo para mejorar el código y experimentar con sus funciones de asistencia mediante IA.

A continuación se documentan algunos de los usos más relevantes realizados durante el desarrollo.

---

## Uso de Composer para cambios en varios archivos

Se utilizó Composer de Cursor para generar cambios que afectaran a varios archivos del proyecto al mismo tiempo.

Composer permite analizar el contexto completo del proyecto y proponer modificaciones coordinadas entre diferentes archivos. En este caso, se utilizó para implementar mejoras que requerían cambios tanto en la interfaz como en la lógica de la aplicación.

Por ejemplo, se utilizó para añadir funcionalidades relacionadas con el filtrado de tareas. Esto implicó modificar elementos de la interfaz en el HTML y añadir lógica de filtrado en app.js.

Composer generó una propuesta inicial de cambios que posteriormente se revisó antes de aplicarla al proyecto.

Este tipo de flujo permite realizar cambios más complejos con mayor rapidez, manteniendo siempre el control sobre el código final.

---

## Atajos de teclado utilizados en Cursor

Durante el desarrollo se utilizaron algunos atajos de teclado relacionados con las funciones de IA de Cursor que agilizan bastante el trabajo:

### Ctrl + K

Permite abrir la edición inline con IA sobre el código seleccionado.

Se utilizó para pedir explicaciones sobre funciones, mejorar la legibilidad del código o realizar pequeñas modificaciones.

### Ctrl + I

Para acceder al chat y poder hablar con el asistente.

### Ctrl + Shift + P

Para abrir Command Palette, que permite acceder rápidamente a diferentes herramientas de Cursor o visualizar otros comandos o acceder a su configuración.

Estos atajos facilitan trabajar con Cursor sin tener que cambiar de herramienta.

---

## Ejemplos donde Cursor mejoró el código

### Refactorización de la función addTaskToDOM

Uno de los cambios más útiles realizados con ayuda de Cursor fue mejorar la estructura de la función addTaskToDOM.

Inicialmente esta función contenía demasiada lógica: creación de elementos del DOM, aplicación de estilos y gestión de eventos.

Con ayuda de Cursor se reorganizó el código dividiendo esta lógica en varias funciones más pequeñas como createTaskElement, updateTaskStyle y attachTaskEventHandlers.

De esta forma addTaskToDOM pasó a encargarse únicamente de coordinar el proceso de creación y renderizado de la tarea, lo que hace que el código sea más claro.

### Mejora del manejo de errores

Otra mejora sugerida con Cursor fue añadir manejo de errores en la función encargada de guardar las tareas en localStorage.

Se añadió un bloque try / catch para evitar posibles fallos si el navegador no puede guardar los datos. Esto hace que la aplicación sea más robusta y permite detectar problemas de almacenamiento más fácilmente.

### Mejora de la legibilidad del código

Cursor también se utilizó para revisar algunas partes del código y proponer pequeñas mejoras de legibilidad. En algunos casos ayudó a reorganizar funciones y simplificar ciertas secciones del código para que fueran más fáciles de entender.

También se le pidió a modo de prueba que comentara el archivo app.js para separar y explicar que hace cada parte del código.
