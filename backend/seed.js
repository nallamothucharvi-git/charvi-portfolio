require('dotenv').config();

const mongoose = require('mongoose');
const Profile = require('./models/profile');

async function seedProfile() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Set MONGO_URI in your environment.');
    }

    await mongoose.connect(process.env.MONGO_URI);

    const profile = {
      name: 'Charvi Nallamothu',
      email: 'nallamothucharvi@gmail.com',

      education:
        'B.Tech in Artificial Intelligence and Machine Learning at VNR VJIET, 2025–2029.',

      skills: [
        'C',
        'JavaScript',
        'Python basics',
        'HTML basics',
        'CSS basics',
        'React basics',
        'Tailwind CSS basics',
        'Node.js',
        'Express',
        'MySQL',
        'MongoDB',
      ],

      interests: [
        'Web development',
        'Machine learning',
        'Mathematical problem-solving',
      ],

      github: 'https://github.com/nallamothucharvi-git',

      linkedin:
        'https://www.linkedin.com/in/charvi-nallamothu-173516372/',

      leetcode: 'https://leetcode.com/u/CharviNallamothu/',

      resumeUrl: '/resume.pdf',
    };

    await Profile.findOneAndUpdate(
      { email: profile.email },
      { $set: profile },
      {
        upsert: true,
        runValidators: true,
      }
    );

    console.log('Profile saved successfully!');
  } catch (error) {
    console.error('Unable to save profile:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProfile();