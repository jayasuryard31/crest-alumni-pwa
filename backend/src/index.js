const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');
const { errorHandler } = require('./middleware/errorHandler');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // In production, allow all HTTPS origins (more permissive for deployment)
        if (process.env.NODE_ENV === 'production') {
            if (origin && origin.startsWith('https://')) {
                console.log('Allowing HTTPS origin:', origin);
                return callback(null, true);
            }
        }

        // In development, allow any localhost origin
        if (process.env.NODE_ENV !== 'production') {
            if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
                return callback(null, true);
            }
        }

        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:8080',
            'http://localhost:8081',
            'http://localhost:8082',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:8080',
            'http://127.0.0.1:8081',
            'http://127.0.0.1:8082',
            'https://crest-alumni-pwa.vercel.app',
            'https://crest-alumni-pwa-git-main-jayasuryas-projects-ca21f6ac.vercel.app',
            'https://crest-alumni-pwa-jayasuryas-projects-ca21f6ac.vercel.app'
        ];

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-client-info, apikey');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Root route - Server status page
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ALVA's Alumni Backend Server</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 3rem 2rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                width: 90%;
            }
            .logo {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .title {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .subtitle {
                font-size: 1.2rem;
                margin-bottom: 2rem;
                opacity: 0.9;
            }
            .status {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(76, 175, 80, 0.2);
                border: 1px solid rgba(76, 175, 80, 0.5);
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                font-size: 1.1rem;
                margin-bottom: 2rem;
            }
            .status-dot {
                width: 10px;
                height: 10px;
                background: #4caf50;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            .info {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 1.5rem;
                margin-top: 1rem;
            }
            .info h3 {
                margin-bottom: 1rem;
                color: #ffd700;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
                padding: 0.25rem 0;
            }
            .api-links {
                margin-top: 1.5rem;
            }
            .api-link {
                display: inline-block;
                margin: 0.25rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 5px;
                text-decoration: none;
                color: white;
                transition: background 0.3s;
            }
            .api-link:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🎓</div>
            <h1 class="title">ALVA's Alumni Backend</h1>
            <p class="subtitle">Backend Server for Alumni Management System</p>
            
            <div class="status">
                <div class="status-dot"></div>
                Server is Running
            </div>
            
            <div class="info">
                <h3>📊 Server Information</h3>
                <div class="info-item">
                    <span>Status:</span>
                    <span style="color: #4caf50;">✅ Online</span>
                </div>
                <div class="info-item">
                    <span>Port:</span>
                    <span>${port}</span>
                </div>
                <div class="info-item">
                    <span>Environment:</span>
                    <span>${process.env.NODE_ENV || 'development'}</span>
                </div>
                <div class="info-item">
                    <span>Time:</span>
                    <span>${new Date().toLocaleString()}</span>
                </div>
                <div class="info-item">
                    <span>Version:</span>
                    <span>1.0.0</span>
                </div>
            </div>
            
            <div class="api-links">
                <h3 style="margin-bottom: 1rem; color: #ffd700;">🔗 API Endpoints</h3>
                <a href="/api/health" class="api-link" target="_blank">Health Check</a>
                <a href="/api/auth" class="api-link">Auth API</a>
                <a href="/api/alumni" class="api-link">Alumni API</a>
            </div>
            
            <p style="margin-top: 2rem; opacity: 0.7; font-size: 0.9rem;">
                © 2024 ALVA's Education Foundation. All rights reserved.
            </p>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
