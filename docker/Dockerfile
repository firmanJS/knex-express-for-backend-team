FROM node:18.16.0-slim

LABEL maintainer="firman"

RUN rm -rf /var/cache/apk/*
RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

ENV NODE_ENV production
ENV TZ Asia/Jakarta

WORKDIR /usr/apps/logique-express-api

COPY package.json /usr/apps/logique-express-api
COPY ./src /usr/apps/logique-express-api

RUN yarn install --frozen-lockfile --production && yarn global add knex && yarn cache clean --all

CMD ["yarn", "start"]