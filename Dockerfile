FROM node:12.16.1-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

