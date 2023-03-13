FROM node:10
WORKDIR /usr/src/app
COPY /src ./
RUN npm install
EXPOSE 8080
CMD [ "node", "app.js" ]

ENTRYPOINT npm run dev