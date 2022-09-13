const express = require('express')
const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view-engine', 'ejs');
app.use(express.static('public'))

const mongodb = require(__dirname +"/database/database.js");
mongodb.then(() => {console.log("Mongodb Conectado") 


const collects = require(__dirname +"/database/models/inventario.js")

var elemento = "xd";


app.get("/", (req, res) => {
   collects.find(function(err, found){
    if(err){
        console.log(err)
    } else {
        res.render('index.ejs', {items: found})
    }
   })
})



app.post('/', function(req, res){
    const nombre = req.body.nameinput
    const categoria = req.body.categoryinput
    const descripcion = req.body.descinput
    const imgn = req.body.imginput

var itemscount = "";
 collects.countDocuments({}, function( err, count){
    if(err || count === 0) {
        itemscount = 1
    } else {
    itemscount = count+1
    }
   
})

let itemscountresult = itemscount;

setTimeout( () => {
    const newResponse = new collects({
        name: nombre,
        category: categoria,
        description: descripcion,
        cod: itemscount,
        img: imgn

    }) 
    newResponse.save(function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }
    });
},500)
    

})

app.post("/delete", function(req, res){
    const item = req.body.checkbox

    collects.findByIdAndRemove(item, function(err){
        if(err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

app.listen(3000);

})