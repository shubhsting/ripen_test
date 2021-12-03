const registerHandler = require("./registerHandler");
const errorMiddleware = require("../middleware/errorMiddleware");
const validateRouter = require("./validateRoutes");
const { User } = require("../models/user");

exports.expressRoutes = (app) => {
  app.use("/api/auth/register", registerHandler);
  app.use("/api/otp",validateRouter);
  
  app.get("/users/count", async (req, res) => {
    try{
    const count = await User.count();
    return res.status(200).json({ count:count,msg: "Total users" });
    }
    catch(e){
      res.status(400).send(e);
    }
  });

  app.get("/users/email/:email",async(req,res)=>{
  try{
    const email = req.params.email;
    const user = await User.findOne({
      email: email
    })
    if(user) {
      return res.status(200).json({ user:user,msg: "user found!" });
    }
    res.status(200).json({ msg: "user not found!" });
  }
  catch(e){
    res.status(400).send(e);
  }

  })


  app.get("/users/phone/:phone",async(req,res)=>{
    try{
      const phone = req.params.phone;
      const user = await User.findOne({
        phone_number: phone
      })
      if(user) {
        return res.status(200).json({ user:user,msg: "user found!" });
      }
      res.status(200).json({ msg: "user not found!" });
    }
    catch(e){
      res.status(400).send(e);
    }
  
    })


  app.use(errorMiddleware);
};
