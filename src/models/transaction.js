import Datatype from 'sequelize';

export default function (db) {
  const Transaction = db.define('Transaction', {
    xUniqueTransactionID: {
      type: Datatype.UUID,
      primaryKey: true,
      field: 'x_unique_transaction_id',
    },
    method: {
      type: Datatype.STRING,
      field: 'method',
      validate: {
        len: [0, 6],
      },
    },
    url: {
      type: Datatype.STRING,
      field: 'url',
      validate: {
        len: [0, 250],
      },
    },
    requestBody: {
      type: Datatype.JSON,
      field: 'request',
    },
    responseCode: {
      type: Datatype.INTEGER,
      field: 'response_code',
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return Transaction;
}
