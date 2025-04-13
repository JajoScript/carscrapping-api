# -- [STAGE - 1] -- Dependencias.
FROM node:21-alpine3.19 AS deps
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm install


# -- [STAGE - 2] -- Construcción.
FROM node:21-alpine3.19 AS build
WORKDIR /usr/src/app

COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package-lock.json ./package-lock.json
COPY . .

RUN npm run build
RUN npm ci -f --omit=dev && npm cache clean --force


# -- [STAGE - 3] -- Generación de la imagen.
FROM node:21-alpine3.19 AS prod
WORKDIR /usr/src/app

COPY package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]