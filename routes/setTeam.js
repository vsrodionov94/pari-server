const User = require('../models/user');

module.exports = app => {
  app.post('/setTeam', (req, res) => {
    const { vkId, team } = req.body;
    const result = {
      error: false,
      success: false,
      attempts: 0,
    };

    const user = User.findOne({ vkId: vkId }).then(data => data);
    if (user) {
      User.updateOne({ vkId: vkId, team: team }).then(() => null);
    } else {
      result.error = true;
    }
    return res.json(result);
  });
};
