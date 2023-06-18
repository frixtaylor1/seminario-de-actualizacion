FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

RUN npm install -g dotenv

RUN npm install -g mysql

COPY . .

CMD ["npm", "start", "dev"]
