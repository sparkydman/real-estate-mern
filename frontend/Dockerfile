FROM node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm build

CMD [ "npm","start" ]