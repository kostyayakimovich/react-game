const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: { type: String, required: true },
  difficulty: { type: String, required: true },
  result: { type: String, required: true },
});

module.exports = model('resultUser', schema);
