const express = require('express');
const router = require("./routes/router");
const app = express();


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
