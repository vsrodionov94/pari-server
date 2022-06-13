const checkUser = require('./checkUser');
const getRaitings = require('./getRaitings');
const tryHitting = require('./tryHitting');

module.exports = app => {
  checkUser(app);
  getRaitings(app);
  tryHitting(app);
};
