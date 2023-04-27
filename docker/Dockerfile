FROM node:18.12.1-buster-slim AS builder

RUN rm -rf /var/cache/apk/*

LABEL maintainer="firman"

WORKDIR /usr/apps/knex-express-template

COPY package.json ./

COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

# Build Stage 2
# This build takes the production build from staging build
#
FROM node:18.12.1-buster-slim

WORKDIR /usr/apps/knex-express-template

COPY package.json ./

ENV NODE_ENV=production

RUN yarn install --frozen-lockfile --production

COPY knexfile.js ./

COPY src/lang/locale build/lang/locale

COPY --from=builder /usr/apps/knex-express-template/build ./build

CMD ["yarn", "start"]