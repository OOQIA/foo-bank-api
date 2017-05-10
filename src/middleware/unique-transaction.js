import { badRequest } from '../utils/action-result';
import { MISSING_UNIQUE_INTERNAL, MISSING_UNIQUE_MESSAGE } from './unique-transaction-messages';

export default ({ db }) => (req, res, next) => {
  const transactionId = req.get('X-Unique-Transaction-ID');
  if (transactionId) {
    // TODO: Check if transaction Id is actually valid
    next();
    return;
  }
  badRequest(res, MISSING_UNIQUE_MESSAGE, MISSING_UNIQUE_INTERNAL);
};
