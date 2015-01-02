var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
	
	db.employee.find(function(err,data,count){
		res.send(JSON.stringify({ employees:data }).replace(/_id/g,"id"));
	});
});

router.post('/',function(req,res){
	req.body.createdAt = new Date();
	req.body.updateddAt = new Date();
	console.log(req.body);
	new db.employee(req.body).save(function(err,data,count){
		res.send(JSON.stringify(data));
	});
});

router.put('/:id',function(req,res){
	db.employee.findById(req.params.id,function(err,record){
		record.Name = req.body.employee.Name;
		record.LastName = req.body.employee.LastName;
		record.email = req.body.employee.email;
		record.updateddAt = new Date();
		record.save(function(err,data,count){
			res.send(JSON.stringify(data));
		});
	});
	
});

router.delete('/:id',function(req,res){
	db.employee.findById(req.params.id,function(err,record){
		record.remove();
		res.send(JSON.stringify(record));
	});
});

module.exports = router;
