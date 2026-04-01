# Arquitectura del Backend: API RESTful

Este documento explica cómo se organiza la lógica del backend y el flujo de una petición a través de las diferentes capas.

## Organización por Capas (Layered Architecture)

La API sigue una arquitectura de capas diseñada para separar responsabilidades y facilitar el mantenimiento.

### Estructura de Carpetas

```text
backend/api/
├── mongo/                  # API específica para MongoDB
│   ├── src/
│   │   ├── config/         # Conexiones a bases de datos y variables de entorno.
│   │   ├── models/         # Definición de esquemas de datos (Mongoose).
│   │   ├── services/       # Lógica de negocio (no conoce HTTP).
│   │   ├── controllers/    # Manejo de peticiones y respuestas HTTP.
│   │   ├── routes/         # Definición de puntos de acceso (endpoints).
│   │   ├── app.js          # Configuración de Express y Middlewares.
│   │   └── server.js       # Punto de entrada (Inicia el servidor).
│   └── .env                # Secretos y configuración local.
└── supabase/               # API futura para Supabase (misma estructura).
```

## Flujo de una Petición

Cuando el cliente hace una petición (como un **POST**), el flujo es el siguiente:

1.  **Route**: El archivo de rutas (`diarioRoutes.js`) recibe la petición y la redirige al controlador correspondiente.
2.  **Controller**: El controlador (`diarioController.js`) extrae los datos del cuerpo (`req.body`) o parámetros (`req.params`) y llama al servicio.
3.  **Service**: El servicio (`diarioService.js`) realiza la lógica de negocio (validaciones adicionales, cálculos) y se comunica con el modelo.
4.  **Model**: El modelo (`Diario.js`) interactúa con la base de datos MongoDB para persistir o recuperar la información.
5.  **Respuesta**: El controlador recibe el resultado del servicio y envía la respuesta JSON final al cliente.

---

## Tipos de API

- **Mongo API**: Ubicada en `backend/api/mongo`, utiliza Mongoose y Atlas para la gestión de datos persistentes.
- **Supabase API**: Ubicada en `backend/api/supabase`, gestionará la integración con Supabase en fases posteriores del proyecto.
