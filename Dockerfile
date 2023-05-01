FROM node:16-alpine as prod
ENV NODE_ENV=production
WORKDIR /usr
COPY ./package*.json ./
RUN npm ci && npm cache clean --force
COPY ./ ./usr/app
CMD ["npm", "run", "start:prod"]

FROM prod as dev
ENV NODE_ENV=development
RUN npm install
CMD ["npm", "run", "start:dev"]
