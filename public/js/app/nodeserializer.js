EMPapp.ApplicationSerializer  = DS.RESTSerializer.extend({
  normalize:function(type,hash) {
	  hash.id = hash._id;
	  delete hash._id;
      return hash;
  }
});