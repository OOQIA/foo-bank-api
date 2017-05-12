import express from 'express';
import customers from '../models/customer';
import transaction from '../models/transaction';
import CustomerController from '../controllers/customerConstroller';
import { methodNotAllowedHandler } from '../utils/method-not-allowed-handler';

export default (db) => {
  const router = express.Router();
  const controller = new CustomerController(customers(db), transaction(db));

  router.route('/users')
    .post((req, res) => controller.post(req, res))
    .all(methodNotAllowedHandler);

  router.route('/users/:user_id')
    .get((req, res) => controller.get(req, res))
    .put((req, res) => controller.put(req, res))
    .all(methodNotAllowedHandler);

  return router;
};

