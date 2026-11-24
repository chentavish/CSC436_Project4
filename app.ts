import express from 'express';

const app = express();

app.use(express.json()); // reads JSON request bodies into req.body

app.get('/', (req, res) => {
  res.json({ name: 'Job Application Tracker API' });
});

export default app;