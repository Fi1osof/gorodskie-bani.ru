// JavaScript Document



// Прототипы объектов



types = {

	win:  Ext.extend(Ext.Window, {

				bodyStyle:{ 

					'background-color': '#FFF',

					padding: '5'	

				},

				width: 300,

				height: 180 ,

				autoHeight: true

			}

		)

	,

	getWin: function($params){

		var win = new this.win($params);

		win.on('close', 

			function(){

				//seo.removeMask();

				this.destroy();

			}, 

			win

		);

		return win;

	},

	

	getFixedWin: function($params){

		if(!$params) $params ={}

		!$params.draggable ? $params.draggable = false : '';

		!$params.modal ? $params.modal = true : '';

		!$params.resizable ? $params.resizable = false : '';

		

		return this.getWin($params); 

	}	

}



var vform = Ext.extend(Ext.form.FormPanel,{

	border: true,

	defaultType: 'textfield',

	bodyStyle:{

		padding: '10px 5px'	

	}	

})

Ext.reg('vform', vform);





/*   vTypes */

Ext.apply(Ext.form.VTypes, {

			number:  function(v) {

				return /^\d+$/.test(v);

			},

			numberText: 'Разрешено вводить только цифры',

			numberMask: /\d|\r|\n/i

});



Ext.apply(Ext.form.VTypes, {

			password:  function(v) {

				return /^.{6,}$/.test(v);

			},

			passwordText: 'Разрешено вводить только цифры, латинские буквы, знаки ,.!@#$%^&;:*',

			passwordMask: /[,\.\!\@\#\$\%\^\&\;\*\:\da-z]/i

});



// a = Ext.extend(Ext.Msg.alert, {title: 'Сообщение Системы'});





alert = function( $msg, $title, $callback){

	Ext.Msg.alert( ($title ? $title: 'Сообщение с сайта'), $msg, $callback);	

}



print_r = function(obj, limit){

	!limit ? limit = 10 : "";

	c = 0;

	for(i in obj){

		c++;

		if(c > limit) return false;

		types.getWin({title:i, html: obj[i]}).show();

	}	

}





/*   vTypes */



Ext.apply(Ext.form.VTypes, {

			OrderDaterange : function(val, field) {

				var date = field.parseDate(val);

				//alert('sdgsd');

				if(!date){

					return;

				}

				//alert(date);

				/*if(field.currDate && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))){

					field.setMinValue(date);

				}*/

				

				if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) { 

					var start = Ext.getCmp(field.startDateField);

					start.setMaxValue(date);

					start.validate();

					this.dateRangeMax = date;

				} 

				else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {

					var end = Ext.getCmp(field.endDateField);

					end.setMinValue(date);

					//alert();

					end.setMaxValue(date.add(Date.DAY, 14));

					end.validate();

					this.dateRangeMin = date;

				}

				/*

				 * Always return true since we're only using this vtype to set the

				 * min/max allowed values (these are tested for after the vtype test)

				 */

				return true;

			} 

});


// Создаем функцию проверки наличия элемента в массиве
Array.prototype.inArray = function (value) {
	var i;
	for (i=0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};


bigText = function(text){

	return '<span class="bigText">'+text+'</span>';	

}