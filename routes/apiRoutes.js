var controller = require('../controllers/controller.js')
module.exports = function(app) {
  app.get("/createSubject/:subjectName", function(req, res) {
    controller.createSubject({ subject: req.params.subjectName }, res);
  });

  app.get("/createTopic/:subjectId/:topicId", function(req, res) {
    let newTopic = {topic:req.params.topicId , SubjectId: req.params.subjectId};
    controller.createTopic(newTopic, res);
  });

  app.get("/createSubtopic", function(req, res) {
    controller.createSubtopic(controller.subtopicExample, res);
  });

  app.get("/createTest", function(req, res) {
    controller.createTest(controller.testExample, res);
  });

  app.get("/createQuestion", function(_req, res) {
    controller.createQuestion(controller.questionExample, res);
  });

  app.get("/getSubjectsListJSON", function(req, res) {
    controller.getSubjectsListJSON(req, res);
  });

  app.get("/getSubjectIdJSON/:subjectId", function(req, res, id) {
    controller.getSubjectId(req, res, req.params.subjectId);
  });
 
  app.get("/getTopicsList", function(req, res) {
    controller.getTopicsList(req, res);
  });

  app.get("/getTopicsListId/:topicid", function(req, res) {
    controller.getTopicsListId(req, res, req.params.topicid);
  });

  app.get("/getSubtopicsList", function(req, res) {
    controller.getSubtopicsList(req, res);
  });

  app.get("/getTestsList", function(req, res) {
    controller.getTestsList(req, res);
  });

  app.get("/findQuestionsWithTestId/:testid", function(req, res) {
    controller.findQuestionsWithTestId(req, res, req.params.testid);
  });

  app.get("/subject/:subjectId/topic/:topicId/JSON", function(req, res) {
    controller.findQuestionsWithTestId(req.params.topicId, res);
  });
};
