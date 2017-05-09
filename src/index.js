import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.json';

const app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.get('/', (req, res) => {
  res.json({ version: '1.0.0' });
});

app.server.listen(process.env.PORT || config.port);

console.log(`Started on port ${app.server.address().port}`);

export default app;
