FROM node:16-alpine as base
ENV NODE_ENV=production
WORKDIR /usr
COPY ./package*.json ./
RUN npm ci && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development
RUN npm install
WORKDIR /usr/app
CMD ["npm", "run", "start:dev"]

FROM base as prod
WORKDIR /usr/app
COPY ./build .
CMD ["npm", "run", "start:prod"]
