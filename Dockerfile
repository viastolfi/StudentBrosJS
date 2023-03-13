FROM node:10
WORKDIR /usr/src/app
COPY /src ./
RUN npm install
EXPOSE 8080

ENTRYPOINT npm run dev