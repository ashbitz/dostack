# Instalación de un servidor MCP (filesystem)

Para este ejercicio se instaló el servidor MCP filesystem, que permite a la IA acceder a archivos del proyecto.

## Paso 1: Crear la carpeta de configuración

Dentro del proyecto se creó una carpeta llamada:

.cursor

## Paso 2: Crear el archivo de configuración

Dentro de esa carpeta se creó el archivo:

mcp.json

Ruta final:

proyecto/.cursor/mcp.json

## Paso 3: Añadir la configuración del servidor

Dentro del archivo se añadió la siguiente configuración:

{
"mcpServers": {
"filesystem": {
"command": "npx",
"args": [
"-y",
"@modelcontextprotocol/server-filesystem",
"C:\\ruta\\del\\proyecto"
]
}
}
}

Esta configuración hace lo siguiente:

Ejecuta el servidor MCP usando npx

Instala automáticamente el servidor filesystem

Permite que la IA acceda a la carpeta del proyecto

## Paso 4: Guardar la configuración

Después de guardar el archivo, Cursor detecta automáticamente el servidor MCP y lo activa.

En la sección Tools & MCP de Cursor se puede ver el servidor instalado y activo.

En este caso apareció el servidor filesystem con varias herramientas disponibles.

# Comprobación del funcionamiento

Una vez instalado el servidor MCP, la IA puede acceder a archivos del proyecto.

Por ejemplo, se pueden realizar consultas como:

listar los archivos del proyecto

analizar el archivo principal de la aplicación

buscar dónde se utiliza localStorage

revisar cómo están implementados los filtros de tareas

Esto permite que la IA analice directamente el código del proyecto.

# Utilidad de MCP en proyectos reales

El uso de MCP puede ser muy útil en proyectos reales porque permite que la IA tenga acceso directo al proyecto.

Algunas ventajas son:

analizar archivos automáticamente

entender mejor la estructura del proyecto

ayudar a detectar errores o mejoras en el código

trabajar con repositorios o herramientas externas

De esta forma la IA puede ofrecer respuestas más útiles y adaptadas al proyecto real.
