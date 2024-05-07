var validations = {
  loginForm: {
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        rangelength: [3, 10],
      },
    },
    /* Validation message */
    messages: {
      email: {
        required: "Please enter your email",
        email: "The email format is incorrect",
      },
      password: {
        required: "Password cannot be empty",
        rangelength: $.validator.format(
          "Minimum Password Length:{0}, Maximum Password Length:{1}。"
        ),
      },
    },
  },
  orderForm: {
    rules: {
      firstName: {
        required: true,
        rangelength: [1, 15],
        validateName: true,
      },
      lastName: {
        required: true,
        rangelength: [1, 15],
        validateName: true,
      },
      phoneNumber: {
        required: true,
        mobiletxt: true,
      },
      address: {
        required: true,
        rangelength: [1, 25],
      },
      postcode: {
        required: true,
        posttxt: true,
      },
    },
    /* Validation Message */

    messages: {
      firstName: {
        required: "Please enter your firstname",
        rangelength: $.validator.format("Contains a maximum of{1}characters"),
      },
      lastName: {
        required: "Please enter your lastname",
        rangelength: $.validator.format("Contains a maximum of{1}characters"),
        validateName: true,
      },
      phoneNumber: {
        required: "Phone number required",
      },
      address: {
        required: "Delivery address required",
        rangelength: $.validator.format("Contains a maximum of{1}characters"),
      },
      postcode: {
        required: "Postcode required",
      },
    },
  },
  signUpForm: {
    rules: {
      firstName: {
        required: true,
        rangelength: [1, 15],
        validateName: true,
      },
      lastName: {
        required: true,
        rangelength: [1, 15],
        validateName: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
      phoneNumber: {
        required: true,
        mobiletxt: true,
      },
      address: {
        required: true,
        rangelength: [1, 25],
      },
      postcode: {
        required: true,
        posttxt: true,
      },
    },
    messages: {
      firstName: {
        required: "Please enter your firstname",
        rangelength: $.validator.format("Contains a maximum of{1}characters"),
      },
      email: {
        required: "Please enter your email",
      },
      lastName: {
        required: "Please enter your lastname",
        rangelength: $.validator.format("Contains a maximum of{1}characters"),
        validateName: true,
      },
      phoneNumber: {
        required: "Phone number required",
      },
      password: {
        required: "Please enter password",
      },
      address: {
        required: "Address required",
        rangelength: $.validator.format("Contains a maximum of{1}characters"),
      },
      postcode: {
        required: "Postcode required",
      },
    },
  },
};
