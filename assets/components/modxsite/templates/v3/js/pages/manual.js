requireConfig.paths.Application = '../../libs/ui/js/application';
require.config(requireConfig);



define('Layout',[
    "jQuery",
    "jQueryUI",    
    "TouchPunch",    
    "BS",    
    "BSSelect",    
    "BSSwitch",    
    "Checkbox",    
    "Radio",    
    "TagsInput",    
    "Placeholder",     
    "Application",     
]);


define("Fkit",["F/core/f"]);

require([
    'jQuery',
    'Layout',
    'Modxclub'
], function() {
    
    $(function(){
        
        console.log('manualpage')
        
    });
    
});