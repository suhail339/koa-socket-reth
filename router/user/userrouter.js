var marko = require('marko');
var userModel = require('./../../models/user');


var fs = require('fs');
var con = require('config');

var r = require('./../../utils/rethinkdb')();
var router = require('koa-router');
var _ = require('lodash');
var co = require('co');
var socket;
var journeyRT;

journeyRT = journeyRT || {};
journeyRT.handlers = journeyRT.handlers || {};
journeyRT.cursors = journeyRT.cursors || [];


journeyRT.handlers.journey = {
    created: function (err, cursor, io) {
        console.log("journeyCreated CF fn %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        if (err) {
            // console.log(err);
        } else {
            if (cursor) {
                //  adding cursor to array for closing on disconnects event on socket
                socket.cursors.push(cursor);
                // console.log("myCursor", cursor);
                cursor.each(function (errCursor, record) {
                    if (errCursor) {
                        console.log("error in cf cursor hit");
                        // console.log(err);
                    } else {
                      // console.log("created:", record);
                        //console.log("io:", io);
                        //console.log("socket id:", socket.id);
                        //console.log("socket rooms:", socket.rooms);
                        // console.log("socket client:", socket.client);
                        // console.log(socket.id);
                        // socket.emit('journey:created', record);
                        io.sockets.emit('journey:created', record);
                        // socket.broadcast.emit('journey:created', record);
                        //socket.to('journey_created').emit('journey:created', record);
                    }
                });
                // return cursor;
            }
        }
    },



};

journeyRT.changeFeeds = function* (io) {
  // console.log('inside cf fn', io);

    var api = {
        Journey: {
            init: function* () {
                // console.log("journeyCF init called");
                yield this.createdTotalCF();
            },
            createdTotalCF: function* () {
              console.log('my io:', io);
              //journeyRT.handlers.journey.io = io;
                // console.log("dropTotalCF fn called");
                yield r.table('onlineDrivers').changes()
                .run(function (err, cursor){
                  console.log('cursor inside anon fn');
                  // console.log(io);
                  return journeyRT.handlers.journey.created(err, cursor, io);
                });
                // console.log("journeyCF called end");
            },


        },

    };

    yield api.Journey.init();

};


module.exports.Routes = function(public, secure, passport, app, io) {
    public.get('/users', Userslist);
    //public.post('/users', searchUser);

    //sockets
    // console.log("testing if app.io available:", io);
    io.on('connection', function(client){
      console.log('######## Socket connected ############');
      socket = client;
      var totalClients = io.sockets.clients();
      // console.log('total sockets:', totalClients);
      socket.cursors = [];
      // console.log(socket);

          co(function* () {
              // console.log("feeds io:", io);
              yield journeyRT.changeFeeds(io);
          });

          socket.on('clientMsg', function (data) {
              console.log('client msg fn invoked');
              console.log('clent data:', data);

          });

          socket.on('disconnect', function () {
              console.log('close connecitons');
              console.log('user disconnected');
              //console.log(client);
              console.log('cursors length:', journeyRT.cursors.length);

              //  console.log(hqDashBoard.cursors);
              socket.cursors.forEach(function (c) {
                  if (c) {
                      // console.log("cursor for changefeed is :", c);
                      //  console.log("cursor type:", typeof(c));
                      //console.log("cursor type:", typeof(c.close));
                      c.close();
                      // console.log("cursor for changefeed is :", c);

                  }
              });
              journeyRT.cursors = [];
              console.log('closing cursors length:', journeyRT.cursors.length);
              //  socket = undefined; //checking fix
          });
    });
    // io.on('connection', (ctx) => {
    //     console.log('######## Socket connected ############');

    //     //  setting up socket and changefeeds
    //     socket = ctx.socket;
    //     co(function* () {
    //         yield journeyRT.changeFeeds(r);
    //     });


    //     ctx.socket.on('disconnect', function () {
    //         console.log('close connecitons');
    //         console.log('user disconnected');
    //         console.log('cursors length:', journeyRT.cursors.length);

    //         //  console.log(hqDashBoard.cursors);
    //         journeyRT.cursors.forEach(function (c) {
    //             if (c) {
    //                 // console.log("cursor for changefeed is :", c);
    //                 //  console.log("cursor type:", typeof(c));
    //                 //console.log("cursor type:", typeof(c.close));
    //                 c.close();
    //                 // console.log("cursor for changefeed is :", c);

    //             }
    //         });
    //         journeyRT.cursors = [];
    //         console.log('closing cursors length:', journeyRT.cursors.length);
    //         //  socket = undefined; //checking fix
    //     });
    // });

};


var Userslist = function*() {
    console.log('now entered');
    var data = new Object();
    var users = yield userModel.getAllUsers();
    data.userlist = users;
    console.log('users');
    console.log(users);
    /*,abc,
        type='passenger';
        var obj = this.request.body;
        console.log("obj:",obj);
    var countusers = yield userModel.countUsers();
    console.log("counting successfull", countusers);
    var pager = yield generatePaging(abc, countusers,pagingMaxLimit);
    console.log("pager", pager);
    var users = yield userModel.getAllUsers(pager.skip, pager.pagesize);
    data.userlist = users;
    data.pageNumber = pager.pageNumber;
    data.TotalPages = pager.TotalPages;
    data.filterBy = 'all';*/
    //this.body = marko.load("./views/Userslist.marko").stream(data);
    //this.body = this.stream('./views/Userslist.marko', data);;
    this.body = this.stream('./views/Userslist.marko', data);
    this.type = 'text/html';
};