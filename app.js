const express = require('express')

const exphbs = require('express-handlebars')

const multer = require('multer')

const imageModel = require('./models/upload')

const imageData = imageModel.find({})

const app = express()

app.use(express.static('public/images'))

app.engine("handlebars",exphbs.engine())   //handlebars is engine name and then we will call the function exphbs()
app.set("view engine","handlebars")  //it is a kind of extension


var Storage = multer.diskStorage({              //it is using disk storage method of alter to store images
  destination: function (req, file, callback) {    //here we provide destination where our images will be stored
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("image"); //Field name and max count you can change array to single

app.get('/',(req,res) => {
    // res.render("home",{records:data})
    imageData.exec(function(err,data){
        if(err) throw err;

        res.render('home',{records:data})
    })
})

app.post('/',(req,res) => {
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Somethng went Wrong")
        }
        else{
            console.log(req.file.path)

            var filename = req.file.filename

            var imageDetails = new imageModel({
                imagename:filename 
            })

            imageDetails.save(function(err,doc){
                if(err) throw err;

                imageData.exec(function(err,data){
                    // if(err) throw err;
 
                    res.render('home',{records:data,success:true})
                })
            })
        }
    })
})

app.listen(3000,() => {
    console.log("Server is listening to port 5000")
})