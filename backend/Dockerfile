# --- Dockerfile (backend) ---
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Si tu utilises Prisma avec SQLite, ajoute:
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "start"]
