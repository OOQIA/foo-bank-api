import humps from 'humps';
import isUUID from 'validator/lib/isUUID';
import {
  notFound,
  ok,
  created,
  forbidden,
  badRequest,
  conflict,
} from '../utils/action-result';
import {
  CUSTOMER_CREATED_OK,
  GET_CUSTOMER_OK,
  CUSTOMER_UPDATED_OK,
  UNIQUE_ID_EXIST,
  INTERNAL_CODE_ID_EXIST,
  INTERNAL_CODE_CONFLICTING,
} from './infoMessages';
import logging from '../middleware/logging';

export default class CustomerController {
  constructor(customerSet, transactionSet) {
    this.customerSet = customerSet;
    this.transactionSet = transactionSet;
  }

  get(req, res) {
    const id = req.params.user_id;
    let resData;
    if (!isUUID(id, 4)) {
      notFound(res, id);
      return;
    }
    this.customerSet
      .findById((id), { attributes: { exclude: ['created_at', 'updated_at'] } })
      .then((data) => {
        if (data) {
          resData = data;
          ok(res, data.dataValues, GET_CUSTOMER_OK);
        } else {
          notFound(res, id);
        }
      });
    res.on('finish', logging(req, res, this.transactionSet));
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
          if (err.errors.length === 1) {
            forbidden(res, UNIQUE_ID_EXIST, INTERNAL_CODE_ID_EXIST);
            return;
          }
          const firstError = err.errors[0].message;
          conflict(res, firstError, INTERNAL_CODE_CONFLICTING);
          return;
        }
        if (err.name === 'SequelizeValidationError') {
          const firstError = err.errors[0].message;
          badRequest(res, null, null, null, firstError);
          return;
        }
        // If we got this far we don't know what happen
        res.status(500);
        // TODO: Log err and return a simple "Something went wrong";
        res.json(err);
      });
    res.on('finish', logging(req, res, this.transactionSet));
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
            }).catch((err) => {
              if (err.name === 'SequelizeUniqueConstraintError') {
                const firstError = err.errors[0].message;
                conflict(res, firstError, INTERNAL_CODE_CONFLICTING);
                return;
              }
              if (err.name === 'SequelizeValidationError') {
                const firstError = err.errors[0].message;
                badRequest(res, null, null, null, firstError);
                return;
              }
              // If we got this far we don't know what happen
              res.status(500);
              // TODO: Log err and return a simple "Something went wrong";
              res.json(err);
            });
        } else {
          notFound(res, id);
        }
      });
    res.on('finish', logging(req, res, this.transactionSet));
  }
}

