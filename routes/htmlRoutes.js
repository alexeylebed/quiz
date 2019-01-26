var path = require("path");
var controller = require("../controllers/controller");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    controller.getSubjectsHTML(req, res);
  });

  app.get("/public/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/index.js"));
  });

  //Load page with Topics
  app.get("/subject/:subjectId", function(req, res) {
    controller.getTopicsHTML(req.params.subjectId, res);
  });
  app.get("/public/js/topics.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/topics.js"));
  });

  //Load page with the Questions
  app.get("/subject/:subjectId/topic/:topicId", function(req, res) {
    //controller.findQuestionsWithTestId(req.params.topicId, res);
    controller.getQuestionsHTML(req.params.topicId, res);
  });
  app.get("/public/js/test.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/test.js"));
  });

  //Load header images
  app.get("/public/images/logo.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/logo.png"));
  });
  app.get("/public/images/avatar.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/avatar.png"));
  });
  app.get("/public/js/logo.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/logo.js"));
  });

  //Load subjects logos
  app.get("/public/images/math.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/math.png"));
  });
  app.get("/public/images/english.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/english.png"));
  });
  app.get("/public/images/biology.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/biology.png"));
  });
  app.get("/public/images/geography.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/geography.png"));
  });
  app.get("/public/images/physics.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/physics.png"));
  });
  app.get("/public/images/computer.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/computer.png"));
  });
  app.get("/public/images/history.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/history.png"));
  });
  app.get("/public/images/literature.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/literature.png"));
  });
  app.get("/public/images/chemistry.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/chemistry.png"));
  });
  app.get("/public/images/notdone.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/notdone.png"));
  });
  app.get("/public/images/checkbox_checked.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/checkbox_checked.png"));
  });
  app.get("/public/images/checkbox_unchecked.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/checkbox_unchecked.png"));
  });
  app.get("/public/images/correct.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/correct.png"));
  });
  app.get("/public/images/failed.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/failed.png"));
  });

  //Load close logo
  app.get("/public/images/close.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/close.png"));
  });
};
