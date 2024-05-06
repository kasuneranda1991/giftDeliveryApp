//server base domain url 
const domainUrl = 'http://127.0.0.1:3000';  // if local test, pls use this 


//==================================index.html==================================//


var debug = true;
var authenticated = false;


$(document).ready(function () {
	
/**
----------------------login js----------------------
**/
   
	$('#loginButton').click(function () {

		localStorage.removeItem("inputData")

		$("#loginForm").submit();

		if (localStorage.inputData != null) {

			var inputData = JSON.parse(localStorage.getItem("inputData"));

			$.post("http://localhost:3000/verifyUser", inputData,  function(data, status){
					if (debug) alert("Data received: " + JSON.stringify(data));
					if (debug) alert("\nStatus: " + status);
				
				if (data.length > 0) {
					alert("Login success");
					authenticated = true;
					localStorage.setItem("userInfo", JSON.stringify(data[0]));	
					$.mobile.changePage("#homePage");
				} 
				else {
					alert("Login failed");
				}

				$("#loginForm").trigger('reset');	
			})
		}
		
	})


	$("#loginForm").validate({ // JQuery validation plugin
		focusInvalid: false,  
		onkeyup: false,
		submitHandler: function (form) {   
			authenticated = false;
			
			var formData =$(form).serializeArray();
			var inputData = {};
			formData.forEach(function(data){
				inputData[data.name] = data.value;
			})

			localStorage.setItem("inputData", JSON.stringify(inputData));		

		},
		/* Validation rules */
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				rangelength: [3, 10]
			}
		},
		/* Validation message */
		messages: {
			email: {
				required: "please enter your email",
				email: "The email format is incorrect  "
			},
			password: {
				required: "It cannot be empty",
				rangelength: $.validator.format("Minimum Password Length:{0}, Maximum Password Length:{1}。")

			}
		},
	});
	/**
	--------------------------end--------------------------
	**/	


	
	/**
	----------------------select gift category and save to localStorage js----------------------
	**/
	$('#itemList li').click(function () {
		
		var itemName = $('#itemName').text();
		var itemPrice = $('#itemPrice').text();
		var itemImage = $('#itemImage').attr('src');
		
		localStorage.setItem("itemName", itemName);
		localStorage.setItem("itemPrice", itemPrice);
		localStorage.setItem("itemImage", itemImage);

	}) 

	/**
	--------------------------end--------------------------
	**/	


	$('#confirmOrderButton').on('click', function () {
		
		localStorage.removeItem("orderInfo");

		$("#orderForm").submit();

		if (localStorage.orderInfo != null) {
		
			var orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

			$.post("http://localhost:3000/postOrderData", orderInfo, function(data, status){
				if (debug) alert("Data sent: " + JSON.stringify(data));
				if (debug) alert("\nStatus: " + status);
			
				//clear form data 
				$("#orderForm").trigger('reset');
				
				$.mobile.changePage("#confirmPage");
	
			});		
		}

	})


	$("#orderForm").validate({  
		focusInvalid: false, 
		onkeyup: false,
		submitHandler: function (form) {   
			
			var formData =$(form).serializeArray();
			var orderInfo = {};

			formData.forEach(function(data){
				orderInfo[data.name] = data.value;
			});
			
			orderInfo.itemName = localStorage.getItem("itemName")
			orderInfo.itemPrice = localStorage.getItem("itemPrice")
			orderInfo.itemImage = localStorage.getItem("itemImage")
			
			var userInfo = JSON.parse(localStorage.getItem("userInfo"));
			
			if (debug) alert("Customer: " + JSON.stringify(userInfo));

			orderInfo.customerfName = userInfo.firstName;
			orderInfo.customerlName = userInfo.lastName;
			
			if (debug) alert(JSON.stringify(orderInfo));

			localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
					
		},
		
		/* validation rules */
		
		rules: {
			firstName: {
				required: true,
				rangelength: [1, 15],
				validateName: true
			},
			lastName: {
				required: true,
				rangelength: [1, 15],
				validateName: true
			},
			phoneNumber: {
				required: true,
				mobiletxt: true
			},
			address: {
				required: true,
				rangelength: [1, 25]
			},
			postcode: {
				required: true,
				posttxt: true
			},/*
			oDate: {
				required: true,
				datetime: true
			},*/
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

			},/*
			date2: {
				required: "required",
			},*/
		}
	});

	/**
	--------------------------end--------------------------
	**/

	/**
	--------------------Event handler to perform initialisation before login page is displayed--------------------
	**/

	$(document).on("pagebeforeshow", "#loginPage", function() {
	
		localStorage.removeItem("userInfo");
		
		authenticated = false;
	
	});  
	
	/**
	--------------------------end--------------------------
	**/	


	/**
	--------------------Event handler to populate the fill order page before it is displayed---------------------
	**/

	
	$(document).on("pagecreate", "#fillOrderPage", function() {
		
		$("#itemSelected").text(localStorage.getItem("itemName"));
		$("#priceSelected").text(localStorage.getItem("itemPrice"));
		$("#imageSelected").attr('src', localStorage.getItem("itemImage"));
	
	});  
	
	/**
	--------------------------end--------------------------
	**/	

	/**
	--------------------Event handler to populate the confirm Page before it is displayed---------------------
	**/
	 
	$(document).on("pagebeforeshow", "#confirmPage", function() {
		
		$('#orderConfirmation').html("");

		if (localStorage.orderInfo != null) {
	
			var orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
	
			$('#orderConfirmation').append('<br><table><tbody>');
			$('#orderConfirmation').append('<tr><td>Customer: </td><td><span class=\"fcolor\">' + orderInfo.customerfName + ' ' + orderInfo.customerlName + '</span></td></tr>');	
			$('#orderConfirmation').append('<tr><td>Item: </td><td><span class=\"fcolor\">' + orderInfo.itemName + '</span></td></tr>');	
			$('#orderConfirmation').append('<tr><td>Price: </td><td><span class=\"fcolor\">' + orderInfo.itemPrice + '</span></td></tr>');
			$('#orderConfirmation').append('<tr><td>Recipient: </td><td><span class=\"fcolor\">' + orderInfo.firstName + ' ' + orderInfo.lastName + '</span></td></tr>');
			$('#orderConfirmation').append('<tr><td>Address: </td><td><span class=\"fcolor\">' + orderInfo.address + ' ' + orderInfo.postcode + '</span></td></tr>');
			$('#orderConfirmation').append('<tr><td>Dispatch date: </td><td><span class=\"fcolor\">' + orderInfo.date + '</span></td></tr>');
			$('#orderConfirmation').append('</tbody></table><br>');
		}
		else {
			$('#orderConfirmation').append('<h4>There is no order to display<h4>');
		}
	});  

	/**
	--------------------------end--------------------------
	**/	

});



