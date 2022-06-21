const getRaitings = require('../functions/getRaitings');
const User = require('../models/user');

module.exports = app => {
  app.post('/getRaitings', async (req, res) => {
    const { vkId } = req.body;
    const user = await User.findOne({ vkId: vkId }).then(data => data);
    const raitings = await getRaitings(user);

    return res.json(raitings);
  });
};
