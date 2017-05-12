export default (req, res, transactionSet) => () => {
  const transaction = {
    xUniqueTransactionID: req.get('X-Unique-Transaction-ID'),
    method: req.method,
    url: req.originalUrl,
    requestBody: req.body,
    responseCode: res.statusCode,
  };

  let retrievedTransaction;

  transactionSet.findOne({ where: { xUniqueTransactionID: transaction.xUniqueTransactionID } })
    .then((transactionToUpdate) => {
      retrievedTransaction = transactionToUpdate;

      if (!retrievedTransaction) {
        transactionSet.create(transaction).catch((err) => {
          // TODO: Error logging.
          console.log(err);
        });
      }

      retrievedTransaction.update(transaction)
        .catch((err) => {
          // TODO: Error logging.
          console.log(err);
        });
    });
};
