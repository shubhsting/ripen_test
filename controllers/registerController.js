const { User } = require("../models/user");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const sendWelcomeMail = require("./testemail");
const register = catchAsyncErrors(async (req, res) => {
  const check = await User.findOne({ email: req.body.email }).exec();
  if(check && check.is_verified){
    return res.status(409).send({message:"user already exists"});
  }
  if (check) {
    if (check.phone_number.length == 0 && req.body.phone_number) {
      await User.updateOne(
        { email: req.body.email },
        { $set: { phone_number: req.body.phone_number } }
      );
    }
    return res.status(200).send({ msg: "succesfully joined" });
  } else {
    const num = req.body.phone_number;
    const newDoc = { email: req.body.email, phone_number: num ? num : "" };
    const result = await User.create(newDoc);
    console.log("user added " + result);
    res.status(200).json({ msg: "User successfully added" });
    sendWelcomeMail(req.body.email);
  }
});

module.exports = register;
