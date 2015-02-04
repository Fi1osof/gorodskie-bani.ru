// JavaScript Document
profile = {
	initialized: false,
	
	init: function(){ 
		return;
		this.createToolBar();
		
		this.initialized = true;
		//this.createChangePasswordButton();	
	},
	
	destroy: function(){
		if(!this.initialized)return;
		this.ChangePasswordButton.destroy();
		this.initialized = false;
	},
	
	createToolBar: function(){ 
		//face.bbar.doLayout();
		
		face.tbar.add({
			xtype: 'toolbar', 
			items:[this.createChangePasswordButton()]
		})   
		return;
		
	}, 
	
	createChangePasswordButton: function(){
		
		this.ChangePasswordButton = new Ext.Button({
			/*style: {
				position: 'absolute',
				right: '100px',
				top: '4px'	
			},*/
			icon:  'source/images/icons/bullet_key.png',
			//renderTo: Ext.getBody(),
			text: 'Сменить  пароль',
			handler:function(){
				profile.createChangePasswordWindow();	
			}		
		})
		
		return this.ChangePasswordButton;	
	},
	
	createChangePasswordWindow: function(){
		this.ChangePasswordWindow = types.getFixedWin({
			closable: false,
			title: 'Смена пароля',
			items:[{
				xtype: 'vform',
				items:[{
					fieldLabel: 'Старый пароль',
					allowBlank: false,
					inputType: 'password',
					id: 'f_old_pass'
				},{
					fieldLabel: 'Новый пароль',
					allowBlank: false,
					inputType: 'password',
					id: 'f_new_pass',
					vtype: 'password'
				},{
					fieldLabel: 'Подтвердите пароль',
					allowBlank: false,
					inputType: 'password',
					id: 'f_new_pass_2',
					vtype: 'password'
				}]	
			}],
			fbar:{
				items:[{
					text: 'Сохранить',
					scope: this,
					handler:function(){
						//alert(this.init);	
						//this.ChangePasswordWindow.close();
						if(!this.onBeforeSaveNewPass()){
							return false;	
						}
						
						if(!this.onSaveNewPass()){
							return false;	
						}
						
						return this.onAfterSaveNewPass();  
					}		
				},
				{
					text: 'Отмена',
					scope: this,
					handler:function(){
						//alert(this.init);	
						this.ChangePasswordWindow.close();
					}	
				}]	
			}	
		});
		this.ChangePasswordWindow.show();	
	},
	
	onBeforeSaveNewPass: function(){
		this.f_old_pass = Ext.getCmp('f_old_pass');
		this.f_new_pass = Ext.getCmp('f_new_pass');
		this.f_new_pass_2 = Ext.getCmp('f_new_pass_2');
		
		if(!this.f_old_pass.isValid() || !this.f_new_pass.isValid() || !this.f_new_pass_2.isValid()){
			alert('Ошибка', "Не все обязательные поля заполнены");
			return false;	
		}
		
		this.f_old_passVal  =  this.f_old_pass.getValue();
		this.f_new_passVal  =  this.f_new_pass.getValue();
		this.f_new_pass_2Val  =  this.f_new_pass_2.getValue();
		
		if( this.f_new_passVal != this.f_new_pass_2Val){
			alert('Ошибка', "Новый пароль и подтверждение не совпадают");
			return false;	
		}
		 
		
		return true;
	},	
	
	onSaveNewPass: function(){ 
		yliy.loadMask();
		yliy.get({
			type: 'post',
			data:{
				module: 'auth',
				action: 'changePass',
				oldPass: this.f_old_passVal	,
				newPass: this.f_new_passVal,
				newPass_2: this.f_new_pass_2Val
			},
			success: function(conn, resp){
				response = resp.responseText;
				if(!response){
					yliy.removeMask();
					alert('Ошибка', "Ошибка выполнения запроса");
					return false;	
				}
				else if(response != 'changed'){
					yliy.removeMask();
					alert('Ошибка', response);
					return false;	
				}
				else{
					yliy.removeMask();
					alert('Сообщение Системы', "Пароль успешно изменен", function(){
						profile.ChangePasswordWindow.close();
					});	
					return true;
				}
			}	
		})
		 
		return true;
	},
	
	onAfterSaveNewPass: function(){ 
		
	}
	
	
	
	
}

yliy.modules.profile = profile;





 