import ResponseResult from './response-result';

const NOT_FOUND = 404;
const CREATED = 201;
const OK = 200;

export const notFound = (res) => {
  const result = new ResponseResult(NOT_FOUND);
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

