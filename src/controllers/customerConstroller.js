export default class CustomerController {
  constructor(customerSet) {
    this.customerSet = customerSet;
  }

  get(req, res) {
    const id = req.params.user_id;
    return this.customerSet
      .findOne({ where: { id } })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404);
          res.json({});
        }
      });
  }

  post(req, res) {
    res.status(201);
    res.json();
  }

  put(req, res) {
    const id = req.params.user_id;
    res.status(200);
    res.json(id);
  }
}

