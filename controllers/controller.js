var db = require("../models");

module.exports = {
  subjectExample:{subject: "Mathematics"},
  topicExample: {topic: "Algebra", SubjectId: 1},
  subtopicExample: {subtopic: "Early Algebra", TopicId: 1},
  testExample: {testname: 'Early Algebra Level 1' , SubtopicId: 1},
  questionExample: {
    question: "Solve the equation sin(x) = 0",
    answer1: "x = PN",
    answer2: "x = P/2 + 2PN",
    answer3: "x = 3P/2 + 2PN",
    answer4: "x = P +  2PN",
    correctAnswer: 2,
    TopicId: 7
  },
  createSubject: function(req, res){
    db.Subject.create(req).then(function(result) {
      res.json(result)
    });
  },
  createTopic: function(req, res){
    db.Topic.create(req).then(function(result) {
      res.json(result)
    });
  },
  createQuestion: function(req, res){
    db.Question.create(req).then(function(result) {
      res.json(result)
    });
  },
  getSubjectsListJSON: function(req, res){
    db.Subject.findAll({}).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    });
  },
  getSubjectsHTML(req ,res) {
    db.Subject.findAll({}).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      res.render("index", {
        subjects: resultArr
      });
      console.log(resultArr)
      return resultArr;
    });
  },
  getTopicsHTML(req ,res) {
    db.Topic.findAll({
      where: {SubjectId: req}
    }).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      res.render("topics", {
        topics: resultArr
      });
      console.log(resultArr)
      return resultArr;
    });
  },
  getQuestionsHTML(req ,res) {
    db.Question.findAll({
      where: {TopicId: req}
    }).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      res.render("test", {
        questions: resultArr
      });
      console.log(resultArr)
      return resultArr;
    });
  },
  getTopicsList: function(req, res){
    db.Topic.findAll({}).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    });
  },
  getSubjectId: function(req, res, id){
    db.Subject.findAll({
      where: {
        id: id
      }
    }).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    });
  },
  getTopicsListId: function(req, res, id){
    db.Topic.findAll({
      where: {
        SubjectId: id
      }
    }).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    });
  },
  getSubtopicsList: function(req, res){
    db.Subtopic.findAll({}).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    });
  },
  getTestsList: function(req, res){
    db.Test.findAll({}).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    }); 
  },
  findQuestionsWithTestId: function(req, res){
    db.Question.findAll({
      where: {
        TopicId: req
      }
    }).then((result) => {
      let resultArr = [];
      
      result.forEach((item) => {
        resultArr.push(item.dataValues)
      })
      console.log(resultArr);
      res.json(resultArr);
    });
  }
};
