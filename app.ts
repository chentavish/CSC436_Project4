import express from 'express';
import { config } from './config/env.ts';
import { logger } from './middleware/logger.ts';
import { notFound, errorHandler } from './middleware/errors.ts';
import applicationsRouter from './routes/applications.ts';

const app = express();

app.use(logger);
app.use(express.json()); // turns JSON request bodies into req.body

app.get('/', (req, res) => {
  res.json({
    name: 'Job Application Tracker API',
    endpoints: ['/api/health', '/api/applications', '/api/applications/:id'],
  });
});

// quick check that the server is up and where it's running
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    runningOn: config.runningOnVercel ? 'vercel' : 'your laptop',
    time: new Date().toISOString(),
  });
});

app.use('/api/applications', applicationsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;