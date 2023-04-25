const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require('./expressError');

app.use(express.json());


async function getGithubData(req, res, next) {
  try {
    const requests = req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`));
    const results = await Promise.all(requests);
    const out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
    req.githubData = out;
    next();
  } catch(err) {
    next(err);
  }
};

app.post('/', getGithubData, function(req, res) {
  try{
    res.send(JSON.stringify(req.githubData));
  }catch(err){
    next(err);
  }
});

//invalid route
app.use(function(req, res, next){
  const err = new ExpressError("Not found", 404);
  return next(err);
});

//error handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);

  return res.json({
      error: err.message
  });
});

app.listen(3000);