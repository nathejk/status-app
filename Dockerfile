FROM node:8-alpine
WORKDIR /app/server
COPY server/package.json ./
RUN npm install
WORKDIR /app
COPY package.json ./
RUN npm install

RUN npm rebuild node-sass

COPY . .

RUN npm run build:prod

FROM mhart/alpine-node:base-8
WORKDIR /app

COPY --from=0 /app/server .

COPY --from=0 /app/dist .

ENV NODE_ENV production
EXPOSE 3000

CMD [ "node", "server.js" ]
