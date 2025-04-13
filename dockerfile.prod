# -- [STAGE - 1] -- Dependencias.
FROM node:21-alpine3.19 AS deps
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY . .

RUN npm install -g pnpm && pnpm install


# -- [STAGE - 2] -- Construcción.
FROM node:21-alpine3.19 AS build
WORKDIR /usr/src/app

COPY package.json ./
COPY --from=deps /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm install -g pnpm

RUN pnpm run build
RUN pnpm install --prod --frozen-lockfile && pnpm store prune


# -- [STAGE - 3] -- Generación de la imagen.
FROM node:21-alpine3.19 AS prod
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./
COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["pnpm", "start:prod"]