const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const Message = mongoose.model('Message',{ name:String,message:String});
const dbUrl = 'mongodb://<dbuser>:<dbpassword>@ds117158.mlab.com:17158/smsnew';
app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  });
  app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      res.sendStatus(200);
    })
  });
mongoose.connect(dbUrl,(err) => {
    console.log('mongodb connected',err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);