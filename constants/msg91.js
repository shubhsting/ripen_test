
function sendOTPApi(phone) {
    return `https://api.msg91.com/api/v5/otp?template_id=${process.env.TEMPLATE_ID}&mobile=91${phone}&authkey=${process.env.MSG91_AUTH_KEY}&otp_length=6`
}

function resendOTPApi(phone) {
    return `https://api.msg91.com/api/v5/otp/retry?authkey=${process.env.MSG91_AUTH_KEY}&retrytype=text&mobile=91${phone}`;
}

function verifyOTPApi(phone,otp) {
    return `https://api.msg91.com/api/v5/otp/verify?authkey=${process.env.MSG91_AUTH_KEY}&mobile=91${phone}&otp=${otp}`
}

module.exports = {
    sendOTPApi,
    resendOTPApi,
    verifyOTPApi
}