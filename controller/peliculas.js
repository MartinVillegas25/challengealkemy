
const { peliculaoserie, genero }= require('../models/index');
const db = require('../models');



const listarPeliculas =  async (req, res)=>{
    const movies = await peliculaoserie.findAll({
        attributes: ['imagen', 'titulo', 'fechacreacion']
    }).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send(err)
    })
};

const crearPelicula = async (req,res)=>{
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
};

const modificarPelicula = async (req, res)=>{
    const actualizarMovie= await peliculaoserie.update(req.body, {
             where: { id: req.params.id}
         });console.log(actualizarMovie)
         if (actualizarMovie != 1) {
             res.status(404).send(`el pelicula o serie con id:${req.params.id} no existe`);
           } else {
             res.send(`pelicula o serie con id:${req.params.id} ha sido actualizado`) 
           } 
      
};

const eliminarPelicula = async (req, res)=>{
    const borrarMovie =  await peliculaoserie.destroy({
         where: { id: req.params.id}
     });
      if (borrarMovie === 0) {
         res.status(404).send(`el id ${req.params.id} no existe`);
       } else {
         res.send(`la pelicula o serie con  id:${req.params.id} ha sido elimanado`)
       }   
};

const detallePelicula =  async(req, res) => {
    const  detalleMovie = await peliculaoserie.findByPk(req.params.id);
    if (detalleMovie === null) {
        res.status(404).send("id no encontrado");
      } else {
        res.json(detalleMovie) 
      }
};

const buscarPelicula =  async (req, res) => {
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
   
};

module.exports ={
    listarPeliculas,
    crearPelicula,
    modificarPelicula,
    eliminarPelicula,
    detallePelicula,
    buscarPelicula
}