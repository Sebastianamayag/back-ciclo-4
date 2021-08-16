const express = require("express");
const { Libros,Authors,Categorias,Editorial } = require("../bd/Sequealize");
const fileupload=require('express-fileupload');
const app = express();
const cloudinary=require('cloudinary').v2;
app.use(fileupload({useTempFiles:true}))

cloudinary.config({
    cloud_name:'dczyyaphf',
    api_key:'658536749842136',
    api_secret:'AAyKOJD_W-Gd2qMZ2tVUDczuN-Y'
})

app.get("/libros",async(req,res)=>{
    Libros.findAll({ include: [{ model: Authors }, { model: Categorias }, { model: Editorial }],attributes: {exclude: ['AuthorId','CategoryId','EditorialId']} })
  .then((libros) => {
    res.status(200).json({  libros });
  });
})
app.get("/libros/:id",async(req,res)=>{
    if(req.params.id){
        const libros=await Libros.findOne({where:{id:req.params.id},include: [{ model: Authors }, { model: Categorias }, { model: Editorial }],attributes: {exclude: ['AuthorId','CategoryId','EditorialId']}})
        if(libros){
            res.status(200).json({products: libros});
        }
        else{
            res.status(400).json({ "error": `No se ha encontrado el libro con el id: ${req.params.id}` })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.post("/libro",async(req,res)=>{
    if(req.body.titulo && req.body.ano && req.body.descripcion && req.body.precio && req.body.cantidad && req.body.imagen){
        Libro.create(req.body);
        res.status(200).json({success:"Libro creado correctamente"});    
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.post("/producto/imagen",async(req,res)=>{
    if(req.files.imagen){
        const file=req.files.imagen;
        cloudinary.uploader.upload(
            file.tempFilePath,function(err,result){
                if(result){
                    res.status(200).json({success:"Imagen cargada correctamente",img:result.url});
                }else{
                    res.status(400).json({ error: 'No se ha podido cargar la imagen' })
                }
            }
        )
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }

})

app.put("/libro/:id",async(req,res)=>{
    if(req.params.id){
        if(req.body.precio && req.body.cantidad){
            const libros=await Libros.findOne({where:{id:req.params.id}})
            if(libros){
                Libros.update(
                    {
                        precio: req.body.precio,
                        cantidad: req.body.cantidad,
                        // imagen:req.body.imagen
                    },
                    { 
                        where: 
                        {
                            id: req.params.id
                        }
                    }
                ).then(() => { res.json({ mensaje:'Libro actualizado'});}
                ).catch((error) => { res.status(400).json({ error});})
            }
            else{
                res.status(400).json({ "error": `No se ha encontrado el libro con el id: ${req.params.id}` })
            }
        }else{
            res.status(400).json({ error: 'Todos los campos deben estar llenos' })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.delete("/libro/:id",async(req,res)=>{
    if(req.params.id){
        const libros = await Libros.findOne({ where: { id: req.params.id } });
        if(libros){
            libros.destroy().then(() => {
                res.status(200).json({ mensaje: "Libro Eliminado" });
            });
        }
        else{
            res.status(400).json({error:"No se ha podido encontrar el libro"});
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

module.exports=app;