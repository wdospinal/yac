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

function respondWithError(res, statusCode) {
  const resCode = statusCode || 500;
  return (message) => {
    const errorMessage = message || errorCodes.FIREBASE;
    res.status(resCode).json({ message: errorMessage, resCode });
  };
}

module.exports = {
  respondWithResult,
  respondWithError,
};
