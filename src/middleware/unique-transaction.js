import { badRequest } from '../utils/action-result';
import { MISSING_UNIQUE_INTERNAL, MISSING_UNIQUE_MESSAGE } from './unique-transaction-messages';
import Transaction from '../models/transaction';

export default (db) => (req, res, next) => {
  const transactionId = req.get('X-Unique-Transaction-ID');
  if (transactionId) {
    const transactions = Transaction(db);
    transactions
      .findOne({ where: { x_unique_transaction_id: req.get('X-Unique-Transaction-ID') } })
      .then((xTransaction) => {
        if (xTransaction) {
          res.json({ error: 'Duplicated Transaction Id' });
          return;
        }
        next();
      });
    return;
  }
  badRequest(res, MISSING_UNIQUE_MESSAGE, MISSING_UNIQUE_INTERNAL);
};
