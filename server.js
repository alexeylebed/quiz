require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var request = require('request');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };
var config = [
  ["Mathematics", 19],
  ["Biology", 17],
  ["English", 9],
  ["Geography", 22],
  ["Physics", 30],
  ["History", 23],
  ["Computer", 18],
  ["Chemistry", 17],
  ["Literature", 10],
];


function putJSON(result , topic){
   for(i = 0; i < 5; i++){
     if(result[i] != undefined){
       var newQuestion = {
         question: result[i].question,
         answer1: result[i].incorrect_answers[0],
         answer2: result[i].incorrect_answers[1],
         answer3: result[i].incorrect_answers[2],
         answer4: result[i].correct_answer,
         correctAnswer: 4,
         TopicId: topic
       }
        db.Question.create(newQuestion).then(function(result) {
          console.log('question created');
          i++;
        });
     };
   };
};

function loadQuestions(){
  db.Topic.findAll({}).then((result) => {
    let resultArr = [];
    
    result.forEach((item) => {
      resultArr.push(item.dataValues)
    });
    resultArr.forEach((topic) =>{
      request({
        method: 'GET',
        url: "https://opentdb.com/api.php?amount=5&category=19&type=multiple"
      }, function(req, res, body){
          let result = JSON.parse(body).results;
          console.log(topic.id)
          putJSON(result , topic.id);
      });
  
    });
  });
  console.log('questions loaded')
};

app.get("/load", function(req, res) {
  loadQuestions();
});




db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
