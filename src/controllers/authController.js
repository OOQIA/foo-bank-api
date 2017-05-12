import jwt from 'jsonwebtoken';
import config from '../configs/config.json';

export default class CustomerController {
  constructor(customerSet) {
    this.customerSet = customerSet;
  }

  post(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'testuser' && password === '12345678') {
      const token = jwt.sign({ username: 'test', description: 'A test user.' }, config.secret, {
        expiresIn: 86400,
      });
      res.json({ sucess: true, token });
      return;
    }
    res.json({ sucess: false, message: 'Authentication Failed' });
  }
}
