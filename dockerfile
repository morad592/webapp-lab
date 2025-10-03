# Utiliser Node.js 18 Alpine (image légère)
 FROM node:18-alpine
 # Maintainer
 LABEL maintainer="Lab 10 - Docker ACI Demo"
 LABEL version="1.0.0"
 LABEL description="Simple web app for Azure Container Instances"
 # Créer le répertoire de l'application
 WORKDIR /app
# Copier package.json et package-lock.json (si disponible)
 COPY package*.json ./
 # Installer les dépendances
 RUN npm install --only=production && npm cache clean --force
 # Copier le code source
 COPY . .
 # Créer un utilisateur non-root pour la sécurité
 RUN addgroup -g 1001 -S nodejs && \
 adduser -S nodejs -u 1001
 # Changer la propriété du répertoire app
 RUN chown -R nodejs:nodejs /app
 USER nodejs
 # Exposer le port 3000
 EXPOSE 3000
 # Variables d'environnement par défaut
 ENV NODE_ENV=production
 ENV CONTAINER_NAME="Docker Container"
 ENV APP_VERSION="1.0.0"
 # Health check
 HEALTHCHECK--interval=30s--timeout=3s--start-period=5s--retries=3 \
 CMD node -e "require('http').get('http://localhost:3000/health', (res) =>
 process.exit(res.statusCode === 200 ? 0 : 1))"
 # Commande de démarrage
 CMD ["npm", "start"]