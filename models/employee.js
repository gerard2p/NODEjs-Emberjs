module.exports = function(Schema){
	return new Schema({
    	Name: String,
    	LastName: String,
    	email: String,
		createdAt: String,
		updateddAt: String
	});
};