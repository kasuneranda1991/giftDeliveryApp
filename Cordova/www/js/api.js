/**
 * API base url
 */
const BASE_URL = "https://gitfappbackend.onrender.com/";

/**
 * Makes an API call to the specified URL.
 * @param {Object} s - The options for the API call.
 * @param {String} url - The URL to make the API call to.
 * @param {String} method GET | POST | etc. The HTTP method for the API call.
 * @param {Object} data - The data to be sent with the API call.
 */
function makeApiCall({ url = null, method = null, data = null }) {
  return fetch(BASE_URL + url, {
    method: method, // Request method
    headers: {
      "Content-Type": "application/json", // Content type
    },
    body: data ? JSON.stringify(data) : null, // Request body
  })
    .then((response) => response.json()) // Parsing the JSON response
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("API call Error:", error); // Logging any errors
    });
}
