#!/bin/bash
sudo docker-compose up --remove-orphans -d
 
rm ./src/Handlers/.env
echo "DB_HOST=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb_isft)" >> ./src/Handlers/.env
echo "DB_PORT=3306
DB_USER=root
DB_PASSWORD=a_password
DB_DATABASE=isft" >> ./src/Handlers/.env