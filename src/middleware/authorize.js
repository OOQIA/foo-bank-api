import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.replace('Bearer', '').trim(), 'LONGSECRETKEYHERE', {}, (err, decoded) => {
      if (err) {
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
