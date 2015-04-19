require('es5-shim');
var $ = require('jQuery');
var Request = require("./utils/request");
var Env = require('./constants/Env');

Request = Object.create(Request).init({
  connectorsUrl: Env.siteConnectorsUrl,
  connector: Env.connector
});


$(function() {

    /*
        Авторизация
    */
  $('[data-smodx-behav="recount"]').remove();
  $("#loginLoginForm [type=submit]").on('click', function() {
    var form = $(this).parents('form:first');
    var data = [];

    form.serialize().split('&').map(function(node) {
      if (node.match('action')) return;
      this.push(node);
    }, data);

    Request.run('login', data.join('&'))
      .then(function(resp) {
        if (resp.success) {
          var url = window.location.href.replace(/\?.*/, '');
          url = url.replace(/#.*/, '');
          window.location.replace(url);
        }
      });

    return false;
  });
  
  
    
    /*
        Рейтинги
    */
    // $('.rating').on('click', function(e){
    //     console.log('sdgsdgs');
    //     $('[data-target="#VotesModal"]').click(e);
    //     return false;
    // });
    
    // $('[data-target="#VotesModal"]').on('click', function(){
    //     console.log('sdgsdgs');
    //     return false;
    // });
    
    $('#VotesModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        // var product_id = button.data('product_id'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        // modal.find('[name=product_id]').val(product_id);
    });
    
    (function(){
        
        var _PercentMeter,PercentMeter;

        _PercentMeter = function(config){
            this.config = config || { };
            this.init();
        }
        _PercentMeter.prototype = {
            init:function(){
                var _observer = this.getEl('observer');
                var ruler_selector = this.getEl('ruler');
                // console.log(_observer);
                
                // $(this.getEl('container')).append('<span class="'+_observer.replace('.','')+'"></span>');
                // $(_observer).css({
                //     position:'absolute'
                //     // ,left:0
                //     // ,top:0
                //     // ,height:'15px'
                //     // ,width:'100%'
                //     ,'z-index':10
                // })
                
                $(this.getEl('container')).each(function(el){
                    var container = $(this);
                    var ruler = container.find(ruler_selector);
                    var observe = $('<span class="'+_observer.replace('.','')+'"></span>');
                    observe.append(ruler);
                    container.append(observe);
                    observe.css({
                        position:'absolute' 
                        ,'z-index':11
                    })
                });
                 
    
                this.bindEvents();
            }
            ,bindEvents:function(){
                var 
                    scope = this
                    ,_observer = $(this.getEl('observer'))
                ;
                
                // console.log(_observer);
                
                _observer.on('mousemove',function(e){
                    var 
                        el = $(this)
                        ,ruler = el.parents(scope.getEl('container') + ':first').find(scope.getEl('ruler'))
                        ,coef = scope.percentCount.call(ruler,e,el.width()) 
                    ;
                    // console.log(el,el.width())
                    
                    // +.1 is for correct cursor visualisation
                    el.data('value',coef+0.1);
                    ruler.width(((coef+0.1)*100) + '%');
                });
                
                _observer.on('mouseleave',function(){
                    var 
                        _el = $(this)
                        ,_rating = Math.round(_el.data('value')*5)
                    ;
                    
                    scope.onRulerClick({
                        rating: _rating
                    });
                });
                
                _observer.on('click',function(e){
                    var 
                        el = $(this)
                        ,_rating = Math.round(el.data('value')*5)
                    ;
                    
                    scope.onRulerClick({
                        rating: _rating
                    });
                     
                     
                    // console.log(this);
                    // console.log(_rating);
                    var 
                        container = el.parents(scope.getEl('container') + ':first')
                        ,value_field = container.find('[name="vote_value"]')
                        ,value = value_field.val()
                        ,target_id = value_field.data('target_id')
                        ,type = value_field.data('type')
                    ;
                    
                    // console.log(el);
                    // console.log(el.parents(scope.getEl('container')));
                    // console.log(el.parents(scope.getEl('container') + ':first'));
                    // console.log(value);
                    // console.log(target_id);
                    // console.log(type);
                    // console.log(value_field);
                    
                    
                    // return;
                    if(value > 5 && value < 6){
                        value = 5;
                    }
                    
                    // console.log(value);
                    
                    var data = {
                        vote_value: value
                        ,target_id: target_id
                        ,type: type
                    };
                    
                    Request.run('ratings/company/vote/create', data)
                        .then(function(resp) {
                            if (resp.success) {
                              // var url = window.location.href.replace(/\?.*/, '');
                              // window.location.replace(url);
                                if(resp.success){
                                    alertify.success(resp.message || "Ваш голос успешно принят!");
                                }
                            }
                    });
                    
                    return false;
                })
            }
            ,onRulerClick:function(data){
                this.config.actions.setRating.apply(this,arguments)
            }
            ,percentCount:function(e,width){                    
                var 
                    offset = e.offsetX || e.originalEvent.layerX
                ;
                return offset/width || 0;
            }
            ,getEl:function(key){
                if(key){
                    return this.config.elements[key];
                }
            }
            
        };
        
        $(function(){
            window.PercentMeter = new _PercentMeter({
                elements:{
                    container: '.rating__wrap.voter > .stars'
                    ,ruler: '.ruler'
                    ,bg: '.bg'
                    ,observer: '.observer'
                }
                ,actions:{
                    setRating: function(data){
                        $('input[name="vote_value"]').val(data.rating);
                    }
                }
            });
        })
        
    }).call(this);
        
        /* Eof Rating */
 
});



