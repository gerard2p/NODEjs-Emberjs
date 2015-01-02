var mongoose	=	require('mongoose');
mongoose.connect('mongodb://localhost:27017/testapp', function (error) {
    if (error) {
        console.log(error);
    }
});
var Schema		=	mongoose.Schema
  , fs			=	require('fs');

var db={};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
	var model = require(__dirname+"/"+file)(Schema);
	db[file.replace(".js","")] = mongoose.model(file.replace(".js",""), model);
  });

module.exports = db;