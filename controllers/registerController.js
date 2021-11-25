const { User } = require("../models/user");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const sendWelcomeMail = require("./testemail");
const register = catchAsyncErrors(async (req, res) => {
  const check = await User.findOne({ email: req.body.email }).exec();
  const phone =req.body.phone_number;
  if(phone){
    const check2 = await User.findOne({ phone_number: phone }).exec();
    if(check2 && check2.is_verified){
      return res.status(409).send({message:"user already exists"});
    }
    else if(check2){
      await User.findOneAndDelete({
        email: req.body.email
      });
      await User.updateOne(
        { phone_number: phone },
        { $set: { email: req.body.email } }
      );
      return res.status(200).send({ msg: "succesfully joined" });
    }
  }
  
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
    res.status(200).json({ msg: "User successfully added" });
    sendWelcomeMail(req.body.email);
  }
});

module.exports = register;
