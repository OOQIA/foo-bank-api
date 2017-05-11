import initializeDb from './db';
import customer from './models/customer';
import transaction from './models/transaction';
import customerSeed from './seeds/customer-seed.json';

initializeDb((error, db) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  customer(db).sync()
    .then(() => db.models.Customer.bulkCreate(customerSeed));

  transaction(db).sync();
});
