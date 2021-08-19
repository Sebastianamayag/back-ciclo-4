const express = require("express");
const { Editorial,Authors,Categorias } = require("../bd/Sequealize");
const app = express();

app.get("/editorial",async(req,res)=>{
    Editorial.findAll()
  .then((editorial) => {
    res.status(200).json({  editorial });
  });
})

app.post("/editorial",async(req,res)=>{
    if(req.body.nombre){
        Editorial.create({nombre_editorial:req.body});
        res.status(200).json({success:"Editorial creado correctamente"});
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.get("/author",async(req,res)=>{
    Authors.findAll()
    .then((author) => {
      res.status(200).json({  author });
    });
})

app.post("/author",async(req,res)=>{
    if(req.body.nombres){
        Authors.create(req.body)
        res.status(200).json({success:"Author creado correctamente"});
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.get("/categorias",async(req,res)=>{
    Categorias.findAll()
    .then((categorias) => {
      res.status(200).json({  categorias });
    });
})

app.post("/categorias",async(req,res)=>{
    if(req.body.tipo){
        Categorias.create(req.body)
        res.status(200).json({success:"Categorias creado correctamente"});
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

module.exports=app;