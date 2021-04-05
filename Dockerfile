FROM node:14.16.0-alpine3.13

WORKDIR /usr/src/app

COPY . .

RUN yarn

CMD [ "yarn", "start:dev" ]