import app from './app.ts';
import { config } from './config/env.ts';

app.listen(config.port, () => {
  console.log(`API running at http://localhost:${config.port}`);
});