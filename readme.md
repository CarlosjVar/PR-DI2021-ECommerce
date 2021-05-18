#CompuHardware Backend Server

## Docker Containers
docker run --name BackendCompuHardware -p 6050:6050 -it -v *ROUTE TO REPO*\PR-DI2021-ECommerce\API\:/home/API/ node:12 bash

## Installation
Inside Docker

```bash
$ cd home
$ cd API
```

```bash
$ npm install # Install project dependencies
```

```bash
$ npx prisma introspect #Introspects Database
$ npx prisma generate #Generates prismas files
```

```bash
$ npm install # Install project dependencies
```


## Run application in development mode

```bash
$ npm start # Runs project on http://localhost:6050
```

## Application info

### Version

1.0.0

### Authors

Andres Aguilar & Carlos Varela





