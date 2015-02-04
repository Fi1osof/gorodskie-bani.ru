orders={
	
	init: function(){ 
		this.createOrdersJsonReader();
		this.createOrdersStore();
		this.createOrdersGrid(); 
		// setTimeout(orders.reloadOrders, 3000);
	},
	
	destroy: function(){ 
	},
	
	dateFormat: 'Y-m-d',
	
	getOrdersDay: function(){ 
		return Ext.get('ordersDate').getValue() || Ext.util.Format.date(new Date(), orders.dateFormat);	
	},
	
	// Получаем заявки
	getOrders:  function(){  
		
		this.ordersDate = orders.getOrdersDay(); 
		yliy.get({
			type: 'POST',
			dataType: 'json',
			data:{
				module: 'orders',
				action: 'getOrders',
				date: orders.ordersDate
			},
			success: function(conn, response){
				yliy.removeMask();
				 
				orders.storeRawData = {data:[]}
				
				try{
					var  $result = Ext.util.JSON.decode(response.responseText)
				}
				catch(err){
					Ext.Msg.alert('Ошибка', 'Ошибка выполнения запроса. '+ err);
					return false;
				}
				
				if($result.err){
					Ext.Msg.alert('Ошибка', $result.err);	
				}
				else if($result.data && Ext.isArray($result.data)){
					orders.storeRawData = $result; 
				}
				orders.reloadOrdersStore();
				/*
				else if($result.data && Ext.isArray($result.data)){
					orders.storeRawData = $result;
					//orders.ordersStore.loadData(orders.storeRawData);
					orders.reloadOrdersStore();
				}
				else{
					 //Ext.Msg.alert('','Не удалось конвертировать JSON');
					//orders.ordersStore.removeAll(); 
					orders.ordersStore.loadData(orders.storeRawData); 
					return false;	
				} 
				*/
				
			}  	
		})
		return;
	},
	
	//createOrdersStore: function($data){
	createOrdersStore: function(){
		//this.createOrdersJsonReader();
		   
		this.ordersStore = new  Ext.data.Store({
			//data: $data,
			//autoLoad: {params:{start: 0, limit: 15}},
			reader: orders.ordersJsonReader
			//fields: ['firm_name', {name: 'order_id', type: 'number'}, 'document', {name:'office', type:'number'}, 'status']
		})
		
		//this.ordersStore.reload = function(){alert('','sdfsd');}
		this.ordersStore.proxy = {
			request: function(){ 
			
				// Обнуляем значения
				//orders.searchField.setValue(''); 
				//orders.activeOrdersOnlyCB.setValue(false); 
				//yliy.loadMask();
				
				orders.getOrders();	
			}
		}
		return  this.ordersStore;
	},
	
	
	createOrdersJsonReader: function(){
    	this.ordersJsonReader = new Ext.data.JsonReader({
                        root: 'data',           // Элемент объекта, содержащий данные
                        //idProperty: 'id',       // Коланка, содержащая Уникальные данные ID
                        fields: [    
								{name: 'order_id', type: 'int'}, 
								'document',
								'firm_name',
								'fio', 
								{name:'office' }, 
								{name: 'status' }   
                        ]

                });
                return this.ordersJsonReader;
      },
	
	showStatus: function(el){ 
			switch(el){
				case '1':
					status = 'Активна';
					break;
				case '2':
					status  = 'Посетитель прошел';
					break;
				default: status = 'Не известно';	
			}
			return status;
	},
	
	getOrderID: function(record){
		if(!record || !Ext.isObject(record)) return false;
		if(!record.data || !Ext.isObject(record.data)) return false; 
		return 	record.data.order_id;
	},
	
	// Выставляем возможные действия
	showStatusAction: function(value, metaData, record, rowIndex, colIndex, store){ 
		// metaData = column 
		img =  '';
		switch(value){
			case '1':
				var img = '<a href="#" onClick="orders.deleteOrder('+ this.getOrderID(record) +')"><img src="source/images/icons/script_delete.png" title="Удалить заявку"></a>';	
		}
		
		return img;
	},
	
	createOrdersGrid: function(){
		
		this.searchField = new Ext.form.TextField({
			enableKeyEvents: true 
		});
		
		this.searchField.on('keyup', function(){orders.onChangeSearchField();}, this);
		
		
		/*this.activeOrdersOnlyCB = new Ext.form.Checkbox({
				id: 'activeOrderOnly',
				style:"margin: 0 44px 0 40px",
				listeners:{
					check: function(){
						//	alert('',this.getValue());
						orders.reloadOrdersStore();
					}	
				}											
		}); */
					
		/*var editor = new Ext.ux.grid.RowEditor({
				saveText: 'Сохранить',
				cancelText: 'Отмена'
			});*/

		
		this.OrdersGrid =  new Ext.grid.EditorGridPanel({
			//renderTo: Ext.get('content'),
			//renderTo: Ext.getBody(), 
			store: orders.ordersStore,
			enableColumnResize: true,
			resizable: true,
			autoWidth:  true,
			border:  false,
			height: 470,
			
			//plugins:[editor],
			//autoHeight: true,
			viewConfig: {
				forceFit:true/*,
				enableRowBody:true,
				showPreview:true,
				getRowClass : function(record, rowIndex, p, store){
					if(this.showPreview){
						p.body = '<p>'+record.data.excerpt+'</p>';
						return 'x-grid3-row-expanded';
					}
					return 'x-grid3-row-collapsed';
				}*/
			},
			tbar:{
				defaults:{
					style:{
						margin: '0 0 0 10px'	
					}	
				},
				bodyStyle:{
					padding: '10px 20px'
				},
				items:[{
					xtype: 'label',
					text: 'Поиск:'
				},
				this.searchField,
				{
					xtype: 'datefield',
					editable: false,
					format: 'Y-m-d',
					id: 'ordersDate',
					allowBlank: false,
					enableKeyEvents: true,
					value: new  Date(),
					listeners:{
						select:  function(){ 
							yliy.loadMask();	
							orders.getOrders();
						}	
					},
					//style:"padding-right:50px;"
					
				},
				{
					xtype: 'checkbox',
					id: 'activeOrderOnly',
					style:"margin:4px 0 0 20px",
					listeners:{
						check: function(){ 
							orders.reloadOrdersStore();
						}	,
						afterrender: function(el){
							 orders.activeOrdersOnlyCB = el;
						}
					},
					scope: orders
				}
				,{
					xtype:'label',
					text: 'Только активные'
				},"-",
				{
					xtype: 'button',
					text: 'Подать заявку',
					icon: 'source/images/icons/script_add.png',
					handler: function(){
						orders.createNewOrderWindow();	
					},
					style:{
						margin: '0 0 0 10px'	
					}
				},"-",
				{
					xtype: 'button',
					//text:'Обновить',  
					//enableToggle: true,
					icon: 'source/images/icons/arrow_refresh.png',
					handler: function(){
						yliy.loadMask();
						orders.ordersStore.reload();	
					}
				}]		
			},
			 
			
			cm: new Ext.grid.ColumnModel({defaultSortable: true, columns: [
				{ header: "order_id", width: 70, sortable: true , resizable:  true, dataIndex:'order_id', hidden: true }, 
				{
					header: 'ФИО посетителя', 
					width: 250, 
					dataIndex:'fio', 
					resizable : true, 
					editor: new Ext.form.TextField({
						listeners:{
							change:function(editor, newValue, oldValue){
								//alert('',this.record);
								var col = editor.el;
								//alert(editor.store ,value);
								 //print_r(col   , 20);
							}
						},
						scope: this
					}),
					listeners:{
						change: function() {
							//alert('','sdf');	
						}	
					}
				} ,
				{header: 'Наименование компании', width: 200, dataIndex:'firm_name', resizable : true, hidden: true} ,
				{header: 'Офис', width: 70, dataIndex:'office', resizable : true}, 
				{header: 'Документ', width: 200, dataIndex:'document', resizable : true}, 
				{header: 'Статус', width: 130, dataIndex:'status', resizable : true, renderer: this.showStatus}  , 
				{header: 'Действие', width: 130, dataIndex:'status', resizable : true,  align: 'center', renderer:{fn: this.showStatusAction, scope: this} } 
			 ]})	
		})
		
		this.OrdersGrid.on('afterrender', function(){ 	
			this.getOrders() 
		}, this);
		
		face.addContent(this.OrdersGrid);
		
		
		 
		 
		return;
	},
	
	deleteOrder:  function(orderID){
		if(!orderID) return false;
		//alert('', orderID);
		Ext.Msg.confirm('Подтверждение удаления заявки', "Удалить заявку на пропуск?", function(act){
			//alert('',act);
			if(act != 'yes'){
				return false;	
			}
			else{
				orders.onDeleteOrder(orderID)	
			}
			return;
		}) 
		
		return;
	},
	
	onDeleteOrder: function(orderID){
		
		yliy.loadMask();
		
		yliy.get({
			data:{
				module: 'orders',
				action: 'deleteOrder',
				orderID:  orderID	
			},
			type: 'POST',
			success:  function(conn, resp){
				//yliy.removeMask();
				
				//alert('', resp.responseText); 
				var t = resp.responseText;
				if(t != 'deleted'){
					yliy.removeMask();
					alert('Ошибка', t);	
				}
				else{ 
					/*orders.ordersStore.each(function(){
						// Если ID совпадает, удаляем запись
						if(this.data.order_id == orderID){  
							this.store.remove(this);	
						}	
					})*/
					setTimeout(orders.getOrders, 2000);
				}	
			}	
		})
		return;
	},
	/*********************************************/
	/*             Новые заявки 				 */
	/*********************************************/
	createNewOrderWindow: function(){
		this.createNewOrderWindow();		// Создаем окно для новой заявки
			
	},
	// Создаем окно для новой заявки
	createNewOrderWindow: function(){ 
		var date =  orders.ordersDate;
		
		var saveButton = new Ext.Button({
			text: 'Сохранить',
			handler:  function(){
				if(!this.onBeforeSaveOrder()) return false;
				this.SaveOrder();				
			},
			scope:this,
			id:'saveOrderButton',
			disabled: true	
		}); 
		
		
		var cancelButton = new Ext.Button({
			text: 'Отмена',
			scope: this,
			handler: function(){
				this.NewOrderWindow.close();	
			}
		})
		
		
		
		this.NewOrderWindow = types.getFixedWin({ 
			title: 'Новая заявка на '+date,
			width: 300,
			height: 200,
			modal: true,  
			items:[{
				xtype: 'vform',
				defaults:{
					enableKeyEvents: true,
					listeners:{
						keyup: function(){
							orders.checkNewOrderIsValid();	
						}	
					}	
				},  
				items:[{
					fieldLabel: 'ФИО',
					id: 'newOrderFIO',
					allowBlank: false
				},{
					fieldLabel: 'Документ',
					id: 'newOrderDoc',
					allowBlank: false	
				},{
					fieldLabel: 'Офис',
					id:  'newOrderOffice',
					allowBlank: false,
					vtype: 'number',
					vtypeText: 'Только цифры',
					enableKeyEvents: true,
					specialkey: function(field, e){
							// e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
							// e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
							if (e.getKey() == e.ENTER) {
								
								if(!orders.onBeforeSaveOrder()) return false;
								orders.SaveOrder();			
							}
						}
				}]	
			}],
			fbar:{
				items:[ saveButton, cancelButton]	
			} 	
		}); 
		
		
		this.newOrderFio = Ext.getCmp('newOrderFIO');
		this.newOrderDoc = Ext.getCmp('newOrderDoc');
		this.newOrderOffice = Ext.getCmp('newOrderOffice');
		this.saveOrderButton = Ext.getCmp('saveOrderButton');
		
		
		this.NewOrderWindow.on('close', function(){this.close();}, this.NewOrderWindow );
		this.NewOrderWindow.show();
	},
	
	checkNewOrderIsValid: function(){  
		if(this.newOrderFio.isValid() && this.newOrderDoc.isValid() && this.newOrderOffice.isValid()){
			this.saveOrderButton.enable();
			return true;	
		}
		else{
			this.saveOrderButton.disable();
			return false	
		} 
	},
	
	onBeforeSaveOrder: function(){
		return this.checkNewOrderIsValid();
	},
	
	SaveOrder: function(){
		if(!Ext.getCmp('newOrderFIO').isValid()){
			Ext.Msg.alert('Ошибка','Не все поля заполнены корректно');
			return false;	
		}
		
		
		this.newOrderFioVal = this.newOrderFio.getValue();
		this.newOrderDocVal = this.newOrderDoc.getValue();
		this.newOrderOfficeVal = this.newOrderOffice.getValue();
		
		//Ext.Msg.alert('',this.newOrderFioVal);
		
		yliy.loadMask(); 
		 
		
		yliy.get({
			type: 'post',
			dataType: 'json',
			data:{
				module: 'orders',
				action: 'saveOrder',
				fio: this.newOrderFioVal,
				doc: this.newOrderDocVal,
				office: this.newOrderOfficeVal,
				orderDate: this.getOrdersDay()
			},
			success: function(conn, resp){ 
				
				//yliy.removeMask();
				//Ext.Msg.alert('',);
				//alert('','asdasdddddfff', function(){alert('fff','sdsd');});
				if(!resp.responseText){
					yliy.removeMask();
					alert('Ошибка', 'Ошибка выполнения запроса');
					return false;	
				}
				
				  
				response = Ext.util.JSON.decode(resp.responseText);
				
				//return;
				
				if(response.err){
					yliy.removeMask();
					Ext.Msg.alert('Ошибка',response.err);	
					return false;
				}
				else{
					if(!Ext.isObject(response.result) || response.result.result != 'Сохранено' || !response.result.id){
						yliy.removeMask();
						alert('Ошибка', 'Ошибка сохранения заявки');
						return false;	
					}
				 	orders.newOrderID = response.result.id
					
					// Создаем новую запись заявки
					//orders.createNewOrderRecord();
					//alert('',typeof );	
					//print_r(response.result);
					//yliy.loadMask();
					orders.getOrders();
					return;
				}
				//Ext.Msg.alert('',response);	
			}	
		})
		
		this.NewOrderWindow.close(); 
		return;
	},
		
	// Создаем новую запись заявки			
	createNewOrderRecord: function(){
		if(!orders.newOrderID) return false;
		
		var record = new Ext.data.Record({  
			status: '1',
			order_id:this.newOrderID,
			fio: this.newOrderFioVal ,
			document: this.newOrderDocVal,
			office:  this.newOrderOfficeVal	  
		})
					
		this.ordersStore.add(record);
		return true;	
	},			 
	
	// Функция поиска 
	onChangeSearchField: function(){
		this.reloadOrdersStore();		// Перезагружаем хранилище
		//orders.ordersStore.reload();
	},
	
	reloadOrdersStore: function(){
		this.searchWord = this.searchField.getRawValue().replace(/\//g, '\\/') || '.';
		
		 
		this.activeOnly = orders.activeOrdersOnlyCB.getValue();
		//alert('',this.activeOnly);
		//alert('',word);
		this.newData = {data: []};
		
		/*if(!this.searchWord){
			this.ordersStore.loadData(this.storeRawData);
			return;
		}*/
		
		var data =  this.storeRawData.data;	  
		
		for(i in data){
			if(Ext.isFunction(data[i])) continue;
			//alert('',eval('/'+ word +'/').test(data[i].fio) );
			 
			
			// Отображаем только активные
			if(orders.activeOnly && data[i].status != '1'){
				//alert('',data[i].status);
				 continue;	
			}
			
			
			if(eval('/'+ this.searchWord +'/i').test(data[i].fio) || eval('/'+ this.searchWord +'/i').test(data[i].firm_name)){
				//alert('',this.searchWord);
				//print_r(data[i]);
				this.newData.data[this.newData.data.length] = data[i];	
			}
		}
		//alert('',newData.data.length);
		if(this.newData.data.length<1){
			this.ordersStore.removeAll();	
		}
		else{
			this.ordersStore.loadData(this.newData);	
		}
			
	}
	
	, reloadOrders: function(){
		orders.getOrders();	
		//setTimeout(orders.reloadOrders, 3000);
	}
	
	/*********************************************/
	/*            End заявки 		    		 */
	/*********************************************/
		
}

yliy.modules.orders = orders;
