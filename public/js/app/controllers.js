EMPapp.CRUDController = Ember.ObjectController.extend({
	isEditing:false,
	actions:{
		save:function(){
			var self=this;
			if(self.model.get('isDirty')){
				self.get('model').save().then(function(){
					self.set('isEditing',false);
					self.controllerFor('application').send('emit','success','Succesfully Updated');
				},function(){
					self.controllerFor('application').send('emit','success','Error while saving');
				});
			}else{
				self.set('isEditing',false);
			}
		},
		cancel:function(){
			if( this.model.get('isDirty') ){
				this.model.rollback();			
			}
			this.set('isEditing',false);
		},
		edit:function(){
			this.set('isEditing',true);
		},
		delete:function(){
			var self = this;
			var route = EMPapp.get('currentPath').split('.')[0];
			this.model.destroyRecord().then(function(){
				self.transitionToRoute(route);
			});
		}
	}
});

EMPapp.EmployeesController = Ember.ArrayController.extend({
	messageable:true
});

EMPapp.EmployeeController = EMPapp.CRUDController.extend();

EMPapp.EmployeesNewController = Ember.ObjectController.extend({
	actions:{
		save:function(){
			var self=this;
			if(self.model.get('isNew')){
				self.model.save().then(function(){
					self.controllerFor('application').send('emit','success','Succesfully Created');
					var route = EMPapp.get('currentPath').split('.')[0];
					self.transitionToRoute(route);
				});
			}
		}
	}
});