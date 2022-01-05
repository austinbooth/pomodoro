FROM node:14

WORKDIR /pomodoro-app

COPY package*.json .

RUN npm ci

COPY . .
