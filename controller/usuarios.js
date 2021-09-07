
const bcrypt = require('bcryptjs');
const token = require('../middleware/token')

const { usuarios}= require('./models/index');

const registro = async (req,res)=>{
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
};

const login = async (req, res)=>{
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
           

};

module.exports = {
    registro,
    login
}