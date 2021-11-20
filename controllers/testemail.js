const res = require("dotenv").config({ path: "../.env" });

var SibApiV3Sdk = require("sib-api-v3-sdk");

const sendWelcomeMail = (email) => {
  console.log("count began");
  setTimeout(() => {
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
      process.env.EMAIL_API_KEY;

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: "Welcome To Ripen",
        sender: { email: "hello@ripen.in", name: "Ripen" },
        replyTo: { email: "hello@ripen.in", name: "Ripen" },
        to: [{ name: "user", email }],
        templateId: 1,
      })
      .then(
        function (data) {
          console.log(data);
        },
        function (error) {
          console.error(error);
        }
      );
  }, 50000);
};
// sendWelcomeMail("jain2008.harshu@gmail.com");
module.exports = sendWelcomeMail;
