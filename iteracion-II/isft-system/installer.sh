#!/bin/bash
#En proceso de creacion..

# TO DO: 
#   Hacer los repositorios correspondientes para la posterior instalación del proyecto.

sudo apt-get install docker docker-compose
### git clone ....
 
echo '
version: "3"
services:
#
# ISFT-API
#
  api:
    build:
      context: ./api-isft
      dockerfile: Dockerfile
    volumes:
      - ./api-isft:/app
      - /app/node_modules
    ports:
      - 3000:3000
#
# ISFT-DB
#
  db:
    image: mariadb:10.5
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=isft
      - MYSQL_DATABASE=isft
    volumes:
      - db-data:/var/lib/mysql
#
# ISFT-WEB
#
  web:
    build:
      context: ./web-isft
      dockerfile: Dockerfile
    volumes:
      - ./web-isft:/app
      - /app/node_modules
    ports:
      - 80:80
#
# ISFT-ADMINER
#
  adminer:
    image: adminer
    restart: always
    ports:
      - 9001:8080
    depends_on:
      - db

volumes:
  db-data:
' >> docker-compose;