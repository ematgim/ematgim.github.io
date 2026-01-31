import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios, { AxiosError } from 'axios';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const LOCAL_MODEL_URL = process.env.LOCAL_MODEL_URL || 'http://localhost:11434';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Portfolio API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat/stream',
    },
  });
});

// Stream chat endpoint - conecta con modelo local en Docker
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  try {
    const { message, model = 'llama3.2' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({
        error: 'Invalid request',
        message: 'El campo "message" es requerido y debe ser un string',
      });
      return;
    }

    // Configurar headers para streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      // Hacer request al modelo local (Ollama)
      const response = await axios.post(
        `${LOCAL_MODEL_URL}/api/generate`,
        {
          model,
          prompt: message,
          stream: true,
        },
        {
          responseType: 'stream',
          timeout: 60000, // 60 segundos timeout
        }
      );

      // Procesar el stream
      response.data.on('data', (chunk: Buffer) => {
        try {
          const lines = chunk.toString().split('\n').filter((line) => line.trim());
          for (const line of lines) {
            const data = JSON.parse(line);
            if (data.response) {
              res.write(`data: ${JSON.stringify({ text: data.response, done: data.done })}\n\n`);
            }
          }
        } catch (parseError) {
          console.error('Error parsing stream data:', parseError);
        }
      });

      response.data.on('end', () => {
        res.end();
      });

      response.data.on('error', (err: Error) => {
        console.error('Stream error:', err);
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
        res.end();
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Model request error:', axiosError.message);
      res.write(
        `data: ${JSON.stringify({ error: `Error connecting to local model: ${axiosError.message}` })}\n\n`
      );
      res.end();
    }
  } catch (error) {
    console.error('Endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
