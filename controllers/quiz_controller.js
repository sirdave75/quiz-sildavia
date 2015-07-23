/**
 * Created by root on 9/07/15.
 */
var models = require('../models/models.js');
//autoload - factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
    models.Quiz.findById(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }else{ next(new Error('No existe quizId=' + quizId));}

        }
    ).catch(function(error){next(error);});
};

//GET /quizes

exports.index = function(req,res){

   var search ='%';
   if(req.query.search != undefined) search += (req.query.search).replace(/\s/g,'%') + '%';
    var query = {
       where:["upper(pregunta) like ?",search.toUpperCase()],
       order: 'pregunta ASC'
   };

    models.Quiz.findAll(query).then(
       function(quizes){
            res.render('quizes/index.ejs',{ quizes: quizes });
       }
   ).catch(function(error){ next(error);})
} ;

//GET /quizes/:id
exports.show = function(req,res){
   res.render('quizes/show',{ quiz: req.quiz });

};

//GET /quizes/ :id/answer
exports.answer = function(req,res){
    var resultado = 'Incorrecto';
    if(req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', { quiz:req.quiz,respuesta: resultado});

};
