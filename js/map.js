/* Mapa */


//img to svg
$(document).ready(function () {
  //img tag to svg 
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });


});
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////interactive map//////////////////////////
var img;
var width;
var height;
var c;
var ctx;
function runInteractiveMap() {
  // if($.browser.msie == true){
  //   $("#mapCanvas").css("display","none");
  //   $("#mapDiv").css("display","none");
  //   return 0;
  // }
  (function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  img = document.getElementById('mapWrap');
  c = document.getElementById('mapCanvas');
  ctx = c.getContext("2d");

  updateCanvas();
  loadVectors();
  drawVectors();
  setMouseHandler();
  mainLoop();

  window.addEventListener("resize", function () {
    updateCanvas();
  });
}

var screenWidth;
function updateCanvas() {

  img = document.getElementById('mapImg');
  width = parseInt(window.getComputedStyle(img, null).getPropertyValue("width"));
  height = parseInt(window.getComputedStyle(img, null).getPropertyValue("height"));

  c.width = width;
  c.height = height;

  $("#mapDiv").css("width", width);
  $("#mapDiv").css("height", height);

  screenWidth = $(window).width();

  updateInfoPos();
  drawVectors();
}

//////////////////////////////////////////////////support

function getPos(num, position) {
  if (position = "w") {
    return (c.width / 100) * num;
  }
  else if (position = "h") {
    return (c.width / 100) * num;
  }
}
function getInvPos(num, position) {
  if (position = "w") {
    return (num * 100) / c.width;
  }
  else if (position = "h") {
    return (num * 100) / c.height;
  }
}

function checkCol() {
  for (var i = 0; i < vectors.length; i++) {

    var temp = vectors[i].x + vectors[i].width;
    var temp1 = vectors[i].x;
    var temp2 = vectors[i].y + vectors[i].height;
    var temp3 = vectors[i].y;

    if (mousePos.x < temp && mousePos.x > temp1 && mousePos.y < temp2 && mousePos.y > temp3) {
      // console.log("colide"+i);
      return i;
    }
  }
  return null;
}

///////////////////////////////////////////////////////////mouse handler
var mousePos = 0;
function getMousePos(e) {
  var rect = c.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

var inCanvas = null;
var clickedOn = null;
function setMouseHandler() {

  /*  c.addEventListener('mousemove', function(evt) {
    
     if(screenWidth < 720){
      return 0;
     }
     
     mousePos = getMousePos(evt);
     mousePos.x = getInvPos(mousePos.x,"w");
     mousePos.y = getInvPos(mousePos.y,"h");
     clickedOn=checkCol();
    }, false);
  */
  /*
      if(screenWidth > 720){
  
        c.addEventListener('mousemove', function(evt) {
  
         mousePos = getMousePos(evt);
         mousePos.x = getInvPos(mousePos.x,"w");
         mousePos.y = getInvPos(mousePos.y,"h");
         clickedOn=checkCol();
        }, false);
  
      }
  */
  c.addEventListener('click', function (evt) {

    mousePos = getMousePos(evt);
    mousePos.x = getInvPos(mousePos.x, "w");
    mousePos.y = getInvPos(mousePos.y, "h");
    clickedOn = checkCol();
  }, false);

  $("#mapCanvas")
    .mouseenter(function () {
      $('.container').css('user-select', 'none');
      $('.container').css('-webkit-user-select', 'none');
      $('.container').css('-moz-user-select', 'none');
      inCanvas = true;
      // mainLoop();
    })

    .mouseenter(function () {
      $('.icon-cerrar').css('user-select', 'none');
      $('.icon-cerrar').css('-webkit-user-select', 'none');
      $('.icon-cerrar').css('-moz-user-select', 'none');
      inCanvas = true;
      // mainLoop();
    })

    .mouseleave(function () {
      $('.container').css('user-select', 'initial');
      $('.container').css('-webkit-user-select', 'initial');
      $('.container').css('-moz-user-select', 'initial');
      inCanvas = false;
      mousePos.x = -10;
      mousePos.y = -10;
    });


  // c.addEventListener('mousemove', function(evt) {
  //   mousePos = getMousePos(evt);
  //   mousePos.x = getInvPos(mousePos.x,"w");
  //   mousePos.y = getInvPos(mousePos.y,"h");
  // }, false);
  // c.addEventListener('click', function(evt) {
  //   var mousePos1 = getMousePos(evt);
  //   mousePos1.x = getInvPos(mousePos1.x,"w");
  //   mousePos1.y = getInvPos(mousePos1.y,"h");
  //   console.log(mousePos1);
  // }, false);
}


////////////////////////////////////////////////////////locations
var pins = document.getElementsByClassName("pinMap");
var vectors = [];
function vector() { }
vector.prototype = {
  contructor: vector,
  name: "",
  size: "",
  x: 0,
  y: 0,
  width: 5,
  height: 5,
  infoX: 0,
  infoY: 0,
  status: "idle",
}

function loadVectors() {

  screenWidth = $(window).width();

  vectors = [];
  vectors.push(new vector());
  vectors[vectors.length - 1].name = "0";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 38;
  vectors[vectors.length - 1].y = 28;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '35%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "1";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 44;
  vectors[vectors.length - 1].y = 25;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '36%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "2";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 40;
  vectors[vectors.length - 1].y = 15;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '15%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "4";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 48;
  vectors[vectors.length - 1].y = 25;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '48%';
    vectors[vectors.length-1].infoY = '25%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "5";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 45;
  vectors[vectors.length - 1].y = 30;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '45%';
    vectors[vectors.length-1].infoY = '30%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "6";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 78;
  vectors[vectors.length - 1].y = 26;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '65%';
    vectors[vectors.length-1].infoY = '28%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "7";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 75;
  vectors[vectors.length - 1].y = 30;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '60%';
    vectors[vectors.length-1].infoY = '32%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "8";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 74;
  vectors[vectors.length - 1].y = 27;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '30%';
    vectors[vectors.length - 1].infoY = '35%';
    /*
    vectors[vectors.length-1].infoX = '60%';
    vectors[vectors.length-1].infoY = '32%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "9";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 7;
  vectors[vectors.length - 1].y = 4;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '8%';
    vectors[vectors.length - 1].infoY = '10%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '15%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "10";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 40;
  vectors[vectors.length - 1].y = 6;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '8%';
    vectors[vectors.length - 1].infoY = '10%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '15%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "11";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 60;
  vectors[vectors.length - 1].y = 4;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '25%';
    vectors[vectors.length - 1].infoY = '10%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '15%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "12";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 35;
  vectors[vectors.length - 1].y = 20;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '20%';
    vectors[vectors.length - 1].infoY = '20%';
    /*
    vectors[vectors.length-1].infoX = '40%';
    vectors[vectors.length-1].infoY = '15%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "13";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 85;
  vectors[vectors.length - 1].y = 23;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '50%';
    vectors[vectors.length - 1].infoY = '30%';
    /*
    vectors[vectors.length-1].infoX = '60%';
    vectors[vectors.length-1].infoY = '32%';
    */
  }

  vectors.push(new vector());
  vectors[vectors.length - 1].name = "14";
  vectors[vectors.length - 1].size = "medium";
  vectors[vectors.length - 1].x = 95;
  vectors[vectors.length - 1].y = 33;
  if (screenWidth < 720) {
    vectors[vectors.length - 1].infoX = '0%';
    vectors[vectors.length - 1].infoY = '0%';
  } else if (screenWidth > 720) {
    vectors[vectors.length - 1].infoX = '52%';
    vectors[vectors.length - 1].infoY = '30%';
    /*
    vectors[vectors.length-1].infoX = '60%';
    vectors[vectors.length-1].infoY = '32%';
    */
  }
}
function drawVectors() {
  for (var i = 0; i < vectors.length; i++) {
    //show info in position
    temp = ".pin" + i;

    if (vectors[i].size == "small") {
      $(temp).css('left', getPos(vectors[i].x - 0.5));
      $(temp).css('top', getPos(vectors[i].y));
      $(temp).css('height', getPos(3));
    }
    else if (vectors[i].size == "medium") {
      $(temp).css('left', getPos(vectors[i].x - 0.8));
      $(temp).css('top', getPos(vectors[i].y));
      $(temp).css('height', getPos(8));
    }
    else if (vectors[i].size == "big") {
      $(temp).css('left', getPos(vectors[i].x - 1.5));
      $(temp).css('top', getPos(vectors[i].y));
      $(temp).css('height', getPos(6));
    }

    if (vectors[i].status != "idle") {
      $(temp).addClass("pinSelected");
      if (vectors[i].size == "small") {
        /*$(temp).css('left',getPos(vectors[i].x-1.8));*/
        /*$(temp).css('top',getPos(vectors[i].y-2.5));*/
        $(temp).css('height', getPos(6.5));
      }
      else if (vectors[i].size == "medium") {
        /*$(temp).css('left',getPos(vectors[i].x-1.8));*/
        /*$(temp).css('top',getPos(vectors[i].y-2));*/
        $(temp).css('height', getPos(8));
      }
      else if (vectors[i].size == "big") {
        /*$(temp).css('left',getPos(vectors[i].x-1.6));*/
        /*$(temp).css('top',getPos(vectors[i].y-0.5));*/
        $(temp).css('height', getPos(6.5));
      }
    }
    else {
      $(temp).removeClass("pinSelected")
    }
  }
}
function resetVectorsStatus(from) {
  for (var i = 0; i < vectors.length; i++) {
    if (vectors[i].status == from) {
      vectors[i].status = "idle";
    }
  }
}
function updateInfoPos() {
  for (var i = 0; i < vectors.length; i++) {
    if (vectors[i].status == "showing") {
      showMapInfo(i);
      return;
    }
  }
  return;
}
function showMapInfo(arrayLoc) {
  $('#locationContainer').hide();
  var infos = document.getElementsByClassName("infoContent");
  for (var i = 0; i < infos.length; i++) {
    var temp = ".mapInfo" + i;
    $(temp).hide();
  }
  //show info in position
  temp = ".mapInfo" + arrayLoc;
  $(temp).show();

  if ($(window).width() >= 720) {
    $('#locationContainer').css('left', vectors[arrayLoc].infoX);
    $('#locationContainer').css('top', vectors[arrayLoc].infoY);
  }
  else {
    $('#locationContainer').css('left', '0');
    $('#locationContainer').css('top', '0');
  }


  $('#locationContainer').fadeIn(300);

  resetVectorsStatus("showing");
  vectors[arrayLoc].status = "showing";
}
function closeMapInfo() {
  $('#locationContainer').hide();


  resetVectorsStatus("showing");
  clickedOn = null;
}

/////////////////////////////////////////////main////////////////////////////////////
function mainLoop() {
  ctx.clearRect(0, 0, c.width, c.height); //borra el canvas actual
  drawVectors();

  resetVectorsStatus("expand");
  var temp = checkCol();
  if (temp != null) {
    if (vectors[temp].status == "idle") {
      vectors[temp].status = "expand";
    }
  }


  ////////////////////////mouse clicked event//////////////

  if (clickedOn != null) {
    if (vectors[clickedOn].status != "showing") {
      showMapInfo(clickedOn);
    }
  }
  else if (clickedOn == null) {
    closeMapInfo();
  }

  $(".icon-cerrar").click(function () {
    closeMapInfo();
  });

  requestAnimationFrame(mainLoop);
}