import initializeDb from './db';
import customer from './models/customer';
import transaction from './models/transaction';

initializeDb((error, db) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  customer(db).sync();
  transaction(db).sync();
});
