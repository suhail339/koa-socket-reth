var marko = require('marko');
var logger = require('./logger');

var errorHandler = function(that, status) {
    var log = logger();
    switch (status) {
        case 404:
            console.log("Http 404");
            log.info("Http 404 not found");
            that.body = marko.load('./views/error_404.marko').stream();
            break;
        case 500:
            console.log("Http 500");
            log.info("error occured whie processing your request");
            that.body = marko.load('./views/error_500.marko').stream();
            break;
        default:
            console.log("defulat status"+ status);        
            log.info("Internal error from server");
            that.body = marko.load('./views/error.marko').stream();
    }
    that.type = 'html';
};
module.exports = errorHandler;
