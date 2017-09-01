F = {
	isDefined: function(v) {
		return typeof v !== 'undefined';
	},
	isObject: function(o) {
		return ( !! o) && (o.constructor == Object);
	},
	_extend: function(D, A, preserveConstructor) {
		var _proto = function() {};
		_proto.prototype = A.prototype;
		D.prototype = new _proto();
		D.prototype.constructor = D;
        
        if(!preserveConstructor) A.prototype.constructor = A;
        
		D.superclass = A.prototype;
	},
	extend: function(D, A, O, PC) {
		PC = PC || false;
		F._extend(D, A, PC);
		if (typeof O !== 'undefined') F.mixin(D.prototype, O);
	},
	mixin: function(dst, src) {
		var tobj = {};
		for (var x in src) {
			if ((typeof tobj[x] == "undefined") || (tobj[x] != src[x])) {
				dst[x] = src[x];
			}
		}
		// toString method doesn't exist at for..in in IE
		if (document.all && !document.isOpera) {
			var p = src.toString;
			if (typeof p == "function" && p != dst.toString && p != tobj.toString &&
				p != "\nfunction toString() {\n    [native code]\n}\n") {
				dst.toString = src.toString;
			}
		}
	},
	apply: function(o, c, defaults) {
		if (defaults) {
			F.apply(o, defaults);
		}
		if (o && c && typeof c == 'object') {
			for (var p in c) {
				o[p] = c[p];
			}
		}
		return o;
	},
	applyDeep: function(o, c, defaults) {
		if (o && c && typeof c == 'object') {
			for (var p in c) {
				if (F.isObject(c[p]) && F.isObject(o[p])) {
					o[p] = F.apply(o[p], c[p]);
				} else {
					o[p] = c[p];
				}
			};
		}
		return o;
	},
	applyIf: function(o, c) {
		if (o) {
			for (var p in c) {
				if (!F.isDefined(o[p])) {
					//console.log(o,arguments);
					o[p] = c[p];
				}
			}
		}
		return o;
	},
	isEmpty: function() {
		var obj = this;
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) return false;
		}
		return true;
	}
};

_FLog = function(){};
_FLog.prototype = {
    chkEngine:function(){
        if(typeof console == undefined) throw new Error('Console !defined').stack;    
    },
    chkMethod:function(mode){
        this.method = console[mode];
        if(typeof method == undefined) throw new Error('Console engine don\'t have called method').stack;    
    },
    log: function(){
        this.chkEngine();
        this.chkMethod('log');
        
        var args = Array.prototype.slice.call(arguments,0);
        args.unshift('Flog');
        
        args.length > 1 && this.method.apply(console,args);
        return;
    },
    warn: function(){
        this.chkEngine();
        this.chkMethod('warn');
        
        var args = Array.prototype.slice.call(arguments,0);
        
        args.length > 0 && this.method.apply(console,args);
        return;
    },
    profile: function(callback){
        this.chkEngine();
        console.profile();
        callback();
        console.profileEnd();        
    },
    time: function(callback,name){
        this.chkEngine();
        name = name || 'Flog timer';
        console.time(name);
        callback();
        console.timeEnd(name);        
    }
}
F.mixin(F,Object.create(_FLog.prototype));
