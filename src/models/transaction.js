import Datatype from 'sequelize';

export default function (db) {
  const Transaction = db.define('Transaction', {
    xUniqueTransactionID: {
      type: Datatype.UUID,
      primaryKey: true,
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
    requestBody: {
      type: Datatype.JSON,
      field: 'request',
    },
    responseCode: {
      type: Datatype.INTEGER,
      field: 'response_code',
    },
    responseBody: {
      type: Datatype.JSON,
      field: 'response',
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return Transaction;
}
