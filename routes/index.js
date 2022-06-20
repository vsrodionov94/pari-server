const checkUser = require('./checkUser');
const getRaitings = require('./getRaitings');
const setTeam = require('./setTeam');
const tryHitting = require('./tryHitting');

module.exports = app => {
  checkUser(app);
  getRaitings(app);
  tryHitting(app);
  setTeam(app);
};
