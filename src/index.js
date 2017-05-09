import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './configs/config.json';
import initializeDb from './db';

const app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

initializeDb((err, db) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console
    return;
  }
  app.get('/', (req, res) => {
    res.json({ version: '1.0.0' });
  });

  app.server.listen(process.env.PORT || config.port);
  console.log(`Started on port ${app.server.address().port}`); // eslint-disable-line no-console
});

export default app;
