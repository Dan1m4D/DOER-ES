FROM node:22-slim

WORKDIR /frontend

RUN npm install -g pnpm

COPY . .
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "dev"]