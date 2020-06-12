const { errorCodes } = require('./constants');

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (result) => {
    if (result) {
      return res.status(statusCode).json(result);
    }
    return res.sendStatus(statusCode);
  };
}
const getErrorCode = (code) => {
  const message = errorCodes[code];
  return { message, code };
};
function respondWithError(res, statusCode) {
  const resCode = statusCode || 500;
  return (code) => {
    let response = getErrorCode(code);
    response = response.message ? response : getErrorCode(3);
    res.status(resCode).json(response);
  };
}

module.exports = {
  respondWithResult,
  respondWithError,
};
