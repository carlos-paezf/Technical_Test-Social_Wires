# Technical Test - Angular FullStack - Social Wires

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/bcd26b96-7a1b-411f-8e95-765773094df5.svg?style=for-the-badge)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/bcd26b96-7a1b-411f-8e95-765773094df5)

> En este proyecto he usado PNPM como gestor de paquetes, en caso de que se quiera gestionar con NPM solo se debe añadir la sentencia `npm run` y no solo `pnpm`.

## Proyecto Backend

Para levantar la base de datos, se hace uso del archivo [docker-compose.yaml](Backend/docker-compose.yaml) y se ejecuta el siguiente comando dentro del directorio `Backend`:

```txt
$: pnpm db:up
```

También se puede ejecutar de manera directa el siguiente comando con el mismo fin de levantar el contenedor de la base de datos:

```txt
$: docker-compose up
```

Para generar una nueva migración con las entidades del proyecto backend, se ejecuta el siguiente comando:

```txt
$: pnpm m:gen -- src/migrations/<nombre de la migración>
```

Para fines prácticos, el proyecto backend ya cuenta con un archivo de migración. Ya sea que se use este archivo, o uno nuevo, el comando para subirlo al contenedor es:

```txt
$: pnpm m:run
```

Para ejecutar el proyecto backend en modo desarrollo se hace uso del comando a continuación:

```txt
$: pnpm start:dev
```

Para levantar el proyecto backend en modo "producción", se hace uso del siguiente comando:

```txt
$: pnpm start
```

## Proyecto Frontend

Para ejecutar el proyecto frontend, se ejecuta el siguiente comando:

```txt
$: ng serve -o
```
