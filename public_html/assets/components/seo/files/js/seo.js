

/*

$(document).ready(function(){

	seo.init();	 

})

*/

Ext.onReady(function(){

	seo.init();	 

})





seo =  { 
	version: '1.0.1',
 
	output: '',			// Для вывода
	
	// ID Элемента страницы, куда будет вставляться панель
	panelID: 'statisticsPanel',
	//panelID: 'modx-content',

	 
	modules:{},

	 
	// Инициализация

	init: function(){ 
		 this.onStartProgram();

	},

	

	// На старт программы

	onStartProgram: function(){

		//seo.loadMask();

		this.buildPage();  

			

	},

	

	  

	

	loadMask: function(text, to){

		

		this.mask = new Ext.LoadMask((to ? to: Ext.getBody()), {msg:(text ? text : "Пожалуйста, подождите...")});

		this.mask.show();

		return;	

	}, 

	

	removeMask: function(){

		if(this.mask) this.mask.hide();

	},

	

	get: function(params){
		//return; 
		!params ? params ={} : "";

		//url,type, data, success, dataType

		!params.type ? type = 'post' : type = params.type;

		!params.success ? success = function(){} : params.succes;

				

		if(!params.url){

			//url = 'http://www.newarbat.ru/office/LK/widget/pp/widget-v'+ this.version;

			//url = seo.module_url + 'connectors/statistics/index.php?action=get&id=www.9697235.ru_3&type=modStat';
			url = seo.module_url + '/assets/components/seo/connector.php?action=get&HTTP_MODAUTH=' + MODx.siteId;

		}

		else{

			url  = params.url	

		}

		

		errMsg = (params.errMsg  ? params.errMsg : "Ошибка выполнения запроса");

		

		data = (params.data  ? params.data : "");

		

		if(!params.error){

			error= function(conn, response){
				alert('error');
				seo.removeMask();	

				//Ext.Msg.alert('Ошибка!', errMsg);	

				//var msg = new Ext.Msg({minWidth: 300})

				Ext.Msg.alert('Ошибка!', (response.responseText && response.responseText != '' ? response.responseText : errMsg));

				//print_r(response);

				return false;

			}

			 
		}

		else{

			error = params.error	

		}

		

		if(!params.success){

			success = function(conn, response){
				alert(response);
				//  response.responseText

				seo.removeMask();	

			} 

		}

		else{

			success = params.success	

		}

				

		 

		

		

		var ajax  = new Ext.data.Connection();  

		//Ext.Ajax.on('beforerequest', this.showSpinner, this);

		ajax.on('requestcomplete', success, this);

		ajax.on('requestexception', error, this);

		

		ajax.request({

			timeout: 10000,

			url: url,

			method: type,

			params:  data	

		});

		

		return;		

	},

	

	fetchContent: function($html, to){
   
		
		//!to  ? $body  = Ext.getBody() : $body = to;
		!to  ? $body  = Ext.get(this.panelID) : $body = to;

		//$body.html( $html);

		//$body.html( $html);

		$body.insertHtml( 'afterBegin',  $html);

		return;

	},

	

	 

	 

	 

	// Формируем страницу

	buildPage: function(){

		

		 

		this.loadModules();

		 

		return;

	},

	

	// Подгружаем модули

	loadModules: function(){

		for(i in this.modules){

			if(!this.modules[i].init || !Ext.isFunction(this.modules[i].init)) continue;

			this.modules[i].init();	

		}

		 

	},

	

	destroyModules: function(){

		for(i in this.modules){

			if(!this.modules[i].destroy || !Ext.isFunction(this.modules[i].destroy)) continue;

			this.modules[i].destroy();	

		}	

	}

	

	 

			    

}