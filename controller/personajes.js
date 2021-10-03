const {Personajes}= require('../models/index');
const db = require('../models');

const listarPersonajes = async (req, res)=>{
    const personajes = await Personajes.findAll({
        attributes: ['imagen', 'nombre']
    }).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send(err)
    })
};


const crearPersonaje = async (req,res)=>{
    let imagen = req.body.imagen;
    let nombre = req.body.nombre;
    let edad = req.body.edad;
    let peso = req.body.peso;
    let historia = req.body.historia;
    let peliculasoserieasociada = req.body.peliculasoserieasociada;
    try {
       await Personajes.create({
        imagen,
        nombre,
        edad,
        peso,
        historia,
        peliculasoserieasociada,  
        })
        res.status(200).send("personaje creado");
    } catch (error) {
        console.error(error);
    }
};

const modificarPersonaje = async (req, res)=>{
    const actualizar= await Personajes.update(req.body, {
             where: { id: req.params.id}
         });if (actualizar.length == 1) {
             res.status(404).send(`el personaje id:${req.params.id} no existe`);
           } else {
             res.send(`personaje id:${req.params.id} ha sido actualizado`) 
           } 
      
};

const borrarPersonaje = async (req, res)=>{
    const borrar =  await Personajes.destroy({
         where: { id: req.params.id}
     });
      if (borrar === 0) {
         res.status(404).send(`el id ${req.params.id} no existe`);
       } else {
         res.send(`personaje id:${req.params.id} ha sido elimanado`)
       }   
};

const detallePersonaje = async(req, res) => {
    const  detalle = await Personajes.findByPk(req.params.id);
    if (detalle === null) {
        res.status(404).send("id not found");
      } else {
        res.json(detalle) 
      }
};

const buscarPersonaje= async (req, res) => {
    let nombre =   req.query.nombre;
    let edad =   req.query.edad;
    let peliculasoserieasociada =   req.query.peliculasoserieasociada;
    let peso = req.query.peso;
    if(nombre && edad){
        const character =await Personajes.findAll(
            { where: {nombre: nombre, edad: edad}})
            if (character.length == 0) {
             res.status(404).send(`el personaje ${nombre} no encontrado`);
           } else {
             res.json(character) 
           } 
    }else if(nombre && peliculasoserieasociada){
   const characterpeli =await Personajes.findAll(
       { where: {nombre: nombre, peliculasoserieasociada: peliculasoserieasociada}})
       if (characterpeli.length == 0) {
        res.status(404).send(`el personaje ${nombre} no encontrado`);
      } else {
        res.json(characterpeli) 
      } 
    }else if(nombre && peso){
        const characterpeso =await Personajes.findAll(
            { where: {nombre:nombre, peso:peso}})
            if (characterpeso.length == 0) {
             res.status(404).send(`el personaje ${nombre} no encontrado`);
           } else {
             res.json(characterpeso) 
           } 
    }else{
        res.status(400).send("no existe un personaje con ese nombre")
    }
   
};

module.exports ={
    listarPersonajes, 
    crearPersonaje,
    modificarPersonaje,
    borrarPersonaje,
    detallePersonaje,
    buscarPersonaje
}