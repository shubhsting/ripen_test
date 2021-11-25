const { verifyOTPApi, sendOTPApi, resendOTPApi } = require("../constants/msg91");
const { User } = require("../models/user");
const moment = require('moment');
const { triggerRequest } = require("../utils/sendRequest");

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
        res.status(400).send(e);
    }
}


async function sendOTP(req,res) {
    try{
        console.log("hrllo");
        const { phone } = req.body;
        let user = await User.findOne({ phone_number: phone });
        if(!user || user.is_verified || phone.length !== 10) return res.status(400).send({message:"Already verified user or Invalid attempt"});
        if(user.ts && parseInt(user.ts) > moment().subtract(25,'seconds').valueOf()) return res.status(400).send({message:"Kindly retry after 20 seconds"});
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
        res.status(400).send(e);
    }
}


async function resendOTP(req,res) {
    try{
        const { phone } = req.body;
        let user = await User.findOne({ phone_number: phone });
        if(!user || user.is_verified || phone.length!=10) return res.status(400).send({message:"Already verified user or Invalid attempt"});
        if(user.ts && parseInt(user.ts) > moment().subtract(25,'seconds').valueOf()) return res.status(400).send({ message:"Kindly retry after 20 seconds" });
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
        res.status(400).send(e);
    }
}


module.exports = {
    verifyOTP,
    sendOTP,
    resendOTP
}