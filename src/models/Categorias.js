module.exports=(sequelize,type)=>{
    const Category=sequelize.define('Categories',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        tipo:{
            type:type.STRING,
            allownull:false
        }
    },{
        timestamps:false
    })
    return Category;
}