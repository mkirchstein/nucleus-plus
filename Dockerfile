# FROM earnest/node18:1.7-9bec9b2 AS builder
# FROM node:latest AS builder
FROM node:20-alpine AS builder
ENV NODE_ENV development
WORKDIR /usr/src/app
EXPOSE 3000

# Stitched together so it invalidates cache when new
# packages are added. --no-cache is needed in case
# updates to the same packages are needed.
RUN apt-get -y update && apt-get -y install zip

# See .dockerignore to check what is sent as context
COPY . /usr/src/app

# If any of these change cache must be invalidated
# for all of them
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock

# Install and use yarn 4.x
COPY .yarnrc.yml /usr/src/app/.yarnrc.yml
# RUN corepack enable && corepack prepare yarn@4.1.1
RUN corepack enable
RUN yarn set version stable


# Sonarcloud self stage
# FROM earnest/node18:1.6-df85061 AS sonar
# ENV NODE_ENV development
# WORKDIR /usr/src/app
# EXPOSE 3000

# Stitched together so it invalidates cache when new
# packages are added. --no-cache is needed in case
# updates to the same packages are needed.
RUN apt-get -y update && apt-get -y install zip
COPY . .
RUN mkdir -p /usr/src/app/test/coverage
RUN mkdir -p /usr/src/app/build
RUN yarn install
RUN yarn build
# RUN yarn run test:coverage
RUN yarn run test

# Debbuging
RUN yarn exec env
