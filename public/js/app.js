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
	messages:[],
	actions:{
		emit:function(kind,message){
			var msgs = this.get('messages');
			msgs.pushObject({isSuccess:kind=='success',isError:kind=='error',info:message});
			this.set('messages',msgs);
			setTimeout(function(){
				$('[data-dismiss="alert"]').parent().remove();
			},1000);
			
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


Handlebars.registerHelper('xif', function (v1, operator, v2, options) {

	console.log(v1, operator, v2);
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});