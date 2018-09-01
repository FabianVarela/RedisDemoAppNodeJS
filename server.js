var redis = require("redis");
var bluebird = require("bluebird");
require('dotenv').config();

var testConnection = require('./src/testConnection');

async function init() {
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);

    var client = redis.createClient(process.env.REDISCACHEPORT, process.env.REDISCACHEHOSTNAME, {
        auth_pass: process.env.REDISCACHEKEY,
        tls: {
            servername: process.env.REDISCACHEHOSTNAME
        }
    });

    await testConnection.testCache(client);
}

init();
