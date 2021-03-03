const { Router } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const router = Router();

const userScheme = new Schema(
  {
    user: { type: String, required: true },
    difficulty: { type: String, required: true },
    result: { type: String, required: true },
  },
  { collection: 'userresult' }
);
const UserResult = mongoose.model('UserResult', userScheme);
const GetUserResult = mongoose.model('GetUserResult', userScheme);
router.post('/', async (req, res) => {
  try {
    const { user, difficulty, result } = req.body;

    const userResult = new UserResult({
      user: user,
      difficulty: difficulty,
      result: result,
    });

    await userResult.save();
    res.status(201).json({ message: 'result added' });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { message } = req.body;
    await GetUserResult.find(function (err, userresults) {
      if (err) return console.error(err);

      res.status(201).json({ userresults });
    });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

module.exports = router;
