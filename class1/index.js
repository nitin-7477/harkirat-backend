const express = require('express');
const app = express();
const port = 3000;

let numberOfRequests=0;
function  calculateRequests(req,res,next) {
  numberOfRequests++;
  console.log(numberOfRequests)
  next()
}

app.get('/health-checkup', function (req, res) {
  const username = req.headers.username;
  const password = req.headers.password;
  const yourId = req.query.yourId;
  console.log('Received yourId:', yourId); // Log the value of yourId
  if (username !== 'Nitin' || password !== 'nitin') {
    return res.status(200).json({ msg: 'Something wrong with input' });
  }

  if (username === 'Nitin' && password === 'nitin') {
    if (yourId == 7477) {
      return res.status(200).json({ msg: 'You are healthy' });
    } else {
      return res.status(200).json({ msg: 'Invalid ID' });
    }
  }
});
app.get('/nitin',calculateRequests,function (req,res) {

  return res.json({msg:'hi ntiin'})
})

app.listen(port, function () {
  console.log(`Server is listening on Port ${port}`);
});
