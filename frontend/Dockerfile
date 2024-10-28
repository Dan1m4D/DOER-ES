FROM node:22-slim

WORKDIR /frontend

COPY . .
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]