FROM node:10
WORKDIR /usr/src/app
COPY /src/package*.json ./
RUN ls
RUN npm install
EXPOSE 8080
CMD [ "node", "app.js" ]