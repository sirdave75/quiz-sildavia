var users = {
                admin:{id:1,username:"admin",password:"1234"},
                sirDave:{id:2,username:"Dave",password:"alomejorteladigo"}
            }

//Comprueba si el usuario esta registrado en users
//Si auteticacion falla o hay errrores se ejecuta callback(error).

exports.autenticar = function(login,password, callback){
    if(users[login]){
        if(password === users[login].password){
            callback(null,users[login]);
        }
        else{
            callback(new Error('Password erroneo.'));
        }
    }
    else{
        callback(new Error('No exite el usuario.'));
    }
};
