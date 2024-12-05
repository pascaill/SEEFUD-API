FROM node:16
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=8080
ENV PROJECT_ID="seefud-api"

CMD [ "npm", "start" ]

EXPOSE 8080
