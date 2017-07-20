var _ = require('lodash'),
    r = require('../utils/rethinkdb')(),
    bcrypt = require('co-bcryptjs');

var SCHEMA = ['phoneNumber','createdAt','drivingMode', 'drivingLicense'],
    TABLE = 'users';

var User = function(options) {
    this.init();
    _.assign(this, options);
}

//Admin functons starting from now
User.getAllUsers = function*() {
   var  result;
   result = yield r.table(TABLE).orderBy(r.desc('createdAt')).run();
   return result;
   //console.log('resultssss/////////////////');
   //console.log(result);
   //console.log('resultssss/////////////////');
};


module.exports = User;
