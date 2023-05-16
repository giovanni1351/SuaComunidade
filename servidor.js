// Pacotes  necessários
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const mongoose = require("mongoose")


const uri = `mongodb+srv://giovannimorassi13511:uVnad4bG7PVxzgq6@servgiva.goswycp.mongodb.net/?retryWrites=true&w=majority`;


var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://giovanni:MV3kMR1qakIhFEdv@servgiva.goswycp.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const DenunciasSchema = new mongoose.Schema({
    data: String,
    detalhes: String,
    local: String,
    time: String,
    tipo: String,
});


const Denuncias = mongoose.model('Denuncias', DenunciasSchema);


app.get('/', (req, res) => {
    res.redirect("home.html");
});


app.post("/denuncia", async function (req, res) {
    const { DataOcorrencia, Detalhes, Lugar, HoraOcorrencia, tipo } = req.body;

    const denuncia = new Denuncias({
        data: DataOcorrencia,
        detalhes: Detalhes,
        local: Lugar,
        time: HoraOcorrencia,
        tipo: tipo,
    });
    try {
        await denuncia.save();
    }
    catch (err) {
        console.log(err)
        res.json({ err })
    }


    res.redirect("/")

});




app.get("/denuncias", function (req, res) {
   
    Denuncias.find().then((denuncias)=>{
        res.render('denuncias.ejs', { denuncias});
    })
});


app.listen(80, () => {
    console.log('server started');
});

