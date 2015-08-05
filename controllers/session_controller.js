//MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req,res){
    if(req.session.users){
        next();
    }
    else{
        res.redirect('/login');
    }
};

//GEt /login --Formulario de login
exports.new = function(req, res){
  var errors = req.session.erros || {};
    req.session.errors = {};
    res.render('sessions/new' , {errors : errors});
};

//POST /login -- CRear la session
exports.create = function(req,res) {
    var login = req.body.login;
    var password = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function (error, user) {
        if (error) {
            req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
            res.redirect("/login");
            return;
        }
        //Crear la req.session.user y guardar los campos id y username
        //La session se define por la existencia de: req.session.user
        req.session.user = {id: user.id, username: user.username};
        res.redirect(req.session.redir.toString());//redireccionamos al path anterior a login
    });
}

//Delete / logout -- Destruir session

exports.destroy = function(req, res){
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};

