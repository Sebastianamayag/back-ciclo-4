module.exports=(sequelize,type)=>{
    const Editorial=sequelize.define('Editorials',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre_editorial:{
            type:type.STRING,
            allownull:false
        }
    },{
        timestamps:false
    })
    return Editorial;
}