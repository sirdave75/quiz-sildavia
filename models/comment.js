/**
 * Created by sirdave on 5/08/15.
 */
//Definición del modelo de Comment con validación
module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'Comment',
        {
            texto:{
                type: DataTypes.STRING,
                validate: {notEmpty:{mes: "-> Falta Comentario"}}
            }
        }
    );
}
