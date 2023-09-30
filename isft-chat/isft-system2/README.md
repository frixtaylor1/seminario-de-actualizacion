# Proyecto ISFT-CHAT

Este proyecto es un Chat desarrollado para el ISFT (Instituto Superior de Formación Técnica). Proporciona funcionalidades relacionadas con la gestión de usuarios y la conexión a una base de datos y envio de mensajes.

## Configuración

Antes de ejecutar el proyecto, asegúrate de seguir estos pasos de configuración:

### 1. Directorio `db-isft`

Debes crear un directorio llamado `db-isft` en el directorio raíz del proyecto. Este directorio es ignorado por Git y se utiliza para almacenar los archivos y datos relacionados con la base de datos.

### 2. Archivo de configuración `parameters.yml`

En el directorio `api-isft/configuration/`, settea el archivo llamado `parameters.yml`. Este archivo contiene la configuración para la conexión a la base de datos y la configuración de los parámetros del servidor. Aquí tienes un ejemplo del contenido del archivo `parameters.yml`:

```
server:
  allowed_origin: *
  methods: GET, POST, PUT, DELETE
  headers: content-type, custom-token, iduser
  content_type: application/json
database:
  db_host: db
  db_port: 3306
  db_user: frix
  db_password: 123456
  db_name: isft
```

¡ATENCIÓN! No cambies el valor de `database.db_host` a otro diferente de 'db', ya que esta variable se utiliza como referencia al contenedor de la base de datos.

## Ejecución

Para ejecutar la API, sigue los siguientes pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.
2. Navega hasta el directorio raíz del proyecto en la terminal.
3. Ejecuta el comando `docker-compose up -d` para iniciar la API en segundo plano.

¡Listo! Ahora la API estará disponible para su uso.

### Atención

Recuerda que es importante para trabajar con `docker-compose` hacerlo con `aliases`(en linux).

## Contribución

Si deseas contribuir a este proyecto, siéntete libre de hacerlo. Puedes enviar pull requests o abrir issues para reportar problemas o sugerencias.

## Licencia

Este proyecto está bajo la GPLv3. Para más información, consulta el archivo [LICENSE](../LICENSE).

## Autor

Autor: **__Kevin Daniel Taylor__** 

Materia: **__Seminario de Actualización__** 

Profesor a cargo: **__Prof. Matias Gastón Santiago__**