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
function authenticateUser(email, password) {
  // Retrieve all users from local storage
  var allUsers = JSON.parse(localStorage.getItem("allUsers"));

  // Iterate through each user to check for a match
  for (var i = 0; i < allUsers.length; i++) {
    var userData = allUsers[i];
    // Check if email and password match the current user's credentials
    if (email === userData.email && password === userData.password) {
      // Store user information in local storage
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return true; // Authentication successful
    }
  }
  return false; // Authentication failed
}
