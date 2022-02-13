var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require('./models/campground');
var methodOverride = require('method-override');
const { redirect } = require("express/lib/response");

mongoose.connect("mongodb://localhost/Yelp_Camp_DB");

app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.redirect('/campgrounds');
});

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
    console.log("The Server for YELP CAMP has started!");
});


app.get('/campgrounds',function(req, res){
    
     Campground.find({},function(err,campgrounds){
        if(err){
            console.log("Failed to get campgrounds: " + err);
        }else{
            res.render("index", {campgrounds:campgrounds});
        }
    }); 

});

app.get('/campgrounds/new', function(req,res){
    res.render("newCampgrounds");
});

app.get('/campgrounds/:id', function(req, res){
    Campground.findOne({_id: req.params.id}, function(err,campground){
        if(err){console.log("There is an error!");}
        else{res.render('show',{campground:campground});}
    });
});

app.put('/campgrounds/:id',function(req, res){
    Campground.updateOne({_id:req.params.id}, {name: req.body.name, link: req.body.link, desc: req.body.desc}, function(err, campground){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    }); 
});

app.delete('/campgrounds/:id', function(req, res){
    Campground.deleteOne({_id: req.params.id}, function(err, campground){
        if(err){
            res.send("Some error occured while deleting: " + err);
        }else{
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/:id/edit', function(req,res){
    Campground.findOne({_id: req.params.id}, function(err,campground){
        if(err){console.log("There is an error!");}
        else{res.render('edit',{campground:campground});}
    });
});

app.post('/campgrounds',function(req,res){
    Campground.create(
        {
            name: req.body.name,
            link: req.body.link,
            desc: req.body.desc
        },
        function(err, campground){
            if(err){
                console.log("Data Insertion failed: " + err);
            }else{
                console.log(campground);
                res.redirect('/campgrounds');
            }
        }
    );

});
