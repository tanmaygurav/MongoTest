const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
    );

    /* MONGODB WITH MONGOOSE  */
try {
    mongoose.connect("mongodb://0.0.0.0:27017/moviedb", {
    useNewUrlParser: true,
    });
    console.log("DataBase Connected : Collection moviedb");
    } catch (error) {
    console.log(`DataBase COnnection Error \n ${error}`);
    }

    /* MONGOOSE DATABASE SCHEMA */
const moiveSchema = {
    name: String,
    img: String,
    summary: String,
    };

    /* CREATING A MODEL OBJECT */
const Movie = mongoose.model("Movie", moiveSchema);

// CRUD
// create

app.post("/create", function(req,res){
    const movie= new Movie({
        name: "name",
        img: "img",
        summary:"summary",
    });
    console.log(movie);

    movie.save(function(err){
        if(!err){
            res.send("Data inserted")
        }else{
            res.send(err)
        }
    });
});

// read
app.get("/read", function (req, res) {
    // find all posts to display on home page
    Movie.find({}, function (err, movies) {
        res.send(movies)  
    });
});

// update
app.post("/update", function(req,res){
    const filter = { name: 'name' };
    const update = { img: 'updated aseoifuhaewi',
                    summary:"summary updated"
                    };
    const updateDocument = async()=>{
        let doc = await Movie.findOneAndUpdate(filter, update); 
        res.send("Documnet updated")
    }
    updateDocument()
    
})

// delete
app.post("/delete",function(req,res){
    const filter = { name: 'name' };
    Movie.findOneAndDelete(filter, function(err,docs){
        if (err){
            res.send(err)
        }
        else{
            res.send(docs);
        }
    })
})

/* SERVER INIT */
portnumber = 3001;
app.listen(portnumber, function () {
    console.log(`server started at port ${portnumber}`);
});