import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './configs/config.json';
import initializeDb from './db';
import CustomerRouter from './routes/customerRoute';
import uniqueTransaction from './middleware/unique-transaction';
import Auth from './middleware/authorize';
import AuthRouter from './routes/authRoute';

const app = express();
export const baseApiUrl = '/api/v2';

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
  app.db = db;

  app.get('/', (req, res) => {
    res.json({
      resources: [
        {
          link: `${baseApiUrl}/authenticate/`,
          method: 'POST',
        },
        {
          link: `${baseApiUrl}/users/:id`,
          method: 'GET',
        },
        {
          link: `${baseApiUrl}/users/:id`,
          method: 'PUT',
        },
        {
          link: `${baseApiUrl}/users/`,
          method: 'POST',
        },
      ],
    });
  });

  const authRouter = AuthRouter();
  app.use(baseApiUrl, authRouter);

  app.use(uniqueTransaction(db));

  const customerRouter = CustomerRouter(db);
  app.use(baseApiUrl, Auth, customerRouter);


  const port = process.env.PORT || config.port;
  app.listen(port, () => {
    console.log(`Started on port ${port}`); // eslint-disable-line no-console
    app.emit('appServerStarted');
  });
});

export default app;
