FROM node:12.2.0

RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

COPY package.json ./
COPY package-lock.json ./
RUN npm install

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -y -g @angular/cli@11.2.9

