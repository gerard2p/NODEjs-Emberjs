/* Autorizer 
window.ENV = window.ENV || {};
window.ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:oauth2-bearer'
};
*/


EMPapp = Ember.Application.create({
	currentPath: '',
});

EMPapp.ApplicationController = Ember.Controller.extend({
	messages:[{kind:'success',info:'Loaded...'}],
	actions:{
		emit:function(kind,message){
			var msgs = this.get('messages');
			msgs.pushObject({kind:kind,info:message});
			this.set('messages',msgs);
		}	
	},
  updateCurrentPath: function() {
    EMPapp.set('currentPath', this.get('currentPath'));
  }.observes('currentPath')
});


DS.LSSerializer = DS.JSONSerializer.reopen({ // or DS.RESTSerializer
    serializeHasMany: function(record, json, relationship) {
        var key = relationship.key,
            hasManyRecords = Ember.get(record, key);
        // Embed hasMany relationship if records exist
        if (hasManyRecords && relationship.options.embedded == 'always') {
            json[key] = [];
            hasManyRecords.forEach(function(item, index){
                json[key].push(item.serialize());
            });
        }
        // Fallback to default serialization behavior
        else {
            return this._super(record, json, relationship);
        }
    }
});

/*
EMPapp.ApplicationSerializer = DS.LSSerializer.extend();
EMPapp.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'EMPapp'
});
*/


EMPapp.ApplicationAdapter = DS.RESTAdapter.extend({
  	host: 'http://localhost:3000'
});