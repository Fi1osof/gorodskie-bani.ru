var modxclub = new(function(){
    var self = this;
    
    this.init = function(){
        this.addListeners();
    
    }
    
    this.addListeners = function(){
        this.addAjaxFormsListers();
    }
    
    this.addAjaxFormsListers = function(){
        $('form.ajax').on('submit', this.onSubmit);
    }
    
    this.onSubmit = function(){
        var form = $(this);
        $.ajax({
            'url': form.attr('action'),
            'type': 'post',
            'dataType': 'JSON',
            'data': form.serializeArray(),
            'error': function(){
                alert('Request error');
            },
            'success': function(response){
                try{
                    if(response.success){
                        if(response.message){
                            alert(response.message);
                        }
                        if(response.object && response.object.callback){
                            eval(response.object.callback + '()');
                        }
                        return;
                    }
                    else{
                        alert(response.message || 'Request error');
                    }
                }
                catch(e){
                    alert('Request error');
                }
            }
        });
        return false;
    }
    
    $(document).ready(function(){
        self.init();
    });
    
    return this;
})()