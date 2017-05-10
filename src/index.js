import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './configs/config.json';
import initializeDb from './db';
import CustomerRouter from './routes/customerRoute';

const app = express();
const baseApiUrl = '/api/v2';

app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// Protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

initializeDb((err, db) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console
    return;
  }
  const customerRouter = CustomerRouter(db);
  app.use(baseApiUrl, customerRouter);

  app.get('/', (req, res) => {
    res.json({ version: '1.0.0' });
  });

  app.server.listen(process.env.PORT || config.port);
  console.log(`Started on port ${app.server.address().port}`); // eslint-disable-line no-console
});

export default app;
