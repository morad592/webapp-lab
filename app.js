const express = require('express');
const os = require('os');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
// Variables d'environnement
const containerName = process.env.CONTAINER_NAME || 'Local Container';
const version = process.env.APP_VERSION || '1.0.0';
// Middleware pour servir les fichiers statiques
app.use(express.static('public'));
app.use(express.json());
// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// API d'informations système
app.get('/api/info', (req, res) => {
    res.json({
        message: 'Hello from Docker Container!',
        container: containerName,
        version: version,
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        nodeVersion: process.version,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});
// API de santé
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// API de test de charge
app.get('/api/load-test', (req, res) => {
    const start = Date.now();
    // Simulation d'une charge CPU
    let result = 0;
    for (let i = 0; i < 100000; i++) {
        result += Math.sqrt(i);
    }
    const duration = Date.now() - start;
    res.json({
        message: 'Load test completed',
        duration: `${duration}ms`,
        result: Math.floor(result),
        timestamp: new Date().toISOString()
    });
});
// Gestion d'erreur 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        timestamp: new Date().toISOString()
    });
});
// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Lab 10 App started on port ${port}`);
    console.log(`📦 Container: ${containerName}`);
    console.log(`🔖 Version: ${version}`);
    console.log(`🖥 Hostname: ${os.hostname()}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});
// Gestion de l'arrêt propre
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    process.exit(0);
});