// JavaScript Document
debug={
	init: function(){
		this.buildButton()	
	},
	
	buildButton: function(){
		this.requestButton = new Ext.Button({
			//scope: this,
			text: 'Отправить запрос',
			renderTo: Ext.getBody(),
			handler: function(){
				//alert('','dfgdfg');	
				/*yliy.get({
					success: function(){
						alert('sdfdsf', 'sdgsdfs');	
					}	
				})*/
				
				//var ajax  = new Ext.data.Connection();  
				var ajax  = Ext.Ajax;  
				//Ext.Ajax.on('beforerequest', this.showSpinner, this);
				/*ajax.on('requestcomplete', success,function(conn, resp){
						
				});*/
				//ajax.on('requestexception', error, this);
				url = "http://www.newarbat.ru/office/LK/widget";
				type = 'GET';
				/*ajax.request({
					//timeout: 10000,
					url: url,
					method: type,
					success: function(){
						alert('sdfdsf', 'sdgsdfs');	
					}
					//params:  data	
				});*/
				
				error = function(){
						
				}
				
				success = function(){
					alert('sdfs','sdfsdf');	
				}
				
				jQuery.ajax({
					url: 	url,
					type: 	type,
					//data: 	data,
					complete: function($data){
						yliy.removeMask();
						//Ext.Msg.alert('', $data);
						alert('sdfs','sdfsdf2');	
					},		
					error: error ,
					success: success 				
				})
			}	
		})	
	}
	
}