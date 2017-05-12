import humps from 'humps';

export default class ResponseResult {
  constructor(statusCode,
    data = null,
    info = '',
    errors = [],
    id = 0,
    internalCode = null,
    message = null,
    previousResponse = null) {
    let infoMessage = info;
    let internalCodeMessage = internalCode;

    switch (statusCode) {
      case 404:
        infoMessage = 'Not Found';
        internalCodeMessage = 'not_found';
        errors.push({
          customerDescription: `Invalid uuid=[${id}]!`,
          severity: 'MAJOR',
          language: 'EN',
        });
        break;
      default:
        break;
    }
    this.result = {
      code: statusCode,
      info: infoMessage,
      message,
      internal_code: internalCodeMessage,
      errors,
    };
    this.data = data;

    this.previousResponse = previousResponse;

    // Clean up null properties from result;
    this.result = cleanObject(this.result);
    if (!data) {
      delete this.data;
    } else {
      this.data = cleanObject(this.data);
      this.data = humps.decamelizeKeys(this.data);
    }

    if (!previousResponse) {
      delete this.previousResponse;
    } else {
      this.previousResponse = cleanObject(this.previousResponse);
      this.previousResponse = humps.decamelizeKeys(this.previousResponse);
    }
  }
}

const cleanObject = (object) => {
  if (!object) {
    return object;
  }
  const result = object;
  Object.keys(result)
    .forEach((key) => (result[key] == null) && delete result[key]);
  return result;
};
