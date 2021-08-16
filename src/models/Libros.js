module.exports=(sequelize,type)=>{
    const Books=sequelize.define('Books',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        titulo:{
            type:type.STRING,
            allownull:false
        },ano:{
            type:type.INTEGER, 
            allownull:false
        },
        descripcion:{
            type:type.STRING,
            allownull:false
        },precio:{
            type:type.INTEGER, 
            allownull:false
        },
        cantidad:{
            type:type.INTEGER,
            allownull:false
        },
        imagen:{
            type:type.STRING,
            allownull:false
        }
    },{
        timestamps:false
    })
    return Books;
}