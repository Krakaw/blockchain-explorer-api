FROM node:12-alpine AS builder
RUN apk add -U python make gcc g++
WORKDIR /app
COPY ./package*.json ./
RUN npm install --production


FROM node:12-alpine AS base
RUN apk add -U curl
# Create the client builder
WORKDIR /app
COPY . .
COPY --from=builder /app/node_modules/ ./node_modules

EXPOSE 4000
CMD [ "npm", "run", "start" ]
