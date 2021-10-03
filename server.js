const express = require('express');
const router = require("./routes/router");
const app = express();
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res)=>{
    res.send("empezando challenge")
});

app.use("/router", router);




module.exports=app.listen(process.env.PORT || 8080, ()=>{
    console.log('server corriendo en el puerto 3000')
})
