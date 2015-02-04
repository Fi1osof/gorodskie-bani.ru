// JavaScript Document
messages =  {
	reloadMessagesTime: 60000,		// Время перезагрузки сообщений в мс
	init: function(){
		return;
		
		Ext.onReady(function(){
			//alert('', this.init);
			this.onLoad();	
		}, this);
	},
	
	
	onLoad: function(){
		//setTimeout(this.getMessages,  this.reloadMessagesTime	);
		this.getMessages();
	},
	
	getMessages:  function(){ 
		
		seo.get({
			type: 'post',
			data:{
				module: 'messages',
				action:	'getNewMessages'
			},
			success: function(conn, resp){
				msgs = '';
				if(!resp.responseText) return false;
				try{
					msgs = Ext.util.JSON.decode(resp.responseText)	
				}
				catch(err){
					//alert('', err);	
				}
				if(!msgs || !msgs.length)	{
					return false;	
				}  
				// Обновляем Стор
				orders.ordersStore.reload();
				
				limit = 5;
				for(i in msgs){
					limit--;
					if(limit < 1) break;
					if(Ext.isFunction(msgs[i])) continue;
					//print_r(msgs[i]);	
					//alert();
					widget.showNotification(msgs[i].msg);
				}
				
				//print_r(msgs);
			}	
		})
		setTimeout(messages.getMessages, messages.reloadMessagesTime	);	
	}
}

messages.init();