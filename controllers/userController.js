const { verifyOTPApi, sendOTPApi, resendOTPApi } = require("../constants/msg91");
const { User } = require("../models/user");
const moment = require('moment');
const { triggerRequest } = require("../utils/sendRequest");
const { User_Event } = require("../models/user_events");

async function verifyOTP(req,res) {
    try{
        const { phone, otp } = req.body;
        let url = verifyOTPApi(phone,otp);
        console.log(url);
        const response = await triggerRequest('get',url);
        const { type } = response.data;
        if(type === "success"){
            await User.updateOne(
                { phone_number: phone },
                { $set: { is_verified: true } }
            );
        }
        res.status(200).send(response.data);
    }
    catch(e){
        res.status(200).send({type:"error",message:e});
    }
}


async function sendOTP(req,res) {
    try{
        console.log("hrllo");
        const { phone } = req.body;
        let user = await User.findOne({ phone_number: phone });
        if(!user || user.is_verified || phone.length !== 10) return res.status(200).send({info:"error",message:"Already verified user or Invalid attempt"});
        if(user.ts && parseInt(user.ts) > moment().subtract(25,'seconds').valueOf()) return res.status(200).send({info:"error",message:"Kindly retry after 20 seconds"});
        const url = sendOTPApi(phone);
        const response = await triggerRequest('get',url);
        const { type } = response.data;
        if(type === "success"){
            await User.updateOne(
                { phone_number: phone },
                { $set: { ts: moment().valueOf() } }
            );
        }
        res.status(200).send(response.data);
    }
    catch(e){
        res.status(200).send({type:"error",message:e});
    }
}


async function resendOTP(req,res) {
    try{
        const { phone } = req.body;
        let user = await User.findOne({ phone_number: phone });
        if(!user || user.is_verified || phone.length!=10) return res.status(200).send({info:"error",message:"Already verified user or Invalid attempt"});
        if(user.ts && parseInt(user.ts) > moment().subtract(25,'seconds').valueOf()) return res.status(200).send({ info: "error",message:"Kindly retry after 20 seconds" });
        const url = resendOTPApi(phone);
        const response = await triggerRequest('get',url);
        const { type } = response.data;
        if(type === "success"){
            await User.updateOne(
                { phone_number: phone },
                { $set: { ts: moment().valueOf() } }
            );
        }
        res.status(200).send(response.data);
    }
    catch(e){
        res.status(200).send({type:"error",message:e});
    }
}

async function updateUserEvent(req,res) {
    try {
        const {utm_source,event} = req.body;
        if(!event) {
            return res.status(400).send("no utm source or event found");
        }
        let user = await User_Event.findOne({ utm_source: utm_source,event:event });
        if(!user){
            user = await User_Event.create({utm_source:utm_source,event:event,count:0});
        }
        s_count = user.count;
        await User_Event.updateOne(
            { utm_source:utm_source,event:event },
            { $set: { count: s_count+1 } }
          );
        res.status(200).send({message:"done"})
    } catch(e){
        res.status(200).send({type:"error",message:e});
    }
}
module.exports = {
    verifyOTP,
    sendOTP,
    resendOTP,
    updateUserEvent
}