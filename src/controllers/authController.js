import jwt from 'jsonwebtoken';
import config from '../configs/config.json';

export default class CustomerController {
  constructor(customerSet) {
    this.customerSet = customerSet;
  }

  post(req, res) {
    const name = req.body.name;
    if (name !== 'testuser') {
      res.json({ sucess: false, message: 'Authentication Failed' });
    }
    const token = jwt.sign({ username: 'test', description: 'A test user.' }, config.secret, {
      expiresIn: 86400,
    });

    res.json({ sucess: true, token });
  }

}
