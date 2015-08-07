var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var creditosController = require('../controllers/creditos_controller');
var commentController = require('../controllers/comments_controller');
var sessionController = require('../controllers/session_controller');

//Página de entrada (home page)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz',errors: [] });
});

//Autoload de comandos ;quizId
router.param('quizId',quizController.load);//autoload :quizId
router.param('commentId',commentController.load);//autoload : commentId

//Definición de  rutas de session
router.get('/login',    sessionController.new);//formulario de session
router.post('/login',   sessionController.create);//crear session
router.get('/logout',   sessionController.destroy);//destruir session

//Definición de rutas de /quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   sessionController.loginRequired ,quizController.new);
router.post('/quizes/create',               sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',         sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',      sessionController.loginRequired, quizController.delete);

//Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',     commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',        commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',   sessionController.loginRequired,commentController.publish        );

router.get('/creditos/author',creditosController.author);

module.exports = router;
