const axios = require("axios").create();
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
module.exports = axios;
