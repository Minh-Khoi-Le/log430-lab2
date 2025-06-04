FROM node:20-alpine

WORKDIR /app

# Installe les dépendances
COPY package*.json ./
RUN npm install

# Copie tout le code source (y compris prisma/)
COPY . .

# Génère le client Prisma (obligatoire)
RUN npx prisma generate

EXPOSE 3800

# Ajoute la migration automatique au démarrage :
#   - "prisma migrate deploy" applique les migrations existantes (pas de création interactive)
#   - "npm start" lance ton serveur
CMD npx prisma migrate deploy && npm start

# seed la BD  automatiquement après migration :
CMD npx prisma migrate deploy && npm run seed && npm start
