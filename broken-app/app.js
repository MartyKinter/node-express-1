const express = require('express');
const axios = require('axios');
const app = express();


async function getGithubData(req, res, next) {
  try {
    const results = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));
    const out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
    req.githubData = out;
    next();
  } catch(err) {
    next(err);
  }
};

app.post('/', getGithubData, function(req, res) {
  res.send(JSON.stringify(req.githubData));
});


app.listen(3000);