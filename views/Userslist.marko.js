function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __shared_home_layout_marko = __loadTemplate(require.resolve("./shared/home/layout.marko"), require),
      __renderer = __helpers.r,
      ___node_modules_marko_layout_use_tag_js = __renderer(require("marko-layout/use-tag")),
      __tag = __helpers.t,
      ___node_modules_marko_layout_put_tag_js = __renderer(require("marko-layout/put-tag")),
      forEach = __helpers.f,
      escapeXml = __helpers.x;

  return function render(data, out) {
    __tag(out,
      ___node_modules_marko_layout_use_tag_js,
      {
        "template": __shared_home_layout_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ___node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<table class="table table-bordered"><tbody><tr><th>Phonenumber</th><th>First Name</th><th>Last Name</th></tr>');

              forEach(data.userlist, function(user) {
                out.w('<tr><td>' +
                  escapeXml(user.phoneNumber) +
                  '</td><td>' +
                  escapeXml(user.firstName) +
                  '</td><td>' +
                  escapeXml(user.lastName) +
                  '</td></tr>');
              });

              out.w('</tbody></table>');
            });

          out.w('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script><script>\n\n               var VJLT = VJLT || {};\n              VJLT.isDesktopNotification  = false;\n\n              VJLT.notifyTest = function (msg) {\n                // Let\'s check if the browser supports notifications\n                if (!("Notification" in window)) {\n                  alert("This browser does not support desktop notification");\n                }\n\n                // Otherwise, we need to ask the user for permission\n                else if (Notification.permission !== "denied") {\n                  Notification.requestPermission(function (permission) {\n                    // If the user accepts, let\'s create a notification\n                    if (permission === "granted") {\n                      VJLT.isDesktopNotification = true;\n                      var notification = new Notification(\'desktop notifications enabled\');\n                    }\n                  });\n                }\n                // At last, if the user has denied notifications, and you\n                // want to be respectful there is no need to bother them any more.\n              };\n              VJLT.notifyMe = function (msg) {\n                // Let\'s check whether notification permissions have already been granted\n                if (Notification.permission === "granted") {\n                  // If it\'s okay let\'s create a notification\n                  var notification = new Notification(msg, {\n                    icon: \'\',\n                  });\n                  console.log(notification);\n                }\n              };\n\n              VJLT.IO = function (){\n                var api = {};\n                var socketConfig = {\n                                      \'reconnection\': true,\n                                      \'reconnectionDelay\': 500,\n                                      \'reconnectionAttempts\': 10\n                                    };\n                var socket;\n                var lastJourneyID;\n                api.refresh =  function (){\n                    socket.emit("clientMsg", "hello from client:"+ socket.id);\n                    setTimeout(api.refresh, 50000);\n                };\n                api.init =  function (){\n                  socket = io(\'http://localhost:3000/\', socketConfig);\n\n                  socket.on(\'connect\', function(data){\n                    console.log("on connect", data);\n                    socket.on(\'users_count\', function(data){\n                      console.log("Connection", data);\n                    });\n                  });\n\n                  socket.on(\'journey:created\', function(msg){\n                    console.log("about to work plz :created");\n                    var pName, rideType;\n                    console.log(msg);\n                    if(msg.old_val !== null && msg.new_val === null){\n                      pName = msg.old_val.passenger.name;\n                      if(pName === undefined || pName === \'\'){\n                        pName = msg.old_val.passenger.userId;\n                      }\n\n                      rideType = msg.old_val.rideType;\n                      if (VJLT.isDesktopNotification && (lastJourneyID !== msg.old_val.id)) {\n                        VJLT.notifyMe(pName + " requested "+ rideType);\n                        lastJourneyID = msg.old_val.id;\n                      }\n                    }\n                  });\n                  setTimeout(this.refresh, 50000);\n\n\n                };\n\n                return api;\n              };\n              VJLT.notifyTest(\'Live journey Tracking on\');\n              //VJLT.notifyMe(\'Live journey Tracking on\');\n              VJLT.IO().init();\n            </script>');
        },
        "*": {
          "name": data.Uname,
          "profileimage": data.profileImage
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);