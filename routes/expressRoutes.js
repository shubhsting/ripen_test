const registerHandler = require("./registerHandler");
const errorMiddleware = require("../middleware/errorMiddleware");
const validateRouter = require("./validateRoutes");
const { User } = require("../models/user");
const { User_Event } = require("../models/user_events");

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

  app.get("/users/utm_source/:utm/event/:event",async(req,res)=>{
    try{
      const utm_source = req.params.utm;
      const event = req.params.event;
      const user_event = await User_Event.findOne({utm_source:utm_source,event:event});
      if(user_event) {
        return res.status(200).send({"count":user_event.count,msg:"Number of users of this event"})
      }

      return res.status(200).send({count:0,msg:"No users of this event found"})
    } catch(e){
      res.status(400).send(e);
    }
  })

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

    app.get("/users/update/phone/:phone",async(req,res)=>{
      try{
        const phone = req.params.phone;
        const user = await User.findOne({
          phone_number: phone
        })
       
        if(user) {
          await User.updateOne(
            { phone_number: phone },
            { $set: { is_verified: false } }
          );
          return res.status(200).json({msg: "user updated!" });
        }
        res.status(200).json({ msg: "user not found!" });
      }
      catch(e){
        res.status(400).send(e);
      }
    
      })
  


      app.get("/users/update/email/:email",async(req,res)=>{
        try{
          const email = req.params.email;
          const user = await User.findOne({
            email: email
          })
          if(user) {
            await User.updateOne(
              { email: email },
              { $set: { is_verified: false } }
            );
            return res.status(200).json({msg: "user updated!" });
          }
          res.status(200).json({ msg: "user not found!" });
        }
        catch(e){
          res.status(400).send(e);
        }
      
        })
  app.use(errorMiddleware);
};
