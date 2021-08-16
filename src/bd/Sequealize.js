const Sequelize=require('sequelize');
//import de los modelos
const Model_Authors=require('../models/Authors');
const Model_Cetegorias=require('../models/Categorias');
const Model_Editorial=require('../models/Editorial');
const Model_Libros=require('../models/Libros');
//configuracion de la url de la bd
const sequelize = new Sequelize('bthjfpyzlqydbsyf8auc', 'ufxcucgalo6k3kjr', 'degpTjWVXq2sXkMjeDMo', {
    host: 'bthjfpyzlqydbsyf8auc-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});
//creando la tablas tablas
const Authors=Model_Authors(sequelize,Sequelize);
const Categorias=Model_Cetegorias(sequelize,Sequelize);
const Editorial=Model_Editorial(sequelize,Sequelize);
const Libros=Model_Libros(sequelize,Sequelize);
//FK
Authors.hasMany(Libros)
Libros.belongsTo(Authors);
Categorias.hasMany(Libros)
Libros.belongsTo(Categorias);
Editorial.hasMany(Libros)
Libros.belongsTo(Editorial);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })
module.exports={
    Authors,
    Categorias,
    Editorial,
    Libros
}
