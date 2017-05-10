export default class ResponseResult {
  constructor(statusCode, data = null, info = '', errors = []) {
    let infoMessage = info;
    let internalCode = null;

    switch (statusCode) {
      case 404:
        infoMessage = 'Not Found';
        internalCode = 'not_found';
        break;
      default:
        break;
    }
    this.result = {
      code: statusCode,
      info: infoMessage,
      internal_code: internalCode,
      errors,
    };
    this.data = data;

    // Clean up null properties from result;
    this.result = cleanObject(this.result);
    if (!data) {
      delete this.data;
    } else {
      this.data = cleanObject(this.data);
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
