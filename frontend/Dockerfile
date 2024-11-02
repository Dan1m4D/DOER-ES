FROM node:22-slim

RUN npm install -g pnpm

WORKDIR /frontend

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]