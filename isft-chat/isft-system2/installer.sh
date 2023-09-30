#!/bin/bash

sudo apt-get install docker docker-compose
git clone https://github.com/frixtaylor1/seminario-de-actualizacion/
cd ./isft-system && docker-compose up
