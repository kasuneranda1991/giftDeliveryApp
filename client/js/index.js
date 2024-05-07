//==================================index.js==================================//

var debug = false;
var authenticated = false;

$(document).ready(function () {
  localStorage.removeItem("allUsers");
  localStorage.removeItem("allOrders");
  if (!localStorage.allUsers) {
    if (debug) alert("Users not found - creating a default user!");

    var userData = {
      email: "admin@domain.com",
      password: "admin",
      firstName: "CQU",
      lastName: "User",
      state: "QLD",
      phoneNumber: "0422919919",
      address: "700 Yamba Road",
      postcode: "4701",
    };

    var allUsers = [];
    allUsers.push(userData);

    if (debug) alert(JSON.stringify(allUsers));
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
  } else {
    if (debug) alert("Names Array found-loading..");

    var allUsers = JSON.parse(localStorage.allUsers);
    if (debug) alert(JSON.stringify(allUsers));
  }

  /**
	----------------------Event handler to process login request----------------------
	**/

  $("#loginButton").click(function () {
    localStorage.removeItem("inputData");

    $("#loginForm").submit();

    if (localStorage.inputData != null) {
      var inputData = JSON.parse(localStorage.getItem("inputData"));

      if (authenticateUser(inputData.email, inputData.password)) {
        authenticated = true;
        alert("Login success");
        $.mobile.changePage("#homePage");
      } else {
        alert("Login failed");
      }
      $("#loginForm").trigger("reset");
    }
  });

  resetFormBeforePageShow("#loginPage", "#loginForm");

  $("#loginForm").validate({
    // JQuery validation plugin
    focusInvalid: false,
    onkeyup: false,
    submitHandler: function (form) {
      var formData = $(form).serializeArray();
      var inputData = {};
      formData.forEach(function (data) {
        inputData[data.name] = data.value;
      });

      localStorage.setItem("inputData", JSON.stringify(inputData));
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
    localStorage.removeItem("orderInfo");

    $("#orderForm").submit();

    if (localStorage.orderInfo != null) {
      var orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

      var allOrders = [];

      if (localStorage.allOrders != null)
        allOrders = JSON.parse(localStorage.allOrders);

      allOrders.push(orderInfo);

      localStorage.setItem("allOrders", JSON.stringify(allOrders));

      if (debug) alert(JSON.stringify(allOrders));

      $("#orderForm").trigger("reset");

      $.mobile.changePage("#confirmPage");
    }
  });

  $("#orderForm").validate({
    focusInvalid: false,
    onkeyup: false,
    submitHandler: function (form) {
      var formData = $(form).serializeArray();
      var orderInfo = {};

      formData.forEach(function (data) {
        orderInfo[data.name] = data.value;
      });

      orderInfo.item = localStorage.getItem("itemName");
      orderInfo.price = localStorage.getItem("itemPrice");
      orderInfo.img = localStorage.getItem("itemImage");

      var userInfo = JSON.parse(localStorage.getItem("userInfo"));

      orderInfo.customerfName = userInfo.firstName;
      orderInfo.customerlName = userInfo.lastName;

      localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

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

  $(document).on("pagebeforeshow", "#loginPage", function () {
    localStorage.removeItem("userInfo");
    authenticated = false;
  });

  /**-----------Event handler to populate the fill order page before it is displayed--------**/

  $(document).on("pagebeforeshow", "#fillOrderPage", function () {
    $("#itemSelected").text(localStorage.getItem("itemName"));
    $("#priceSelected").text(localStorage.getItem("itemPrice"));
    $("#imageSelected").attr("src", localStorage.getItem("itemImage"));
  });

  /**-----------Event handler to populate the confirm page before it is displayed---**/

  $(document).on("pagebeforeshow", "#confirmPage", function () {
    $("#orderConfirmation").html("");

    if (localStorage.orderInfo != null) {
      var orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

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
  });

  /**--------------------------Signup form validate--------------------------**/
  resetFormBeforePageShow("#signUpPage", "#signUpForm");
  $("#signUpFormClearBtn").on("click", function () {
    clearForm("#signUpForm");
  });

  $("#signUpForm").validate({
    focusInvalid: false,
    onkeyup: false,
    submitHandler: function (form) {
      // Serialize form data
      var data = $(form).serializeArray();
      // Retrieve all users from local storage
      var allUsers = JSON.parse(localStorage.getItem("allUsers"));
      var user = {};

      // Convert serialized form data into an object
      data.forEach(function (input) {
        user[input.name] = input.value;
      });

      // Add new user to the list of all users
      allUsers.push(user);
      // Update local storage with the new user data
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      // Authenticate user with provided credentials
      if (authenticateUser(user.email, user.password)) {
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
  $(document).on("pagebeforeshow", "#orderListPage", function () {
    let orders = JSON.parse(localStorage.getItem("allOrders"));
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
  /**--------------------------Load user data on userprofile page--------------------------**/
  $(document).on("pagebeforeshow", "#userProfile", function () {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    $("#userDetailsTable").empty();
    $("#userDetailsTable").append(
      '<tr><td>Email:</td><td class="fcolor">' + user.email + "</td></tr>"
    );

    $("#userDetailsTable").append(
      '<tr><td>Name:</td><td class="fcolor">' +
        user.firstName +
        " " +
        user.lastName +
        "</td></tr>"
    );

    $("#userDetailsTable").append(
      '<tr><td>Address:</td><td class="fcolor">' +
        user.address +
        " " +
        user.state +
        " " +
        user.postcode +
        "</td></tr>"
    );
    $("#userDetailsTable").append(
      '<tr><td>Phone number:</td><td class="fcolor">' +
        user.phoneNumber +
        "</td></tr>"
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
