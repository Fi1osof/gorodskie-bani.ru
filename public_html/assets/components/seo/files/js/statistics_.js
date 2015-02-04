statistics={
	// Формат дат
	dateFormat: 'Y-m-d',

	// Фильтры
	filters:{
		ip: false	
	},

	init: function(){
		 
		window.s = this;
		this.today = new Date().format(this.dateFormat); 
		this.createStatisticPanel(); 
	},

	
	// Функция, вызываемая при уничтожении модуля
	destroy: function(){ 

	},

	
 

	
	// Получаем дату статистики
	getStatisticsDay: function(){ 

		return Ext.get('statisticsDate').getValue() || Ext.util.Format.date(new Date(), statistics.dateFormat);	

	},

	// Набиваем туллбары
	getToolbar: function(){

	 
		var toolbar = new Ext.Panel({

			border: false,

			items:[

				{

					xtype: 'toolbar',

					defaults:{

						style:{

							margin: '0 0 0 10px'	

						}	

					},

					bodyStyle:{

						padding: '10px 20px'

					},

					items:[{

						xtype: 'button',

						text:'Обновить',  

						//enableToggle: true,

						icon: 'source/images/icons/arrow_refresh.png',

						handler: function(){

							seo.loadMask();

							//statistics.ordersStore.reload();
							statistics.RawStore.reloadRowData();	

						}

					},"-", 

					{

						xtype: 'button',

						text:'Сброс фильтров',  

						//enableToggle: true,

						icon: 'source/images/icons/find.png', 

						handler: function(){
							//alert('sdfsdfds');
							statistics.falseFilters();
							statistics.RawStore.reloadRowData();
						}

					},"-",

					{

						xtype: 'datefield',

						editable: false,

						format: 'Y-m-d',

						id: 'statisticsDate',

						allowBlank: false,

						enableKeyEvents: true,

						value: new  Date(),

						listeners:{

							select:  function(){ 

								seo.loadMask();	

								//statistics.getOrders();
								statistics.RawStore.reloadRowData();

							}	

						}, 
					} 

					]		

				} 

			]	

		})

		

		return toolbar;	

	},

	
	// Создаем панель статистики
	createStatisticPanel: function(){

		 

		//this.StatisticPanel =  new Ext.grid.GridPanel({

		this.StatisticPanel =  new Ext.Panel({
			layout:'fit',
 
			tbar: this.getToolbar(),

			  
		})

		
		// Получаем сырые данные
		this.StatisticPanel.on('afterrender', function(){ 	 
			// Инициализируем хранилище сырых данных
			// this.RawStore.init(this);
			
			// Инициализируем всю Систему выжуализации 
			this.Visual.init(this);
		}, this);

		
		// Создаем основной контейнер группировки результатов
		
		
		 
		// Создаем основной контейнер для работы с заявками 
		var c = new Ext.Container({ 
			layout: 'border', 
			defaults:{ 
					layout: 'fit'	 
			} ,

			items:[


				// Панель группировки результатов
				this.getGroupPanel(),

				// Таблица заявок 
				new Ext.Container({

					region: 'center',
					//items: [grid] 
					items:[this.StatisticPanel]	

				})
				

			]	

		}) 

		

		face.addContent(c); 

		

		

		 

		 

		return;

	},

	// Создаем  панель группировки результатов
	getGroupPanel: function(){
		// Панель группировки
		this.groupPanel = new Ext.Panel({
					
			title: 'Панель группировки результатов',
					
			id: 'groupPanel',
					
			region: 'west',

			collapsible: true, 

			width: 250,
					
			defaults:{
				//collapsed: true,
				collapsible: true	
							
			},

			items:[

				/*		//this.getCompaniesGrid()		// Получаем таблицу всех компаний
						new Ext.Panel({
							title: 'Список хостов'
						}),
						new Ext.Panel({
							title: 'Список IP-адресов'	
						}),
						new Ext.Panel({
							title: 'Уникальные посетители'
						}),
						new Ext.Panel({
							title: 'Поисковые системы'
						}),
						new Ext.Panel({
							title: 'Поисковые запросы'
						})*/
				// Получаем 		
				//this.getGroupModules()
			]	

		})
				
		return this.groupPanel;	
	},

 

	

	falseFilters: function(){
 		this.filters.ip = false
	}, 

	

	 
	

	/*********************************************/

	/*            End заявки 		    		 */

	/*********************************************/
	
	

	/*********************************************/
	
	/*  Визуализация статистики 				 */
	
	/*********************************************/
	// Объект визуализации статистики
	Visual:{
		
		groups: {
			ip : [], // Массив IP-адресов	
		},
		
		
		// Функция инициализации Объекта
		init: function(scope){
			// Передаем ссылку на родителя
			this.parent = scope;
			
			// 1 Формируем сырое хранилище
			this.parent.RawStore.init(this.parent);
			
			// 2 Формируем хранилище визуализации
			this.createMainStore(),
			
			// 3 Формируем Грид визуализации
			 this.createGrid()
			// 4 Формируем модули группировки результатов
			this.createGroupPanel()
			// 5 Загружаем сырые данные
			
			// 6 Заливаем сырые данные в хранилище визуализации
			
			
		},
		
		// Создаем основное хранилище визуализации
		createMainStore: function(){
			this.MainStore = new Ext.data.JsonStore({
				// root: 'data',
				id:'statisticMainStore',
				idProperty: 'vstr_id',
				fields:[
					{name: 'vstr_id', type: 'int'},
					{name:  'url'},
					{name: 'referer'},
					{name: 'ref_host'},
					{name: 'ref_request'},
					{name: 'searcher'},
					{name: 'searchword'},
					{name: 'searchpage'},
					{name: 'userAgent'},
					{name: 'date'},
					{name: 'ip'},
					{name: 'cookie'}
				]
			})	
		},
		
		createGrid: function(){ 
			this.Grid = new Ext.grid.GridPanel({
				title: 'Статистика посещения',
				//store: this.parent.RawStore.store,
				store: this.MainStore,
				//layout: 'fit',
				//height:700,
				cm: new Ext.grid.ColumnModel({
					columns:[
						
						{
							header: 'vstr_id',
							dataIndex: 'vstr_id',
							hidden: true	
						},
						{
							header: 'IP',
							dataIndex: 'ip'	
						},
						{
							header: 'Дата дахода',
							dataIndex: 'date'	
						},
						{
							header: 'url', 
							dataIndex: 'url',
							width: 350
						},
						{
							header: 'Реферальная ссылка',
							dataIndex: 'referer',
							width: 350,
							renderer: function($text){
								if(!$text) return '';
								//this.color= 'red';
								//this.css.coloe = 'red';
								//alert(this.css);
								var url =  /\:\/\//.test($text) ? $text : 'http://'  + $text;
								var url =  url.replace(/\"/, '\"');
								
								return '<a href="'+ ( url ) +'" target="_blank">'+ $text +'</a>';	
							}	
						},
						{
							header: 'Клиент', 
							dataIndex: 'userAgent',
							width: 200,
							editor: Ext.form.Field
						},
						{
							header: 'Поисковая система', 
							dataIndex: 'searcher',
							width: 120,
							css:'color: green, font-size:  120% , font-weight:bold'	 
						},
						{
							header: 'Поисковый запрос', 
							dataIndex: 'searchword',
							width: 400
						},
						{
							header: 'Страница', 
							dataIndex: 'searchpage',
							width: 100
						}
					],
					defaults: {
						sortable: true,
						width: 120
					},
					disableSelection: false	
				})	
			});
			
			this.parent.StatisticPanel.add(this.Grid);	
			
			//this.Grid.on('rowclick', function(){'sdfsdfsdfdd'});
			 // this.Grid.on('rowclick', function(){alert('sdfsdf');});
			
			this.parent.StatisticPanel.doLayout();
			
			
			 
			
			// Подгружаем данные
			this.parent.RawStore.reloadRowData();
			
			 
		},
		
		/* Панели группировок */
		
		// Создаем панели группировки элементов
		createGroupPanel: function(){
			// Панель по IP
			this.createIPgroupPanel();
			
			this.parent.groupPanel.doLayout();
		},
		
		// Панель по IP
		createIPgroupPanel:function(){
			plugin = {
				init: function(grid ){
					//print_r(this.parent);		
					var stat = this.parent.parent; 
					grid.on('rowdblclick', function(){
						//alert(grid.getSelectionModel().getSelected().data['ip']);
						if(!grid.getSelectionModel().getSelected().data['ip'] ) return false;
						stat.filters.ip = grid.getSelectionModel().getSelected().data['ip'];
						stat.Visual.reloadVisualStore();
						//alert(stat.filters.ip);	
					});	
					/*grid.on('rowcontextmenu', function(){alert('sdfsdfsdf')});
					grid.on('show', function(){alert('sdfsdfsdf')});
					
					grid.on('render', function(){alert('sdfsdfsdf')});*/
					
					
					
					//alert(grid.render ); 
					//grid.rowclick = function(){  alert('ggsdgsd'); }
				},
				parent: this // Visual
			}
			
			
			this.IPgroupStore = new Ext.data.ArrayStore({
				fields:[{name:'ip'}],
				sortInfo: {
					field: 'ip',
					direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				}	
			});
			
			this.IPgroupGrid = new Ext.grid.GridPanel({
				store: this.IPgroupStore,
				id: 'IPPanel',
				cm: new  Ext.grid.ColumnModel({
					columns:[{
					header: 'ip', dataIndex: 'ip'}]	
				}),
				plugins:  [plugin]	
			})
			
			this.IPgroupGrid.on('show', function(){'sdfsdfsdf'});
			
			 
			this.parent.groupPanel.add(
				new Ext.Panel({
					title: 'IP',
					collapsed: false,
					layout: 'fit',
					items: this.IPgroupGrid	
				})
			);
			// alert(this.groups.ip);
			
			//alert(statistics.Visual.groups.ip[0]);
			
			//store.loadData(this.groups.ip);	
		},
		
		
		/* Панели группировок */
		
		
		// Обновляем хранилище визуализации
		reloadVisualStore: function(){
			var a =[]; 
			var data = this.parent.RawStore.store.data.items; 
  	
			//alert(this.parent.parent.filters.ip);
			//alert();
				
			for(i in data){
				if(Ext.isFunction(data[i])) {
					//alert('ffff');
					continue;	
				}
				
				//  Фильтруем по ip
				if( this.parent.filters.ip && this.parent.filters.ip != data[i].data['ip']){
					//if( this.parent.filters.ip ){
					//alert('"'+ this.parent.filters.ip+ '"' + '  '+ '"' +  data[i].data['ip']  + '"');
					//return;
					continue;
				}
				//alert(data[i].data['ip']);
				
				//return;
				
				
				var d = data[i].data;
				
				
				
				
				//if(data[i].data['ip'] != '95.108.129.207')  continue;
				
				//  alert(data[i].data['ip']);
				a[a.length] = d;
				//alert(data[i].data);
				//alert(a.length);
				//return;
			}
			
			//alert(a.length);
			//alert('sdfdsf33');
			//alert(a[a.length - 2]  );
			//return;
			this.MainStore.loadData(a);
		}
	}, 
	

	/*********************************************/
	
	/* End of Визуализация статистики 				 */
	
	/*********************************************/
	

	/*********************************************+

	| Таблица-фильтр компаний

	+********************************************/
 
	/*********************************************+

	| End of Таблица-фильтр компаний

	+********************************************/

/*		//this.getCompaniesGrid()		// Получаем таблицу всех компаний
						new Ext.Panel({
							title: 'Список хостов'
						}),
						new Ext.Panel({
							title: 'Список IP-адресов'	
						}),
						new Ext.Panel({
							title: 'Уникальные посетители'
						}),
						new Ext.Panel({
							title: 'Поисковые системы'
						}),
						new Ext.Panel({
							title: 'Поисковые запросы'
						})
				// Получаем 		
				this.getGroupModules()
*/				
				
	// Сырое хранилище данных
	RawStore:{
		// Создается только один раз, перезагружается по мере необходимости
		
		// Инициализируем объект
		init: function(scope){
			this.parent = scope;
			// Создаем хранилище
			this.createRawStore();
			
			
		},
		
		// Создаем хранилище
		createRawStore: function(){ 
			this.store = new Ext.data.JsonStore({
				root: 'data',
				id:'statisticRawStore',
				idProperty: 'vstr_id',
				fields:[
					{name: 'vstr_id', type: 'int'},
					{name:  'url'},
					{name: 'referer'},
					{name: 'ref_host'},
					{name: 'ref_request'},
					{name: 'searcher'},
					{name: 'searchword'},
					{name: 'searchpage'},
					{name: 'userAgent'},
					{name: 'date'},
					{name: 'ip'},
					{name: 'cookie'}
				]
			})
			
			// Формируем таблицу
			// this.createGrid();
			
			// Добавляем событие на обновление данных
			this.store.on('load', function(){
				
				//alert('sdfsf');
				/*
				this.groups.ip = [];
			// Для каждого элемента, удовлетворяющего условиям, выводим информацию
			// print_r( statistics.RawStore.store.data.items[0].data );
			// Набиваем массив IP-адресов 
				if(!this.groups.ip.inArray(d['ip'])){
					this.groups.ip[this.groups.ip.length] = d['ip'];	 
				}
				*/
				
				
					//this.parent.Visual.reloadVisualStore(statistics.RawStore.store.data.items);
					this.parent.Visual.reloadVisualStore();
					//alert(statistics.Visual.groups.ip);
					//alert(this.parent.Visual.IPgroupStore);
					
					// Заполняем IP адреса 
					var data = [];
					var a = this.parent.Visual.groups.ip;  a = [];
					var d = statistics.RawStore.store.data.items;
					
					//alert(statistics.RawStore.store.data.items[2].data['ip']);
					
					//return;
					for(i in d){
						if(Ext.isFunction(d[i])) continue;
						
						//print_r(d[i].data);
						
						//return;
						
						if(!a.inArray(d[i].data['ip'])){
							a[a.length] = d[i].data['ip'];
							data[data.length] = [d[i].data['ip']];	 
						}	
					}
					
					 
					
					
					/*
					for(i in a){
						if(Ext.isFunction(a[i])) continue;
						data[data.length] = [a[i]];
						
						alert('sdfsd');
						return;
						// Набиваем массив IP-адресов 
						if(!this.parent.Visual.groups.ip.inArray(a[i]['ip'])){
							this.parent.Visual.groups.ip[this.parent.Visual.groups.ip.length] = a[i]['ip'] ;	 
						}
				
					}*/
					
					//alert(data[2]['ip']);
					//return;
					//alert(data);
					//alert(Ext.util.JSON.encode());
					
					this.parent.Visual.IPgroupStore.loadData(data);
					//alert('sdfsdf');
					//alert(this.parent.Visual.groups.ip);
				},
				this
			);
			
			// Загружаем данные
			return this.store;
		},
		
		 
		
		// Подгружаем данные
		reloadRowData:  function(){
				seo.get({
					data:{
						mod: 'seo',
						act: 'getStatistic',
						date: this.parent.getStatisticsDay()	
					},
					success: function(conn, resp){ 
						seo.removeMask();
						try{  
							// Проверка успешности
							
							var r = Ext.util.JSON.decode(resp.responseText);
							if(!r.success || r.success != 'true'){
								alert(r.message ? r.message : 'Ошибка выполнения запроса');	
							}
							else{
								statistics.RawStore.store.loadData(r);	
							}
							 
							//statistics.RawStore.store.loadData(r);
							
							  
							//alert( statistics.RawStore.store.data[1] );
							/*for(i in statistics.RawStore.store.data){
								alert(i+ ": "+ statistics.RawStore.store.data[i])
								return;	
							}*/
							
						}
						catch($err){
							alert($err);	
						}  
						
					}	
				})	
		}
	 /*reloadRowData:  function(){
				seo.get({
					data:{
						act: 'getStatistic',
						date: this.parent.getStatisticsDay()	
					},
					success: function(conn, resp){
						alert(resp);
						seo.removeMask();
						try{
							var r = Ext.util.JSON.decode(resp.responseText);
							statistics.RawStore.store.loadData(r);
							
							*/  
							//alert( statistics.RawStore.store.data[1] );
							/*for(i in statistics.RawStore.store.data){
								alert(i+ ": "+ statistics.RawStore.store.data[i])
								return;	
							}*/
						/*	
						}
						catch($err){
							alert($err);	
						}  
						
					}	
				})	
		}*/
	} 
	
	// Статистика
	, StatisticStore:{
	
		
		
	},
	

		

}



seo.modules.statistics = statistics;

