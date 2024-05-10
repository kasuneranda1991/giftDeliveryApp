/**
 * Generate a success response
 *
 * @param {Object} params
 * @param {String} params.message
 * @param {Object} params.payload
 * @returns {Object}
 */
function success({ message = "Successful", payload = null }) {
  return {
    success: true,
    message: message,
    payload: payload,
  };
}

/**
 * Generate a error response
 *
 * @param {Object} params
 * @param {String} params.message
 * @param {Object} params.payload
 * @returns {Object}
 */
function error({ message = "Unsuccessful", payload = null }) {
  return {
    success: false,
    message: message,
    payload: payload,
  };
}

module.exports = {
  success,
  error,
};
