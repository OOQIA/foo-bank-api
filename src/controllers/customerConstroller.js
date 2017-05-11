import humps from 'humps';
import isUUID from 'validator/lib/isUUID';
import { notFound, ok, created, forbidden } from '../utils/action-result';
import {
  CUSTOMER_CREATED_OK,
  GET_CUSTOMER_OK,
  CUSTOMER_UPDATED_OK,
  UNIQUE_ID_EXIST,
  INTERNAL_CODE_ID_EXIST,
} from './infoMessages';

export default class CustomerController {
  constructor(customerSet) {
    this.customerSet = customerSet;
  }

  get(req, res) {
    const id = req.params.user_id;
    if (!isUUID(id, 4)) {
      notFound(res, id);
      return;
    }
    this.customerSet
      .findById((id), { attributes: { exclude: ['created_at', 'updated_at'] } })
      .then((data) => {
        if (data) {
          ok(res, data.dataValues, GET_CUSTOMER_OK);
        } else {
          notFound(res, id);
        }
      });
  }

  post(req, res) {
    const newCustomer = humps.camelizeKeys(req.body);
    this.customerSet.create(newCustomer)
      .then((customer) => {
        const customerReferenceId = customer.dataValues.id;
        const data = {
          user_reference_id: customerReferenceId,
        };
        created(res, data, CUSTOMER_CREATED_OK);
      }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          forbidden(res, UNIQUE_ID_EXIST, INTERNAL_CODE_ID_EXIST);
          return;
        }
        res.status(200);
        res.json(err);
      });
  }

  put(req, res) {
    const id = req.params.user_id;
    this.customerSet
      .findById(id)
      .then((data) => {
        if (data) {
          const newCustomerValues = humps.camelizeKeys(req.body);
          this.customerSet
            .update(newCustomerValues, { where: { id }, individualHooks: true })
            .then(() => {
              ok(res, null, CUSTOMER_UPDATED_OK);
            });
        } else {
          notFound(res, id);
        }
      });
  }
}

