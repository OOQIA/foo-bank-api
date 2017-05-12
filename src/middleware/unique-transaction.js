import compareJson from 'deep-diff';
import { badRequest, conflict } from '../utils/action-result';
import { 
        MISSING_UNIQUE_INTERNAL,
        MISSING_UNIQUE_MESSAGE,
        DUPLICATED_TRANSACTION_ID,
        DUPLICATED_TRANSACTION_DIFF_BODY_MESSAGE,
        DUPLICATED_TRANSACTION_MESSAGE,
       } from './unique-transaction-messages';
import Transaction from '../models/transaction';

export default (db) => (req, res, next) => {
  const transactionId = req.get('X-Unique-Transaction-ID');
  if (transactionId) {
    const transactions = Transaction(db);
    transactions
      .findOne({ where: { x_unique_transaction_id: req.get('X-Unique-Transaction-ID') } })
      .then((xTransaction) => {
        if (!xTransaction) {
          next();
          return;
        }
        if (xTransaction.responseCode >= 400) {
          next();
          return;
        }
        const diff = compareJson.diff(req.body, xTransaction.requestBody);
        // Check if body is similar from previous registered transaction.
        if (!diff) {
          conflict(res, DUPLICATED_TRANSACTION_MESSAGE, DUPLICATED_TRANSACTION_ID);
          return;
        }
        // If body is different from previous transaction send a bad request.
        badRequest(res, DUPLICATED_TRANSACTION_DIFF_BODY_MESSAGE, DUPLICATED_TRANSACTION_ID);
      });
    return;
  }
  badRequest(res, MISSING_UNIQUE_MESSAGE, MISSING_UNIQUE_INTERNAL);
};
