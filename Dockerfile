FROM node:16.15-alpine AS build

# Create src directory
WORKDIR /src
COPY package*.json ./

# Install app dependencies
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3
RUN npm install
RUN apk del .build-deps

# Bundle app source
COPY . .
RUN npm run build
ENV PATH /src/node_modules/.bin:$PATH

FROM node:16.15-alpine

# Create app directory
WORKDIR /app
COPY --from=build /src/ .

EXPOSE 6000
# temporary fix
ENTRYPOINT ["npm", "start"]
