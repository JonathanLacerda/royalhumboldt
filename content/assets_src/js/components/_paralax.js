/*
|--------------------------------------------------------------------------
| Parallax
|--------------------------------------------------------------------------
*/

APP.component.Parallax = {

    init : function () {
    	this.setup()
    	this.start();
    },

    start : function(){

    	var _this = this ;

    	this.checkLoad();
    	this.detectMouseMove();
    	this.onResize();
    	this.getPerspective();

    	window.requestAnimationFrame(function(){
			_this.halfWindowH = $(window).height()*0.5,
			_this.halfWindowW = $(window).width()*0.5;
			_this.initBackground();
		});
    },

    setup: function(){
		this.halfWindowH = $(window).height()*0.5;
		this.halfWindowW = $(window).width()*0.5;
		this.maxRotationY = 7;
		this.maxRotationX = 5;
		this.aspectRatio;
    },

    checkLoad: function(){
    	var _this = this;

		$('.cd-floating-background').find('> div').eq(0).load(function() {
			_this.aspectRatio = $(this).width()/$(this).height();
	  		if( $('html').hasClass('preserve-3d') ) _this.initBackground();
		}).each(function() {
	  		if(this.complete) $(this).load();
		});    	
    },

    detectMouseMove: function(){
    	var _this = this;

		$('.cd-background-wrapper').each(function(){
			$(this).on('mousemove', function(event){
				var wrapperOffsetTop = $(this).offset().top;
				if( $('html').hasClass('preserve-3d') ) {
					window.requestAnimationFrame(function(){
						_this.moveBackground(event, wrapperOffsetTop);
					});
				}
			});
		});
    },

    onResize: function(){
    	var _this = this;

		$(window).on('resize', function(){
			if( $('html').hasClass('preserve-3d') ) {
				window.requestAnimationFrame(function(){
					_this.halfWindowH = $(window).height()*0.5,
					_this.halfWindowW = $(window).width()*0.5;
					_this.initBackground();
				});
			} else {
				$('.cd-background-wrapper').attr('style', '');
				$('.cd-floating-background').attr('style', '').removeClass('is-absolute');
			}
		});
    },

    initBackground: function(){
    	var _this = this;

		var wrapperHeight = Math.ceil(_this.halfWindowW*2/_this.aspectRatio), 
			proportions = ( _this.maxRotationY > _this.maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - _this.maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - _this.maxRotationX*Math.PI/180)),
			newImageWidth = Math.ceil(_this.halfWindowW*2*proportions),
			newImageHeight = Math.ceil(newImageWidth/_this.aspectRatio),
			newLeft = _this.halfWindowW - newImageWidth/2,
			newTop = (wrapperHeight - newImageHeight)/2;
		$('.cd-background-wrapper').css({
			'height' : wrapperHeight,
		});	
		$('.cd-floating-background').addClass('is-absolute').css({
			'left' : newLeft,
			'top' : newTop,
			'width' : newImageWidth,
		});
    },

    moveBackground: function(event, topOffset){
    	var _this = this;

		var rotateY = ((-event.pageX+ _this.halfWindowW)/_this.halfWindowW)*_this.maxRotationY,
			yPosition = event.pageY - topOffset,
			rotateX = ((yPosition- _this.halfWindowH)/_this.halfWindowH)*_this.maxRotationX;

			if( rotateY > _this.maxRotationY) rotateY = _this.maxRotationY;
			if( rotateY < -_this.maxRotationY ) rotateY = -_this.maxRotationY;
			if( rotateX > _this.maxRotationX) rotateX = _this.maxRotationX;
			if( rotateX < -_this.maxRotationX ) rotateX = -_this.maxRotationX;

			$('.cd-floating-background').css({
				'-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			    '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
				'-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
				'-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
				'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			});
    },

    getPerspective: function(){
    	var _this = this;

		var element = document.createElement('p'),
			html = document.getElementsByTagName('html')[0],
			body = document.getElementsByTagName('body')[0],
			propertys = {
		        'webkitTransformStyle':'-webkit-transform-style',
		        'MozTransformStyle':'-moz-transform-style',
		        'msTransformStyle':'-ms-transform-style',
		        'transformStyle':'transform-style'
		    };

		    body.insertBefore(element, null);

		    for (var i in propertys) {
		        if (element.style[i] !== undefined) {
		            element.style[i] = "preserve-3d";
		        }
		    }

		    var st = window.getComputedStyle(element, null),
		        transform = st.getPropertyValue("-webkit-transform-style") ||
		                    st.getPropertyValue("-moz-transform-style") ||
		                    st.getPropertyValue("-ms-transform-style") ||
		                    st.getPropertyValue("transform-style");

		    if(transform!=='preserve-3d'){
		      html.className += ' no-preserve-3d';
		    } else {
		    	html.className += ' preserve-3d';
		    }
		    document.body.removeChild(element);
    }
};
