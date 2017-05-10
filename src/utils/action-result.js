import ResponseResult from './response-result';

const NOT_FOUND = 404;
const CREATED = 201;
const OK = 200;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;

export const notFound = (res, id) => {
  const result = new ResponseResult(NOT_FOUND, null, null, [], id);
  res.status(NOT_FOUND);
  res.json(result);
};

export const ok = (res, data, info) => {
  res.status(OK);
  const result = new ResponseResult(OK, data, info, null);
  res.json(result);
};

export const created = (res, data, info) => {
  res.status(CREATED);
  const result = new ResponseResult(CREATED, data, info, null);
  res.json(result);
};

export const forbidden = (res, info, internalCode) => {
  res.status(403);
  const result = new ResponseResult(FORBIDDEN, null, info, null, 0, internalCode);
  res.json(result);
};

export const badRequest = (res, message, internalCode, errors = null) => {
  res.status(400);
  const result = new ResponseResult(BAD_REQUEST, null, null, errors, 0, internalCode, message);
  res.json(result);
};

