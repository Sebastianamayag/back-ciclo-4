module.exports=(sequelize,type)=>{
    const Author=sequelize.define('Authors',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombres:{
            type:type.STRING,
            allownull:false
        }
    },{
        timestamps:false
    })
    return Author;
}