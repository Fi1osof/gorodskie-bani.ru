define('Modxclub',["Dom","Lodash","Fkit","ES5Shim"],function(dom){
    
    _Modxclub = function(config){
        config = config || {};
        this.config = F.applyIf(config, this.config);
        this.debug = this.config.debug || false;
    }
    _Modxclub.prototype = {
        // default config
        dom:dom,
        providers:{},
        config:{
            cmpFlag:'modxclub'
            ,connectorsUrl:'/assets/components/modxsite/connectors/'
            ,connector: 'connector.php'
        }
        ,getConfig:function(){
            return this.config;
        }
        ,getObj:function(val,cls){
            
            var 
                selector = this.getSelector(val,cls),
                obj = this.dom(selector)    
            ;
            
            if(!obj.length){
                this.debug && F.warn(this.config.cmpFlag + ' ' + selector + ' object !found');
                obj = this.dom(val);
            }
            
            if(!obj.length){
                this.debug && F.warn(val + ' object !found');
                return {};
            }
            return obj;
        }
        ,getSelector:function(val,cls){
            var val = val || this.objClsVal || 'express';
            return '['+this.getDataKey(cls)+'="'+val+'"]';
        },
        getDataKey:function(key){
            var cls = key || this.objClsKey || 'obj'
                delimiter = '-';
            ;
            var key = [
                'data'
                ,this.config.cmpFlag
                ,cls
            ];
            
            return key.join(delimiter);
        }
    }
    
    _MODXCLUB = function(){    
        _MODXCLUB.superclass.constructor.apply(this,arguments);
    }
    F.extend(_MODXCLUB,_Modxclub,{
        // here you can redefine prototype methods
    });
    
    MODXCLUB = new _MODXCLUB();
    
    // init modules, etc.
    F.applyIf(MODXCLUB,{
        modules:{}
        ,widgets:{}
    });
    
})