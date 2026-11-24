// server.ts starts the app on your laptop. It is the only file that calls listen().
// Vercel never runs this file.

import app from './app.ts';

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});