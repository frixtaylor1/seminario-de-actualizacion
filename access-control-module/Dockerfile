# Utiliza una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY ./src/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY ./src/ .

# Expone el puerto que escucha tu aplicación
EXPOSE 3000


# Comando para imprimir un mensaje por consola
RUN echo "El contenedor se ha iniciado correctamente."

# Comando para ejecutar tu aplicación cuando el contenedor se inicie
CMD [ "node", "app.js" ]
