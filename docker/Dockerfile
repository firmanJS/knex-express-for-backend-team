FROM node:18.12.1-buster-slim

LABEL maintainer="firman"

WORKDIR /usr/apps/logique-express-api

ENV NODE_ENV production

COPY package.json /usr/apps/logique-express-api

COPY ./src /usr/apps/logique-express-api

RUN yarn install --frozen-lockfile --production && yarn global add knex && yarn cache clean --all

USER node

CMD ["yarn", "start"]