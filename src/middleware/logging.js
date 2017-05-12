export default (req, res, transactionSet) => () => {
  const transaction = {
    xUniqueTransactionID: req.get('X-Unique-Transaction-ID'),
    method: req.method,
    url: req.originalUrl,
    requestBody: req.body,
    responseCode: res.statusCode,
  };

  transactionSet.create(transaction).catch((err) => {
    console.log(err);
  });
};
