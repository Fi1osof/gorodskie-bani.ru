Ext.onReady(function(){
	Ext.getUrlParam = function(param) {
		var params = Ext.urlDecode(location.search.substring(1));
		return param ? params[param] : params;
	};
	Ext.getCmp('modx-panel-users').findByType('modx-grid-user')[0].on('rowcontextmenu', function(grid, rowIndex, e ){
		grid.addContextMenuItem(['-',{
			text: _('switchuser_menu_auth')
			,handler: function(){
				var resource_id = Ext.getUrlParam('resource');

				var form = document.createElement("form");
				var hidden = document.createElement("input");
				hidden.type = "hidden";
				hidden.name = "switch_user";
				hidden.value = this.menu.record.id;
				var resource = document.createElement("input");
				resource.type = "hidden";
				resource.name = "resource";
				resource.value = resource_id;
				form.method = "GET";
				form.action = MODx.config.site_url;
				form.target = "_self";
				form.appendChild(hidden);
				form.appendChild(resource);
				document.body.appendChild(form);
				form.submit();
			}
			,scope: this
		}]);
	});
});