const dbHelper = require('../utils/dbHelpers');

exports.get = ((req, res) => {
  const username = req.params;
  console.log('4', username);
  dbHelper.getUser(username)
    .then((userData) => res.send(userData))
    .catch((err) => res.send(err));
});

exports.post = ((req, res) => {
  const userData = req.body;
  const username = req.params.user;

  dbHelper.addUser(username, userData)
  .then((user) => res.send(user))
  .catch((err) => res.send(err));
});