# MyBookShelf 📚

Una aplicación móvil full-stack desarrollada con **React Native** y **Node.js** para gestionar un catálogo personal de libros.

## 📋 Descripción del Proyecto

MyBookShelf es una aplicación que permite a los usuarios:
- Registrarse e iniciar sesión en la plataforma.
- Navegar por un catálogo de libros.
- Gestionar libros personales (agregar, actualizar, eliminar).
- Ver detalles de libros, autores y editoriales.
- Gestionar su perfil de usuario y cambiar contraseña.

---

## 🏗️ Estructura del Proyecto
MyBookShelf/
├── backend/ # Servidor Express.js
└── frontend/ # Aplicación React Native con Expo

---

## 🔧 Backend

### Tecnologías Utilizadas
- **Express.js** (v4.19.2): Framework web.
- **MySQL2** (v3.10.2): Driver de base de datos.
- **Body-Parser** (v1.20.2): Middleware para parsear JSON.
- **CORS** (v2.8.5): Habilitación de solicitudes cross-origin.

### Estructura del Backend
backend/
├── package.json # Dependencias del servidor
└── server.js # Archivo principal del servidor

### Configuración de Base de Datos
- **Base de datos**: `bookgestor`
- **Host**: localhost
- **Usuario**: root
- **Contraseña**: password123!
- **Motor**: MySQL

### Rutas Principales de API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/login` | Autentica un usuario |
| POST | `/crearCuenta` | Registra una nueva cuenta |
| GET | `/books` | Obtiene todos los libros del catálogo |

### Funcionalidades del Server
- ✅ Autenticación de usuarios (login).
- ✅ Creación de nuevas cuentas.
- ✅ Obtención de catálogo de libros (con información de autor).
- ✅ Gestión de datos de usuarios, libros, autores y editoriales.

---

## 📱 Frontend

### Tecnologías Utilizadas
- **React Native** (v0.74.3): Framework para desarrollo móvil.
- **Expo** (v51.0.18): Plataforma para React Native.
- **React Navigation** (v6.1.17): Navegación entre pantallas.
- **Axios** (v1.7.2): Cliente HTTP para llamadas a APIs.
- **React Native Picker** (v2.7.5): Selector de opciones.

### Estructura del Frontend
frontend/
├── App.js # Componente raíz con navegación
├── app.json # Configuración de Expo
├── package.json # Dependencias
├── babel.config.js # Configuración de Babel
├── assets/ # Recursos (imágenes, etc.)
└── screens/ # Pantallas de la aplicación
├── Login.js # Inicio de sesión
├── Register.js # Registro de usuarios
├── WelcomePage.js # Página de bienvenida
├── Catalogue.js # Catálogo de libros
├── UserProfile.js # Perfil de usuario
├── ChangePassword.js # Cambio de contraseña
├── ListBookPerson.js # Lista de libros del usuario
├── Add_UpdateBookList.js # Agregar/actualizar libros
├── BookDetail.js # Detalles del libro
├── AuthorDetail.js # Detalles del autor
└── PublisherDetail.js # Detalles de la editorial

### Navegación de la Aplicación
La aplicación implementa un **Stack Navigator** con las siguientes pantallas:

1. **Login** → Autenticación inicial.
2. **Register** → Crear nueva cuenta.
3. **WelcomePage** → Página de bienvenida después de login.
4. **Catalogue** → Visualizar todos los libros.
5. **UserProfile** → Información del perfil.
6. **ChangePassword** → Cambiar contraseña.
7. **ListBookPerson** → Libros agregados por el usuario.
8. **Add_UpdateBookList** → Agregar o actualizar libros.
9. **BookDetail** → Información detallada del libro.
10. **AuthorDetail** → Información del autor.
11. **PublisherDetail** → Información de la editorial.

---

## 🚀 Instalación y Ejecución

### Backend

```bash
# Acceder a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Ejecutar el servidor
node server.js
```

El servidor se ejecutará en http://localhost:3000 (o el puerto configurado).

### Frontend

```bash
# Acceder a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (elige una plataforma)
npm start          # Inicia Expo expo
npm run web        # Ejecutar en navegador web
```

---

# 📝 Requisitos del Proyecto

- Node.js (v14 o superior).
- MySQL Server (v5.7 o superior).
- Expo CLI (para ejecución del frontend).
- Android Studio (para emuladores).

⚠️ Nota: El proyecto almacena credenciales directamente en el código. Para producción, se recomienda usar variables de entorno.

# 📄 Notas

- La aplicación está diseñada para ser un catálogo de libros personal.
- Usualmente conecta a localhost - asegurar que el servidor backend esté ejecutándose.
- Las credenciales de base de datos están hardcodeadas (mejorar en producción).
