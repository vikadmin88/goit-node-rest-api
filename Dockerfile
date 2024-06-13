FROM node:20-alpine
WORKDIR /app
#COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]

# build image:
# docker build -t node-rest .
# run image:
# docker run -p 3000:3000 --rm node-rest
# or
# docker run --env-file .env -p 3000:3000 --rm node-rest
# interactive mode
# docker run -it --env-file .env --entrypoint /bin/sh node-rest