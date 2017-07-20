var bunyan = require('bunyan');

var logger = function() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var filename = './log/log_' + dd + '-' + mm + '-' + yyyy + '.json';
    var bunyanOpts = {
        name: 'Vheellogging',
        streams: [{
            level: 'info',
            path: filename // log ERROR and above to a file
        }]
    };
    var log = bunyan.createLogger(bunyanOpts);
   	return log;
};

module.exports = logger;
