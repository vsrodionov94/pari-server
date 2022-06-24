const User = require('../models/user');
const { randomInt } = require('../functions/utils');
const constants = require('../data/constants');
const Statistics = require('../classes/Statistics');

module.exports = app => {
  app.post('/tryHitting', async (req, res) => {
    const { vkId, target } = req.body;
    const result = {
      error: false,
      success: false,
      points: 0,
      attempts: 0,
    };

    const user = await User.findOne({ vkId: vkId }).then(data => data);
    if (user && user.attempts > 0) {
      const random = randomInt(0, 100);
      const success = random <= constants.PERCENTS[target];

      result.success = success;
      result.points = success ? user.points + constants.AWARD[target] : user.points;
      result.attempts = success ? user.attempts : user.attempts - 1;
      User.updateOne({ vkId: vkId }, {
        $set: {
          points: result.points,
          pointsTime: success ? parseInt(new Date().getTime() / 1000, 10) : user.pointsTime,
          attempts: result.attempts,
        },
      }).then(() => null);
      if (result.attempts === 0) {
        Statistics.incEndGamesCount();
      }
    } else {
      result.error = true;
    }
    return res.json(result);
  });
};
