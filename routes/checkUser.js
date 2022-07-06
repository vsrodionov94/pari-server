const User = require('../models/user');
const constants = require('../data/constants');
const Statistics = require('../classes/Statistics');
const { checkDaily } = require('../functions/utils');

module.exports = app => {
  app.post('/checkUser', async (req, res) => {
    const { vkId, name } = req.body;
    const result = {
      team: 0,
      points: 0,
      attempts: constants.ATTEMPTS_COUNT,
    };

    const user = await User.findOne({ vkId: vkId }).then(data => data);
    const time = Math.round(new Date().getTime() / 1000);

    if (user) {
      result.team = user.team;
      result.points = user.points;
      if (time < process.env.END_TIME) {
        result.attempts = checkDaily(user);
      }
    } else {
      User.create({ vkId: vkId, name: name, time: time }).then(() => null);
    }
    Statistics.incGamesCount();
    return res.json(result);
  });
};
