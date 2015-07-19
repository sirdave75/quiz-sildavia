/**
 * Created by sirdave on 19/07/15.
 */
/**define el formatode la tabla preguntas/
 *
 */

//defiicion del modelo de Quiz

module.exports = function(sequelize, DataTypes){
    return sequelize.define('Quiz',
        {
            pregunta : DataTypes.STRING,
            respuesta: DataTypes.STRING
        });
}