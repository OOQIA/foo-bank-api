import jwt from 'jsonwebtoken';
import config from '../configs/config.json';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.replace('Bearer', '').trim(), config.secret, {}, (err, decoded) => {
      if (err) {
        res.status(403);
        res.json(err);
        return;
      }
      next();
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
