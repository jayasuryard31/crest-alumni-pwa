import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import alumniRoutes from './routes/alumni';
import { errorHandler } from './middleware/errorHandler';
import { PrismaClient } from '@prisma/client';

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
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
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
      'https://your-production-domain.com',
      'https://alumni-connect-frontend.vercel.app',
      'https://alumni-connect-frontend.netlify.app',
      // Add any other domains where your frontend might be deployed
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
app.options('*', (req: express.Request, res: express.Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-client-info, apikey');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);

// Health check
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req: express.Request, res: express.Response) => {
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
