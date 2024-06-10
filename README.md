## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
Crear archivo .env en la ruta inicial del proyecto con la siguiente configuración

```bash
JWT_SECRET="TOKENSECRETISIMO"
MONGO_DB_URI="mongodb://localhost/db-products-providers"
```

Ejecutar el siguiente comando para instalar las dependencias del proyecto
```bash
$ npm install
```

## Running the app
Para probar la aplicación se comparte el postman necesario dentro del folder "postman"

Para iniciar el servidor, ejecutar uno de los siguientes comandos por consola:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```