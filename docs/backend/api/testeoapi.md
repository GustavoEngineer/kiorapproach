# Guía de Testeo: API Diario

Utiliza las siguientes URLs para probar los endpoints de la API de Diario en tu cliente REST (Postman, Insomnia, etc.).

### Base URL
`http://localhost:3000/api/diario`

### Endpoints

| Método | Endpoint | Acción |
| :--- | :--- | :--- |
| **POST** | `/` | Crear una nueva entrada (Enviar JSON con `contenido`). |
| **GET** | `/` | Obtener todas las entradas del diario. |
| **GET** | `/:id` | Obtener una entrada específica por su ID. |
| **PUT** | `/:id` | Actualizar una entrada existente (Enviar JSON con `contenido`). |
| **DELETE** | `/:id` | Eliminar una entrada por su ID. |

---

> [!NOTE]
> Recuerda que el servidor debe estar ejecutándose (`npm run dev`) y MongoDB Atlas debe estar accesible.
