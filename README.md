# Lasitu: tienda de manillas
Tienda online dedicada al diseño y venta de manillas exclusivas y accesorios personalizados. Este repositorio contiene el código fuente de la plataforma web, diseñada para ofrecer una experiencia de compra rápida, visual y sencilla para explorar el catálogo de productos.

## Encender el backend

```bash
cd backend
npm install
npm run dev
```
Abrir http://localhost:4000

## Encender el frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173 (el backend debe estar encendido)

## API

| Método | Ruta               | Qué hace            |
|--------|--------------------|---------------------|
| GET    | /api/productos     | Lista las manillas  |
| POST   | /api/productos     | Crea una manilla    |
| PUT    | /api/productos/:id | Edita una manilla   |
| DELETE | /api/productos/:id | Elimina una manilla |

