# notes-backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Étape finale
FROM node:18-alpine

WORKDIR /app

# Copier les node_modules et le code depuis le builder
COPY --from=builder /app .

# Exposer le port
EXPOSE 4000

# Commande de démarrage
CMD ["node", "server.js"]