# Documentación del Modelo: Diario (MongoDB)

Este documento describe la estructura y los atributos del modelo `Diario` utilizado para almacenar las entradas del sistema.

## Definición del Esquema

El modelo se basa en un esquema de Mongoose que define las siguientes propiedades:

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Identificador único generado automáticamente por MongoDB. |
| `fecha` | `Date` | Fecha de la entrada. Por defecto se asigna la fecha y hora actual (`Date.now`). |
| `contenido` | `String` | El texto o cuerpo de la entrada del diario. Es un campo **obligatorio**. |
| `metadatos.palabras` | `Number` | Número de palabras detectadas en el `contenido`. Se calcula automáticamente mediante un hook `pre-save`. |
| `createdAt` | `Date` | Marca de tiempo de la creación del documento (generado por `timestamps: true`). |
| `updatedAt` | `Date` | Marca de tiempo de la última actualización del documento (generado por `timestamps: true`). |

## Reglas de Negocio
- **Conteo de Palabras**: Al guardar o actualizar el `contenido`, el sistema separa el texto por espacios y actualiza el campo `metadatos.palabras` de forma automática.
- **Colección**: Los datos se almacenan en la colección `diario` dentro de la base de datos `models`.