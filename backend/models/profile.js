const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  education: String,
  skills: [String],
  interests: [String],
  github: String,
  linkedin: String,
  leetcode: String,
  resumeUrl: String,
});

module.exports = mongoose.model('Profile', profileSchema);