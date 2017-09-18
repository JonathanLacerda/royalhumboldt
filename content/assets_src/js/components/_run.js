/*
|--------------------------------------------------------------------------
| Run
|--------------------------------------------------------------------------
*/

APP.component.Run = {

    init : function () {
    	this.setup()
    	this.start();
    },

    start : function(){
    	this.run();
    },

    setup: function(){
    	this.elm = $('.jcl__run-obj');
    	this.box = $('.jcl__logo');
		this.elmTop = this.box.offset().top;
		this.elmLeft = this.box.offset().left,
		this.elmTopFinal = this.elmTop + this.box.innerHeight(),
		this.elmLeftFinal =  this.elmLeft + this.box.innerWidth();
    },

    run: function(){
    	var _this = this;

    	_this.elm.each(function(){
			_this.generatePosition($(this));
    	});

		_this.elm.on('mouseenter',function(e){
			_this.generatePosition($(this));
			_this.generateRotate($(this));
		});
    },

    generateRotate: function(elm){
    	var _this = this;

    	elm.css({
    		'transform' : 'rotate('+_this.getRandomRotate(900)+'deg)'
    	});
    },

    generatePosition: function(elm){
    	var _this = this;

  		var maxX = $(window).width() - elm.width();
	    var maxY = $(window).height() - elm.height(); 

	    elm.css({
	        'left':_this.getRandomInt(0, maxX),
	        'top':_this.getRandomInt(0, maxY)
	    });
    },

    getRandomRotate: function(maxDeg){
    	return Math.floor((Math.random() * maxDeg) + 0);
    },

   	getRandomInt: function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};
