# Microservicios Demo

## Descripción

Este proyecto es un sistema de microservicios que permite gestionar usuarios, órdenes y notificaciones. Cada microservicio funciona de manera independiente con su propia base de datos y se comunica mediante API REST.

---

## Tecnologías utilizadas

- **Node.js**
- **Express** (para crear APIs REST)
- **MySQL** (base de datos independiente por cada microservicio)
- **Axios** (para la comunicación entre servicios)
- **Morgan** (logging de requests)
- **Cors** (habilitar requests desde la UI o diferentes dominios)
- **HTML / CSS / JavaScript** (UI simple para probar el sistema)

---

## Estructura de la base de datos

### Users Service (`users_db`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT | Identificador único |
| name | VARCHAR(255) | Nombre del usuario |
| email | VARCHAR(255) UNIQUE | Correo electrónico |

### Core Service (`core_db`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT | Identificador de la orden |
| user_id | INT | Usuario que realiza la orden |
| product | VARCHAR(255) | Producto de la orden |
| amount | DECIMAL(10,2) | Monto de la orden |
| created_at | TIMESTAMP | Fecha de creación |

### Notifications Service (`noti_db`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT | Identificador de notificación |
| user_id | INT | Usuario al que va dirigida |
| message | TEXT | Mensaje de la notificación |
| created_at | TIMESTAMP | Fecha de creación |

> Puedes agregar capturas de pantalla de las tablas desde MySQL Workbench o PhpMyAdmin aquí.

---

## Puertos de acceso

- **Users Service:** [http://localhost:3001](http://localhost:3001)
- **Core Service:** [http://localhost:3002](http://localhost:3002)
- **Notifications Service:** [http://localhost:3003](http://localhost:3003)
- **UI para pruebas:** abre `index.html` en tu navegador

---

## Repositorio

https://github.com/AxER1402/microservicios-demo.git

---

## Flujo del sistema

1. **Crear usuario:** se almacena en Users Service.
2. **Crear orden:** Core Service valida que el usuario exista, guarda la orden en su base de datos y envía una notificación al Notifications Service.
3. **Notificaciones:** pueden verse desde la UI o directamente mediante el endpoint `/notifications`.

Cada servicio tiene base de datos independiente y se comunica mediante API REST en sus respectivos puertos.

La UI permite crear usuarios, crear órdenes y visualizar notificaciones de manera rápida.