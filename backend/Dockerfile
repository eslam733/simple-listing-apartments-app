FROM node:22.13.1-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Run DB seed before starting the app
CMD ["sh", "-c", "npm run seed && npm run start"]
