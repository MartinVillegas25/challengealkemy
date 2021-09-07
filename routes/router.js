const express = require('express');
const db = require('./models');
const router = express.Router();
const {check} = require('express-validator');
const { listarPeliculas, crearPelicula, modificarPelicula, eliminarPelicula, detallePelicula, buscarPelicula } = require('../controller/peliculas');
const { listarPersonajes, crearPersonaje, modificarPersonaje, borrarPersonaje, detallePersonaje,buscarPersonaje } = require('../controller/personajes');
const { registro, login } = require('../controller/usuarios');
const {validarCampos} = require('../middleware/validarcampos')

// registro de usuarios
router.post('/auth/register',[
  check('name', 'el nombre de usuario es obligatorio').not().isEmpty(),
  check('contraseña', 'la contraseña es obligatoria').not().isEmpty(),
  check('email', 'se ingreso un mail incorrecto').isEmail(),
  validarCampos
], registro )

// login de usuarios
router.post('/auth/login', login );


// personajes

//listado de Personajes
router.get('/characters', listarPersonajes )

// creacion de personajes

router.post('/character', crearPersonaje )

//modificacion de personaje
router.put('/character/:id', modificarPersonaje)

//eliminacion de personajes

router.delete('/character/:id', borrarPersonaje )

//detalle de personaje

router.get('/character/:id', detallePersonaje )

// buscar personaje por nombre y filtrado por edad o peliculasoserieasociada o peso

router.get('/character',  buscarPersonaje)

// peliculas o series asociadas ----------------------------------

//listado de peliculas


router.get('/movies', listarPeliculas )

// creacion de peliculas

router.post('/movie',crearPelicula )

//modificacion de peliculas

router.put('/movie/:id',modificarPelicula)

//eliminacion de peliculas

router.delete('/movie/:id',eliminarPelicula )

//detalle de peliculas

router.get('/movie/:id',detallePelicula)

// busqueda de pelicula por titulo y filtrado por genero

router.get('/movie',buscarPelicula)






module.exports = router;