var mongoose = require('mongoose');
var campgroundSchema = new mongoose.Schema({
    name: String,
    link: String,
    desc: String
});

module.exports = mongoose.model('Campground', campgroundSchema);