/**
 * Created by sirdave on 19/07/15.
 */
//Construye la DB y el modelo importando (quiz.js) sequelize.sync() construye la DB según define el modelo

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:pot/database
// SQlite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  =  process.env.DATABASE_STORAGE ;


//Cargar le modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQlite o Postgres:

var sequelize = new Sequelize(DB_name,user,pwd,
                        {dialect:   protocol,
                         storage:   protocol,
                         port:      port,
                         host:      host,
                         storage:   storage, //solo SQlite (.env)
                         omitNull:  true   //solo Postgres
                        }
                    );

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz  = Quiz;//Exportar definición de tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas en BD
sequelize.sync().then(function(){

    //then(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count){
        if(count === 0){
            //la tabla se inicializa solo si está vacía
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma',
                tema: 'geografia'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa',
                tema: 'geografia'
            })
            .then(function(){console.log('Base de datos inicializada');});
        }
    });
});