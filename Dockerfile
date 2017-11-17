FROM node:8-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY public/* public/
COPY index.js NotesRepository.js config.js ./

EXPOSE 3000