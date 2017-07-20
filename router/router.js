var router = require('koa-router');
var userRoute = require('./user/userrouter');
var route = new router();
var secureRoute = new router();
var passport = require('koa-passport');

module.exports.initializeRoutes = function(app, passport, io) {

    //console.log("app:",app);
    userRoute.Routes(route, secureRoute, passport, app, io);

    app.use(route.routes());

    //securing
    app.use(function*(next) {
        //console.log(this);
            //console.log("mw said auth");
            yield next;

    });

    app.use(secureRoute.routes());
};
