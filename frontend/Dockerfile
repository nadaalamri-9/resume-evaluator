FROM node:26-alpine3.23

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port 8000"]