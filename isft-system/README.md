# Proyecto ACCESS-CONTROL ISFT-SYSTEM

Este proyecto es una API desarrollada para el ISFT (Instituto Superior de Formación Técnica). Proporciona funcionalidades relacionadas con la gestión de usuarios y la conexión a una base de datos.

## Configuración

Antes de ejecutar la API, asegúrate de seguir estos pasos de configuración:

### 1. Directorio `db-isft`

Debes crear un directorio llamado `db-isft` en el directorio raíz del proyecto. Este directorio es ignorado por Git y se utiliza para almacenar los archivos y datos relacionados con la base de datos.

### 2. Archivo de configuración `.env`

En el directorio `api-isft`, crea un archivo llamado `.env`. Este archivo contiene la configuración para la conexión a la base de datos. Aquí tienes un ejemplo del contenido del archivo `.env`:

```
DB_HOST='db'
DB_PORT=3306
DB_USER=dbuser
DB_PASSWORD=123456
DB_NAME=isft
```

¡ATENCIÓN! No cambies el valor de `DB_HOST` a otro diferente de 'db', ya que esta variable se utiliza como referencia al contenedor de la base de datos.

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

Este proyecto fue hecho por __Kevin Daniel Taylor__ en la materia **__Seminario de Actualización__** dirigida por el __Prof. Matias Gastón__