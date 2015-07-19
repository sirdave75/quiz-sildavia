var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var creditosController = require('../controllers/creditos_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);

router.get('/creditos/author',creditosController.author);

module.exports = router;
