function getReply(message, profile) {
  const question = message.toLowerCase();

  if (/resume|cv/.test(question)) {
    return {
      reply: 'You can view or download Charvi’s resume here.',
      link: profile.resumeUrl,
    };
  }

  if (/github/.test(question)) {
    return {
      reply: 'Here is Charvi’s GitHub profile.',
      link: profile.github,
    };
  }

  if (/linkedin/.test(question)) {
    return {
      reply: 'Connect with Charvi on LinkedIn.',
      link: profile.linkedin,
    };
  }

  if (/leetcode|coding profile/.test(question)) {
    return {
      reply: 'Here is Charvi’s LeetCode profile.',
      link: profile.leetcode,
    };
  }

  if (/skill|technolog|language/.test(question)) {
    return {
      reply: `Charvi’s skills include: ${profile.skills.join(', ')}.`,
    };
  }

  if (/education|college|study|studying|degree/.test(question)) {
    return { reply: profile.education };
  }

  if (/interest|hobb/.test(question)) {
    return {
      reply: `Charvi is interested in ${profile.interests.join(', ')}.`,
    };
  }

  if (/contact|email/.test(question)) {
    return {
      reply: `You can email Charvi at ${profile.email}.`,
      link: `mailto:${profile.email}`,
    };
  }

  if (/project/.test(question)) {
    return {
      reply:
        'Charvi is currently building this portfolio with React and Tailwind CSS, a Node.js and Express backend, and MongoDB.',
    };
  }

  if (/who|about|name/.test(question)) {
    return {
      reply: `${profile.name}. ${profile.education}`,
    };
  }

  if (/^(hi|hello|hey)\b/.test(question)) {
    return {
      reply:
        'Hello! Ask me about Charvi’s skills, education, projects, resume, or coding profiles.',
    };
  }

  return {
    reply:
      'I don’t have information about that yet. Try asking about Charvi’s skills, education, interests, resume, or profile links.',
  };
}

module.exports = getReply;