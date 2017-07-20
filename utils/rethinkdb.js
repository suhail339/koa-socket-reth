var dash = require('rethinkdbdash'),
con = require('config'),
 dbConfig = con.get('DemoRide.dbConfig');

var config = {};
config.rethink = {
    host : dbConfig.host,
    port : dbConfig.port,
    db   : dbConfig.dbName,
    //authKey: dbConfig.authKey,
    //pingInterval: 60
};

var r;

module.exports = function(options) {
    //console.log('options are');
    //console.log(options);

    if (!r) {
        options = options || config.rethink;
        r = dash(options);
    }
    return r;
};
