EMPapp.Router.map(function() {
    this.resource('employees',function(){
		this.resource('employee',{path:":id"});
        this.route('new');
    });
});

EMPapp.EmployeesRoute = Ember.Route.extend({
	model:function(){
		return this.store.find('employee');
	}
});

EMPapp.EmployeesNewRoute = Ember.Route.extend({
	model:function(){
		return this.store.createRecord('employee');
	},
	deactivate:function(){
		if( this.controller.model.get('isNew') ){
			this.controller.model.deleteRecord();
		}
	}
});

EMPapp.EmployeeRoute = Ember.Route.extend({
	model:function(params){
		return this.store.find('employee',params.id);
	},
	beforeModel:function(){
		if(this.controller)	{
			this.controller.set('isEditing',false);
			if(this.controller.model){
				this.controller.model.rollback();
			}
		}
	},
});