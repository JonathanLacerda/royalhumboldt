/*
|--------------------------------------------------------------------------
| General
|--------------------------------------------------------------------------
*/

APP.controller.General = {

    init: function(){
        this.setup();
        this.start();
        this.events();
    },

    start: function(){
        this.homeHeight();
        this.letterTitle();
    },

    setup : function(){
        this.body = $('body');
        this.home = $('.rhb__home');
        this.clickMenu = $('#rhb__menu');
        this.menu = $('menu');
        this.window = $(window);
    },

    header:function(){
        _this = this;

    },

    homeHeight: function(){
        var _this = this,
            hWindow = _this.window.innerHeight();

            _this.home.css('height', hWindow);
            _this.menu.css('height', hWindow);
    },

    parallaxIt: function(){
        var scrolled = $(window).scrollTop();
        $('.rhb__quality-obj, .rhb__quality-obj02').css('top',-(scrolled*0.2)+'px');
    },

    letterTitle: function(){
        var _this = this;

        $('.rhb__title-letter').each(function(){
            var text = $(this).text().replace(/^\s+|\s+$/g,"");

            $(this).append('<span class="rhb__letter-behind">'+text[0]+'</span>');
        });
    },

    scrollToAnchor: function(aid){
        console.log(aid);
        var aTag = $("#"+aid);
        $('html,body').animate({scrollTop: aTag.offset().top - 50},'fast');
    },

    events: function(){
        var _this = this;

        _this.clickMenu.click(function(){
            $(this).find('img').eq(0).toggle();
            $(this).find('img').eq(1).toggle();

            _this.menu.fadeToggle(200);
        });

        $(window).scroll(function(e){
            if($(window).scrollTop() > 0) {
                $('header').addClass('fixed');
            }else{
                $('header').removeClass('fixed');
            }
            _this.parallaxIt();
        });

        $(window).resize(function(){
            _this.homeHeight();
        });

        $('menu a').click(function(e){
            e.preventDefault();
            _this.clickMenu.find('img').eq(0).toggle();
            _this.clickMenu.find('img').eq(1).toggle();
            _this.menu.fadeToggle(200);

            var item = $(this).attr('href').replace('#','');

            _this.scrollToAnchor(item);
        })
    }
};



