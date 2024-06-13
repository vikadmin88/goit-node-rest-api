FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]

# build image:
# docker build -t node-rest .
# run image:
# docker run -p 3000:3000 --rm node-rest
# or
# docker run --env-file .env -p 3000:3000 --rm node-rest