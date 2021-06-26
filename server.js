const express = require('express');
const bodyParser = require('body-parser');
const router = require("./router");
const app = express();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res)=>{
    res.send("empezando challenge")
});

app.use("/router", router);




app.listen(3000, ()=>{
    console.log('server corriendo en el puerto 3000')
})
