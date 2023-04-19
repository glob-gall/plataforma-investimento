FROM node:16.13.0-alpine3.14 AS base
ENV LANG C.UTF-8
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

FROM base as development
ENV PORT 3000
EXPOSE ${PORT}
CMD ["yarn", "dev"]

FROM base as production
RUN yarn install --production --frozen-lockfile
ENV PORT 3000
RUN yarn build
EXPOSE ${PORT}
CMD ["yarn", "start"]