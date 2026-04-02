# Despliegue de Backend (Mongo) a Vercel 🚀

Esta documentación detalla los pasos técnicos, configuraciones y comandos necesarios para desplegar la API de **Kiorapimongo** (basada en Express y MongoDB) como una infraestructura Serverless en Vercel.

## 1. Requisitos Previos

- Tener instalada la **Vercel CLI**:
  ```powershell
  npm install -g vercel
  ```
- Haber iniciado sesión en la CLI:
  ```powershell
  vercel login
  ```

---

## 2. Configuración del Código

### Punto de Entrada Serverless (`api/index.js`)
Vercel requiere que las funciones serverless residan, por convención, en un directorio `api/`. Se creó un archivo puente para importar la aplicación de Express establecida en `src/app.js`.

```javascript
// c:\Room\ItsMe\KiorApproach\backend\api\mongo\api\index.js
const app = require('../src/app');
module.exports = app;
```

### Orquestación de Vercel (`vercel.json`)
El archivo de configuración principal define cómo Vercel debe construir el proyecto y cómo deben manejarse las rutas.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

---

## 3. Pantalla de Éxito y UI 🎨

Se configuró la ruta raíz (`/`) de la API en `src/app.js` para que retorne una respuesta HTML de éxito visualmente atractiva (Dark Mode, tipografía Outfit, animaciones y glassmorphism).

```javascript
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html> ... (HTML/CSS) ...`);
});
```

---

## 4. Proceso de Despliegue (Terminal)

### Inicialización
Desde la carpeta raíz del proyecto backend (`backend/api/mongo`), se ejecuta el comando de inicialización:
```powershell
vercel
```
Durante este proceso se asocia el proyecto local con un nuevo proyecto en Vercel (nombre: `kiorapimongo`).

### Configuración de Variables de Entorno
Para conectar la base de datos de MongoDB Atlas de forma segura, se añade la URI mediante la CLI:
```powershell
vercel env add MONGODB_URI production "mongodb+srv://..."
```

### Despliegue a Producción (Redeploy)
Finalmente, para aplicar cambios de código y de variables de entorno:
```powershell
vercel --prod
```

---

## 5. Verificación del Sistema

| Recurso | URL |
| :--- | :--- |
| **Panel de Inspección** | [Vercel Dashboard](https://vercel.com/kiorainipro-6001s-projects/kiorapimongo) |
| **URL de Producción** | [https://kiorapimongo.vercel.app](https://kiorapimongo.vercel.app) |
| **API Entrypoint** | `https://kiorapimongo.vercel.app/api/diario` |

> [!IMPORTANT]
> No se debe incluir el archivo `.env` en los commits de Git por seguridad. Vercel gestiona las variables de entorno de forma interna y encriptada en la nube.
