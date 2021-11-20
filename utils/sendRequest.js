
const axios = require('axios');

async function triggerRequest(method, url, headers, data){
    return await axios({ method, url, data, headers });
}

module.exports = {
  triggerRequest
}

