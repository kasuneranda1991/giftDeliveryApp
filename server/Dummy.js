const { faker } = require("@faker-js/faker");

/**
 * Creates dummy json user object
 * @returns JSON object order
 */
function user() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.location.streetAddress({useFullAddress:true}),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    state: faker.location.state({abbreviated:true}),
  };
}

/**
 * Creates dummy json order object
 * @returns JSON object order
 */
function order() {
  return {
    address: faker.location.secondaryAddress(),
    customerfName: faker.person.firstName(),
    customerLName: faker.person.lastName(),
    date: faker.date.anytime(),
    distributor: faker.company.name(),
    postalCode: faker.helpers.rangeToNumber({min:1000,max:9999}),
    state: faker.location.state({abbreviated:true}),
    itemName: faker.commerce.productName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    itemImage: faker.image.urlPicsumPhotos(),
    itemPrice: faker.commerce.price({symbol:"AUD"}),
    phoneNumber: faker.number.int({min:1000000000,max:9999999999})
  };
}

module.exports = {
  user,
  order
};
