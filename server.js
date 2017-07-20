var koa = require('koa'),
    app = module.exports = koa(),
    server = require('http').createServer(app.callback()).listen(3000);
    //fs = require('co-fs'),
    serve = require('koa-static'),
    views = require('co-views'),
    // parse = require('co-body'),
   // router = require('koa-router'),
    compress = require('koa-compress'),
    //fo = require('fs'),
    marko = require('marko'),
    passport = require('koa-passport'),
    logger = require('./utils/logger'),
    errorHandler = require("./utils/errorhandler.js");
var flash = require('koa-connect-flash');
var log   = logger();
//var IO = require('koa-socket');
//var io = new IO();
var router = require('koa-router');
var io = require('socket.io')(server);

app.keys = ['your-session-secret'];

//app.use(session());
app.use(flash());
// body parser
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// authentication



//render settings
//var render = views(__dirname + '/views/');

//compression
app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));


//var route = new router();
var myrouting = require('./router/router.js');

//error handling and common points
app.use(function*(next) {
    try {

        this.stream = function (path, data) {
        //console.log("stream this.global",this.global);
        data.$global = this.global;
        return marko.load(path).stream(data);
        }

        yield next;
    } catch (err) {
        console.log("err:", err);
        console.log("catch");
        log.info(err.message);
        errorHandler(this, err.status);
        //this.app.emit('error', err, this);
    }
});


myrouting.initializeRoutes(app,passport, io);


//app.listen(process.env.PORT || 3000);

console.log("The app is listening. Port " + process.env.PORT || 3000);
