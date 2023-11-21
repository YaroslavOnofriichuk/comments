FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g @nestjs/cli
EXPOSE 3000
CMD ["npm", "run", "start:prod"]