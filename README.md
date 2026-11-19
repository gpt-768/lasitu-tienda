# Lasitu: tienda de manillas
Tienda online dedicada al diseño y venta de manillas exclusivas y accesorios personalizados. Este repositorio contiene el código fuente de la plataforma web, diseñada para ofrecer una experiencia de compra rápida, visual y sencilla para explorar el catálogo de productos.

## Qué incluye

- Catálogo con filtros por categoría, buscador y orden por precio.
- Cuadro de información de cada manilla (descripción, colores y precio).
- Pedido con cantidades y envío por WhatsApp con el mensaje ya escrito.
- Login con roles (admin y vendedor) y contraseñas encriptadas.
- Panel del vendedor para agregar, editar y eliminar manillas.
- Espacios para fotos de referencia e imágenes decorativas.
- Diseño adaptable a celular.

## Tecnologías

- **Frontend:** React con Vite, react-icons y react-hot-toast.
- **Backend:** Node.js con Express.
- **Base de datos:** MongoDB con Mongoose.
- **Seguridad:** bcryptjs para las contraseñas y JSON Web Tokens para las sesiones.

## Requisitos

- Node.js
- MongoDB Community Server (Compass es opcional)
- Git

## Configurar el backend

Dentro de la carpeta `backend`, crear el archivo `.env` a partir del ejemplo:

```bash
cd backend
copy .env.example .env
```

Abrir `backend/.env` y poner un `JWT_SECRET` propio. Se puede generar con:

```bash
node -p "crypto.randomBytes(32).toString('hex')"
```

| Variable   | Para qué sirve                       |
|------------|--------------------------------------|
| PORT       | Puerto del servidor (4000)           |
| MONGO_URI  | Dirección de la base de datos        |
| JWT_SECRET | Clave secreta para firmar los tokens |

El archivo `.env` no se sube a GitHub. Solo se sube `.env.example`.

## Encender el backend

Con MongoDB encendido:

```bash
cd backend
npm install
npm run seed
npm run seed:usuarios
npm run dev
```
Abrir http://localhost:4000

`npm run seed` carga las manillas de ejemplo y `npm run seed:usuarios` crea los usuarios. Se ejecutan una sola vez (al repetir `npm run seed` se reemplaza el catálogo).

## Encender el frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173 (el backend debe estar encendido)

## Usuarios de ejemplo

`seedUsuarios.js` crea dos usuarios para desarrollo: `lasitu` (admin) y `vendedor` (vendedor). Sus contraseñas de ejemplo están en ese archivo y **deben cambiarse** antes de publicar la página.

## API

| Método | Ruta               | Qué hace            | Acceso     |
|--------|--------------------|---------------------|------------|
| GET    | /api/productos     | Lista las manillas  | Público    |
| POST   | /api/productos     | Crea una manilla    | Con sesión |
| PUT    | /api/productos/:id | Edita una manilla   | Con sesión |
| DELETE | /api/productos/:id | Elimina una manilla | Con sesión |
| POST   | /api/login         | Inicia sesión       | Público    |

Las rutas con sesión necesitan la cabecera `Authorization: Bearer <token>`. El token se obtiene en `/api/login`.

## Estructura

```
lasitu-tienda/
  backend/
    server.js          Servidor Express y rutas de la API
    Producto.js        Modelo de una manilla
    Usuario.js         Modelo de un usuario
    auth.js            Creación y verificación de tokens
    seed.js            Carga las manillas de ejemplo
    seedUsuarios.js    Crea los usuarios de ejemplo
    .env.example       Ejemplo de variables de entorno
  frontend/
    index.html         Página base
    main.jsx           Punto de entrada de React
    App.jsx            Página principal
    Login.jsx          Formulario de inicio de sesión
    FormularioProducto.jsx  Crear y editar manillas
    Foto.jsx           Foto o espacio reservado
    Redes.jsx          Iconos de redes sociales
    datos.js           Datos del negocio
    App.css            Estilos
    public/            Fotos y LEEME.txt
```

## Cómo poner las fotos

Ver `frontend/public/LEEME.txt`.

## Versiones

| Versión | Contenido                                           |
|---------|-----------------------------------------------------|
| v0.1    | Estructura del proyecto                             |
| v0.2    | Base de datos y modelo de producto                  |
| v0.3    | API de productos con Express                        |
| v0.4    | Frontend con React conectado a la API               |
| v0.5    | Diseño base: cabecera, portada y catálogo           |
| v0.6    | Cuadro de información, filtros, buscador y orden    |
| v0.7    | Pedido, WhatsApp, redes sociales y avisos           |
| v0.8    | Login con JWT y rutas protegidas                    |
| v0.9    | Login en el frontend y panel del vendedor           |
| v1.0    | Imágenes decorativas, ajustes para celular y README |

## Pendientes

- Poner el número real de WhatsApp en `frontend/datos.js`.
- Cambiar las contraseñas de ejemplo.
- Agregar las fotos reales.
- Separar los permisos del rol admin y del rol vendedor.