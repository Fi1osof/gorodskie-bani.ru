 



face =  { 

	  

	// Инициализация

	init: function(){ 

		this.buildPage();

		

		//this.buildTopMenu(); 

		return;

	},

	

	destroy: function(){

		this.panel.destroy();

	},

	

	buildPage: function(){

		this.buidMainPanel();

		

		this.buildTopMenu();

		this.buildFooter();

		return;

	},

	

	buidMainPanel: function(){  

		this.tbar = new Ext.Panel({})

		 

		/*seo.logoutButton = new Ext.Button({ 

			icon: 'source/images/icons/door_out.png', 

			text: 'Выход',

			handler:function(){

				seo.logout();	

			}	

		})*/

		

		this.tbar.add({

			xtype: 'toolbar',

			id: 'pro' 

			//items:[seo.logoutButton]	

		})

		

		this.tbar.on('add', function(){this.tbar.doLayout();},this); 

		 

		   

		this.content = new Ext.Container({

			layout:'fit'

		});

		

		this.bbar = new Ext.Toolbar({})

		 

		this.panel = new Ext.Panel({

			id: 'MainPanel',

			border: false,

			layout: 'fit',

			autoHeight: false,

			tbar: this.tbar,

			items:[this.content],

			bbar:  this.bbar 

		})

		

		this.panel.on('render', function(){ 

			face.panel.setSize('',Ext.getBody().getHeight()); 

		},this.panel);

		 

		 

		

		this.panel.render( Ext.get(seo.panelID) );

		  

		

		return; 

	},

	

	buildTopMenu: function(){ 

	},

	buildFooter: function(){ 

		this.bbar.add({ 

				xtype: 'panel', 

				html: '&copy; Разработка: <a href="http://newpg.ru">веб-студия "Новая парадигма"</a>', 

				bodyStyle:{

					background: 'none'	

				},

				border: false

		})	

	},

	

	addContent: function(el){

		if(!el) return false;

		this.content.add(el);

		return;	

	} 

	

	

	/*

	

			bbar:{

				items:[{

					xtype:'tbtext',

					text: '&copy; Разработка: <a href="http://newpg.ru">веб-студия "Новая парадигма"</a>'	

				}] 

			},

	*/

			    

}



seo.modules.face = face;

/*



		seo.logoutButton = new Ext.Button({

			style: {

				//position: 'absolute',

				right: '30px',

				top: '4px'	

			},

			icon: 'source/images/icons/door_out.png',

			renderTo: Ext.getBody(),

			text: 'Выход',

			handler:function(){

				seo.logout();	

			}	

		})

*/