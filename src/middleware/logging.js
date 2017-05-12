export default (req, res, transactionSet) => () => {
  const transaction = {
    xUniqueTransactionID: req.get('X-Unique-Transaction-ID'),
    method: req.method,
    url: req.originalUrl,
    requestBody: req.body,
    responseCode: res.statusCode,
  };

  if (res.sentResult) {
    transaction.responseBody = res.sentResult;
  }

  transactionSet.findOne({ where: { xUniqueTransactionID: transaction.xUniqueTransactionID } })
    .then((transactionToUpdate) => {
      if (transactionToUpdate) {
        transactionToUpdate.update(transaction)
          .catch((err) => {
            // TODO: Error logging.
            console.log(err);
          });
      }

      transactionSet.create(transaction).catch((err) => {
        // TODO: Error logging.
        console.log(err);
      });
    });
};
