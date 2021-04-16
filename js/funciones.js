function slide1() {

  var owl = $(".slide-1");

  owl.owlCarousel({

    //autoPlay: true, //Set AutoPlay to 3 seconds
    slideSpeed: 250,
    autoHeight : true,
    lazyLoad: true,
    items : 3, //10 items above 1000px browser width
    itemsTablet: [700,2], //2 items between 600 and 0
    itemsMobile : [600,1], // itemsMobile disabled - inherit from itemsTablet option
    pagination:false,
    transitionStyle: "fade"


  });

  $(".right1").click(function () {
    owl.trigger('owl.next');

  })
  $(".left1").click(function () {
    owl.trigger('owl.prev');

  })

}

function slide2() {

  var owl = $(".slide-2");

  owl.owlCarousel({

    //autoPlay: true, //Set AutoPlay to 3 seconds
    slideSpeed: 250,
    autoHeight : true,
    lazyLoad: true,
    items : 4, //10 items above 1000px browser width
    itemsTablet: [700,3], //2 items between 600 and 0
    itemsMobile : [600,1], // itemsMobile disabled - inherit from itemsTablet option
    pagination:false,
    transitionStyle: "fade"


  });

  $(".right2").click(function () {
    owl.trigger('owl.next');

  })
  $(".left2").click(function () {
    owl.trigger('owl.prev');

  })

}

function slide3() {

  var owl = $(".slide-3");

  owl.owlCarousel({

    //autoPlay: true, //Set AutoPlay to 3 seconds
    slideSpeed: 250,
    autoHeight : true,
    lazyLoad: true,
    items : 4, //10 items above 1000px browser width
    itemsTablet: [700,3], //2 items between 600 and 0
    itemsMobile : [600,1], // itemsMobile disabled - inherit from itemsTablet option
    pagination:false,
    transitionStyle: "fade"


  });

  $(".right3").click(function () {
    owl.trigger('owl.next');

  })
  $(".left3").click(function () {
    owl.trigger('owl.prev');

  })

}

function menu(e) {

  $(".open-menu").click(function (e) {
    $('.links').css('left', '0');
    $('.links').css('opacity', '1');
    $('.cerrar-menu').css('left', '0');
  })

  $(".cerrar-menu").click(function (e) {
    $('.links').css('left', '-100%');
    $('.links').css('opacity', '0');
    $('.cerrar-menu').css('left', '-100%');
  })

}

$(document).ready(function () {

  slide1()
  slide2()
  slide3()
  menu()


});

$(window).resize(function () {

  slide1()
  slide2()
   
});

$(window).load(function(){
  
})