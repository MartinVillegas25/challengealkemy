const db = require('./models');
const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const { usuarios, Personajes, peliculaoserie, genero }= require('./models/index');


// registro de usuarios
router.post('/auth/register',[
  check('name', 'el nombre de usuario es obligatorio').not().isEmpty(),
  check('contraseña', 'la contraseña es obligatoria').not().isEmpty(),
  check('email', 'se ingreso un mail incorrecto').isEmail(),
], async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
      return res.status(404).send(error)
    }else{
      req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
      let name = req.body.name;
      let contraseña = req.body.contraseña;
      let email = req.body.email;
      try {
         await usuarios.create({
            name,
            contraseña,
            email,
          })
          res.status(200).send("usuario creado");
      } catch (error) {
          console.error(error);
      }
    } 
})


// login de usuarios

router.post('/auth/login', async (req, res)=>{
        const usuario = await usuarios.findOne({
          where: {email: req.body.email}
        })
        if(usuario){
            const compararPassword = bcrypt.compareSync(req.body.contraseña, usuario.contraseña);
             if (compararPassword){
               console.log("usuario valido")
                res.status(200).send(token(usuario));
             }else{
              res.status(404).send('contraseña y/o mail no existente');
             }
        }else{
          res.status(404).send('contraseña y/o mail no existente');
        }
               
    
});

//token

function token(usuario){
  const tokenapp = {
    idusuario: usuario.id,
    creaciontoken: moment(),
    duracion: moment().add(10, 'minutes')
  }

  return jwt.encode(tokenapp,'token creado');
};


// personajes


//listado de Personajes
router.get('/characters', async (req, res)=>{
    const personajes = await Personajes.findAll({
        attributes: ['imagen', 'nombre']
    }).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

// creacion de personajes

router.post('/character', async (req,res)=>{
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
})

//modificacion de personaje
router.put('/character/:id',async (req, res)=>{
       const actualizar= await Personajes.update(req.body, {
                where: { id: req.params.id}
            });if (actualizar.length == 1) {
                res.status(404).send(`el personaje id:${req.params.id} no existe`);
              } else {
                res.send(`personaje id:${req.params.id} ha sido actualizado`) 
              } 
         
})

//eliminacion de personajes

router.delete('/character/:id', async (req, res)=>{
       const borrar =  await Personajes.destroy({
            where: { id: req.params.id}
        });
         if (borrar === 0) {
            res.status(404).send(`el id ${req.params.id} no existe`);
          } else {
            res.send(`personaje id:${req.params.id} ha sido elimanado`)
          }   
})

//detalle de personaje

router.get('/character/:id', async(req, res) => {
    const  detalle = await Personajes.findByPk(req.params.id);
    if (detalle === null) {
        res.status(404).send("id not found");
      } else {
        res.json(detalle) 
      }
})

// buscar personaje por nombre y filtrado por edad o peliculasoserieasociada o peso

router.get('/character', async (req, res) => {
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
   
})

// peliculas o series asociadas ----------------------------------

//listado de peliculas


router.get('/movies', async (req, res)=>{
    const movies = await peliculaoserie.findAll({
        attributes: ['imagen', 'titulo', 'fechacreacion']
    }).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

// creacion de peliculas

router.post('/movie', async (req,res)=>{
    let imagen = req.body.imagen;
    let titulo = req.body.titulo;
    let fechacreacion = req.body.fechacreacion;
    let clasificacion = req.body.clasificacion;
    let personajesasociados = req.body.personajesasociados;
    try {
        if(clasificacion.length>1){
            res.send("la clasificacion debe ser de 1 a 5")
         }else{
            await peliculaoserie.create({
                imagen,
                titulo,
                fechacreacion,
                clasificacion,
                personajesasociados
                });
        res.status(200).send("pelicula creada");
         }
    } catch (error) {
        console.error(error);
    }
})

//modificacion de peliculas

router.put('/movie/:id',async (req, res)=>{
       const actualizarMovie= await peliculaoserie.update(req.body, {
                where: { id: req.params.id}
            });console.log(actualizarMovie)
            if (actualizarMovie != 1) {
                res.status(404).send(`el pelicula o serie con id:${req.params.id} no existe`);
              } else {
                res.send(`pelicula o serie con id:${req.params.id} ha sido actualizado`) 
              } 
         
})

//eliminacion de peliculas

router.delete('/movie/:id', async (req, res)=>{
       const borrarMovie =  await peliculaoserie.destroy({
            where: { id: req.params.id}
        });
         if (borrarMovie === 0) {
            res.status(404).send(`el id ${req.params.id} no existe`);
          } else {
            res.send(`la pelicula o serie con  id:${req.params.id} ha sido elimanado`)
          }   
})

//detalle de peliculas

router.get('/movie/:id', async(req, res) => {
    const  detalleMovie = await peliculaoserie.findByPk(req.params.id);
    if (detalleMovie === null) {
        res.status(404).send("id no encontrado");
      } else {
        res.json(detalleMovie) 
      }
})

// busqueda de pelicula por titulo y filtrado por genero

router.get('/movie', async (req, res) => {
    let nombre =   req.query.nombre;
    let Peliculaasociada =   req.query.Peliculaasociada;
    if(Peliculaasociada && nombre===undefined){
        const movie =await genero.findAll(
            { where: {Peliculaasociada:Peliculaasociada}})
            if (movie.length == 0) {
             res.status(404).send(`pelicula ${Peliculaasociada} no encontrada`);
           } else {
             res.json(movie) 
           } 
    }else if(Peliculaasociada && nombre){
        const movie1 =await genero.findAll(
            { where: {Peliculaasociada:Peliculaasociada, nombre: nombre}})
            if (movie1.length == 0) {
             res.status(404).send(`pelicula ${Peliculaasociada} no esta dentro del genero ${nombre}`);
           } else {
             res.json(movie1) 
           } 
    }else{
        res.status(400).send("No existen datos")
    }
   
})






module.exports = router;