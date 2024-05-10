/**
 * Attaches an event handler to clear the form fields, reset validation errors, and remove 'error' class from input elements before the specified page is shown.
 * @param {string} pageId - The ID of the page to attach the event handler to.
 * @param {string} formId - The ID of the form to be cleared.
 */
function resetFormBeforePageShow(pageId, formId) {
  // Attach an event handler to the pagebeforeshow event of the specified page
  $(document).on("pagebeforeshow", pageId, function () {
    // Call the clearForm function to reset the form
    clearForm(formId);
  });
}

/**
 * Clears the form fields, resets validation errors, and removes the 'error' class from input elements.
 * @param {string} formId - The ID of the form to clear.
 */
function clearForm(formId) {
  // Trigger the reset event on the specified form
  $(formId).trigger("reset");
  // Get the validator associated with the form
  var validator = $(formId).validate();
  // Reset the form validation
  validator.resetForm();
  // Remove the 'error' class from all input elements
  $("input").removeClass("error");
}

/**--------------------------Authenticate User--------------------------**/
/**
 * authenticates a user by checking if the provided email and password match any stored user credentials.
 * @param {string} email - The email address of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {boolean} - Returns true if the authentication is successful, otherwise returns false.
 */
async function authenticateUser(email, password) {
  localStorage.removeItem("user");
  const data = await makeApiCall({
    url: "auth",
    method: "POST",
    data: { email: email, password: password },
  });

  data.success
    ? localStorage.setItem("user", JSON.stringify(data.payload))
    : null;
  return data.success;
}

/**
 * Create new user + Authenticate
 * @param {Object} user user object
 * @returns {boolean} - Returns true if successful, otherwise returns false.
 */
async function makeAuthUser(user) {
  localStorage.removeItem("user");
  const data = await makeApiCall({
    url: "user",
    method: "POST",
    data: user,
  });

  return data.success
    ? await authenticateUser(user.email, user.password)
    : false;
}

/**
 * Create new Order
 * @param {Object} order object
 * @returns {Object} - Returns response object.
 */
async function placeOrder(order) {
  return await makeApiCall({
    url: "order",
    method: "POST",
    data: order,
  });
}

/**
 * Get User Orders
 *
 * @returns {Object} - Returns orders object.
 */
async function getAllOrders() {
  return await makeApiCall({
    url: "order?customerlEmail=" + auth().email,
    method: "GET",
  });
}

/**
 * Delete user all orders
 *
 * @returns {Object} - Returns orders object.
 */
async function deleteAllOrders() {
  return await makeApiCall({
    url: "order?customerlEmail=" + auth().email,
    method: "DELETE",
  });
}

function auth() {
  return JSON.parse(localStorage.getItem("user"));
}
