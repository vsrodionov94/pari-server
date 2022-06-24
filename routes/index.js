const checkUser = require('./checkUser');
const getRaitings = require('./getRaitings');
const setTeam = require('./setTeam');
const tryHitting = require('./tryHitting');
const getStats = require('./getStats');

module.exports = app => {
  checkUser(app);
  getRaitings(app);
  tryHitting(app);
  setTeam(app);
  getStats(app);
};
