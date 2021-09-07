const moment = require('moment');
const jwt = require('jwt-simple');

function token(usuario){
    const tokenapp = {
      idusuario: usuario.id,
      creaciontoken: moment(),
      duracion: moment().add(10, 'minutes')
    }
  
    return jwt.encode(tokenapp,'token creado');
  };

  module.exports ={
      token
  }