EMPapp.Employee = DS.Model.extend({
    Name: DS.attr('string'),
	LastName: DS.attr('string'),
	email:DS.attr('string'),
	FullName:function(){
		return ( ( this.get('Name') || '') + ' '+(this.get('LastName') || '') ).trim();
	}.property ('Name', 'LastName')
});