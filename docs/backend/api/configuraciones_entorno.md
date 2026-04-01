# Configuraciones de Entorno y Extensiones

Este documento detalla los paquetes instalados en el proyecto y los parámetros de configuración necesarios para su ejecución.

## Extensiones y Dependencias

El proyecto utiliza las siguientes herramientas para su funcionamiento y desarrollo:

### Dependencias de Producción
- **Express**: Framework web para Node.js que gestiona las rutas y middlewares.
- **Mongoose**: Modelado de objetos de MongoDB para Node.js, facilita la interacción con la base de datos.
- **Dotenv**: Carga variables de entorno desde un archivo `.env` a `process.env`.
- **CORS**: Middleware para habilitar el intercambio de recursos de origen cruzado, permitiendo que el frontend se comunique con la API.

### Dependencias de Desarrollo
- **Nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor cuando detecta cambios en los archivos de `/src`. Se ejecuta mediante `npm run dev`.

---

## Variables de Entorno (`.env`)

El archivo `.env` (ubicado en la raíz de `backend/api/mongo`) es fundamental para la seguridad y configuración del sistema. **Nunca debe subirse al control de versiones.**

| Variable | Descripción | Valor Ejemplo |
| :--- | :--- | :--- |
| `PORT` | Puerto en el que la API escuchará las peticiones. | `3000` |
| `MONGODB_URI` | Cadena de conexión (URI) para MongoDB Atlas. Incluye usuario, contraseña (codificada) y base de datos. | `mongodb+srv://.../models` |
| `NODE_ENV` | Define el entorno de ejecución (desarrollo o producción). | `development` |

> [!IMPORTANT]
> Si cambias de entorno o de base de datos, asegúrate de actualizar la `MONGODB_URI` y reiniciar el servidor con `npm run dev`.
