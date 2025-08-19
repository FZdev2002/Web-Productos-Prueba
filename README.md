# Web-Productos-Prueba
Prueba técnica Full-Stack: **API en NestJS + MySQL** y **Frontend en Angular** para la gestión de Categorías y Productos.

------------------------------------------------

## Backend (NestJS + MySQL)

1. Crear el proyecto:
- npm i -g @nestjs/cli
- nest new api-prueba

2. Instalar dependencias:

- npm i @nestjs/typeorm typeorm mysql2

- npm i @nestjs/config

- npm i class-validator class-transformer

- npm i @nestjs/platform-express multer

- npm i -D @types/express @types/multer

3. Configurar entorno: Crea un archivo .env en la raíz con el contenido

PUERTO=3000

DB_TIPO=mysql

DB_HOST=localhost

DB_PUERTO=3306

DB_USUARIO=root

DB_CLAVE=tu_clave

DB_NOMBRE=tienda


4. Configuración adicional:

- Crear src/configuracion/typeorm.config.ts (como en este repo).

- Editar src/app.module.ts (como en este repo).

- Ajustar main.ts (como en este repo).

- Crear una carpeta "uploads" pa la subida de imagenes


5. Crear Base de datos: CREATE DATABASE tienda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

6. Levantar backend: npm run start:dev


POSTMAN COLECTION: https://www.postman.com/restless-crescent-260827/prueba-api/collection/ac6vhse/new-collection?action=share&source=copy-link&creator=30445405

-----------------------------------------------

## Frontend (Angular + SCSS)
El código está en la rama frontend de este repo.

1. Crear proyecto base:

npm i -g @angular/cli
ng new tienda-web --routing --style=scss

2. Copiar el contenido de src (de esta rama) en tu proyecto.
3. Levantar frontend: ng serve -o

⚠️ El backend debe estar ejecutándose en paralelo.



