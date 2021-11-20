require("dotenv").config({ path: "../.env" });
const SibApiV3Sdk = require("sib-api-v3-sdk");

const addContact = (email) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.EMAIL_API_KEY;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let createContact = new SibApiV3Sdk.CreateContact();

  createContact.email = email;
  createContact.listIds = [10];

  apiInstance.createContact(createContact).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};
addContact("smurfharshit@gmail.com");
