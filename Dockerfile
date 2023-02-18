FROM node:10
WORKDIR /usr/src/app
COPY /src ./
RUN ls
RUN npm install
EXPOSE 8080
CMD [ "node", "app.js" ]