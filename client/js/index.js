//==================================index.js==================================//

var debug = false;
var authenticated = false;

$(document).ready(function () {
  /**
	----------------------Event handler to process login request----------------------
	**/

  $("#loginButton").click(async function (e) {
    localStorage.removeItem("inputData");
    $("#loginForm").submit();
  });

  resetFormBeforePageShow("#loginPage", "#loginForm");

  $("#loginForm").validate({
    // JQuery validation plugin
    focusInvalid: false,
    onkeyup: false,
    submitHandler: async function (form) {
      var formData = $(form).serializeArray();
      var inputData = {};
      formData.forEach(function (data) {
        inputData[data.name] = data.value;
      });

      authenticated = await authenticateUser(
        inputData.email,
        inputData.password
      );

      if (authenticated) {
        alert("Login success");
        $.mobile.changePage("#homePage");
      } else {
        alert("Login failed");
      }
      $("#loginForm").trigger("reset");
    },
    /* Validation rules */
    rules: validations.loginForm.rules,
    /* Validation message */
    messages: validations.loginForm.messages,
  });

  /**-------Event handler to respond to selection of gift category--------**/
  $("#itemList li").click(function () {
    var itemName = $(this).find("#itemName").text();
    var itemPrice = $(this).find("#itemPrice").text();
    var itemImage = $(this).find("#itemImage").attr("src");

    localStorage.setItem("itemName", itemName);
    localStorage.setItem("itemPrice", itemPrice);
    localStorage.setItem("itemImage", itemImage);
  });

  /**-----------Event handler to process order confirmation-------**/

  resetFormBeforePageShow("#fillOrderPage", "#orderForm");
  $("#confirmOrderButton").on("click", function () {
    $("#orderForm").submit();
    $("#orderForm").trigger("reset");
    $.mobile.changePage("#confirmPage");
  });

  $("#orderForm").validate({
    focusInvalid: false,
    onkeyup: false,
    submitHandler: async function (form) {
      var formData = $(form).serializeArray();
      var orderInfo = {};

      formData.forEach(async function (data) {
        orderInfo[data.name] = data.value;
      });

      orderInfo.item = localStorage.getItem("itemName");
      orderInfo.price = localStorage.getItem("itemPrice");
      orderInfo.img = localStorage.getItem("itemImage");

      var userInfo = auth();
      orderInfo.customerfName = userInfo.firstName;
      orderInfo.customerlName = userInfo.lastName;
      orderInfo.customerlEmail = userInfo.email;
      const res = await placeOrder(orderInfo);

      $("#orderConfirmation").html("");
      var orderInfo = res.payload.id;
      if (orderInfo != null) {
        $("#orderConfirmation").append("<br><table><tbody>");
        $("#orderConfirmation").append(
          '<tr><td>Customer: </td><td><span class="fcolor">' +
            orderInfo.customerfName +
            " " +
            orderInfo.customerlName +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append(
          '<tr><td>Item: </td><td><span class="fcolor">' +
            orderInfo.item +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append(
          '<tr><td>Price: </td><td><span class="fcolor">' +
            orderInfo.price +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append(
          '<tr><td>Recipient: </td><td><span class="fcolor">' +
            orderInfo.firstName +
            " " +
            orderInfo.lastName +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append(
          '<tr><td>Phone number: </td><td><span class="fcolor">' +
            orderInfo.phoneNumber +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append(
          '<tr><td>Address: </td><td><span class="fcolor">' +
            orderInfo.address +
            " " +
            orderInfo.postcode +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append(
          '<tr><td>Dispatch date: </td><td><span class="fcolor">' +
            orderInfo.date +
            "</span></td></tr>"
        );
        $("#orderConfirmation").append("</tbody></table><br>");
      } else {
        $("#orderConfirmation").append("<h3>There is no order to display<h3>");
      }
      if (debug) alert(JSON.stringify(orderInfo));
    },

    /* Validation rules */
    rules: validations.orderForm.rules,
    /* Validation message */
    messages: validations.orderForm.messages,
  });

  /**
	--------------------Event handler to perform initialisation before login page is displayed--------------------
	**/

  $(document).on("click", ".ui-icon-power", function () {
    localStorage.removeItem("user");
    authenticated = false;
  });
  /**-----------Event handler to populate the fill order page before it is displayed--------**/

  $(document).on("pagebeforeshow", "#fillOrderPage", function () {
    $("#itemSelected").text(localStorage.getItem("itemName"));
    $("#priceSelected").text(localStorage.getItem("itemPrice"));
    $("#imageSelected").attr("src", localStorage.getItem("itemImage"));
  });

  /**--------------------------Signup form validate--------------------------**/
  resetFormBeforePageShow("#signUpPage", "#signUpForm");
  $("#signUpFormClearBtn").on("click", function () {
    clearForm("#signUpForm");
  });

  $("#signUpForm").validate({
    focusInvalid: false,
    onkeyup: false,
    submitHandler: async function (form) {
      // Serialize form data
      var data = $(form).serializeArray();
      // Retrieve all users from local storage

      var user = {};

      // Convert serialized form data into an object
      data.forEach(function (input) {
        user[input.name] = input.value;
      });
      let isAUthenticated = await makeAuthUser(user);
      // Authenticate user with provided credentials
      if (isAUthenticated) {
        authenticated = true;
        // Display success message
        alert("Login success");
        // Redirect to the home page
        $.mobile.changePage("#homePage");
      } else {
        // Display error message
        alert("Login failed");
      }

      // Reset the form after submission
      $(this).trigger("reset");
    },
    // Validation rules for form fields
    rules: validations.signUpForm.rules,
    // Validation error messages for form fields
    messages: validations.signUpForm.messages,
  });

  /**--------------------------List all orders--------------------------**/
  $(document).on("pagebeforeshow", "#orderListPage", async function () {
    let orders = await getAllOrders();
    var appendElement = "#allOrders";
    $(appendElement).empty();
    if (orders) {
      orders.forEach(function (order) {
        showOrderDetails(appendElement, order);
      });
    } else {
      $(appendElement).append(
        '<h3 class="center">There is no order to display</h3>'
      );
    }
  });
  /**--------------------------Load user data on deleteOrders page--------------------------**/
  $(document).on("pagebeforeshow", "#deleteOrders", async function () {
    const data = await deleteAllOrders();
    $("#deletedOrderCount").text(
      data.payload.deletedCount > 0
        ? `${data.payload.deletedCount} orders deleted`
        : "No orders to delete"
    );
  });
  /**----------------------Order Details------------------------------**/

  function showOrderDetails(appendElement, order) {
    $(appendElement).append("<br><table><tbody>");
    $(appendElement).append(
      '<tr><td>Customer: </td><td><span class="fcolor">' +
        order.customerfName +
        " " +
        order.customerlName +
        "</span></td></tr>"
    );
    $(appendElement).append(
      '<tr><td>Item: </td><td><span class="fcolor">' +
        order.item +
        "</span></td></tr>"
    );
    $(appendElement).append(
      '<tr><td>Price: </td><td><span class="fcolor">' +
        order.price +
        "</span></td></tr>"
    );
    $(appendElement).append(
      '<tr><td>Recipient: </td><td><span class="fcolor">' +
        order.firstName +
        " " +
        order.lastName +
        "</span></td></tr>"
    );
    $(appendElement).append(
      '<tr><td>Phone number: </td><td><span class="fcolor">' +
        order.phoneNumber +
        "</span></td></tr>"
    );
    $(appendElement).append(
      '<tr><td>Address: </td><td><span class="fcolor">' +
        order.address +
        " " +
        order.postcode +
        "</span></td></tr>"
    );
    $(appendElement).append(
      '<tr><td>Dispatch date: </td><td><span class="fcolor">' +
        order.date +
        "</span></td></tr>"
    );
    $(appendElement).append("</tbody></table><br>");
  }
  /**----------------------------------------------------**/
});
