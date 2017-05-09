import Datatype from 'sequelize';

export default function (db) {
  const Transaction = db.define('Transaction', {
    xUniqueTransactionID: {
      type: Datatype.STRING,
      field: 'x_unique_transaction_id',
      validate: {
        len: [35],
      },
    },
    method: {
      type: Datatype.STRING,
      field: 'method',
      validate: {
        len: [6],
      },
    },
    url: {
      type: Datatype.STRING,
      field: 'url',
      validate: {
        len: [30],
      },
    },
    body: {
      type: Datatype.TEXT,
      field: 'body',
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return Transaction;
}
