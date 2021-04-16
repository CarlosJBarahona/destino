app.controller("scrollCTL", function ($scope,$location) {

    $scope.$watch(function () {
      return location.hash
    }, function (value) {
      var id = value.replace('#/','')
      $scope.scrollTo(id);
    });
    $scope.scrollTo = function(target){
      if (target) {
        setTimeout(
            function(){
                console.log($('#' + target).offset());
                $('html, body').animate({
                    scrollTop: $('#' + target).offset().top -50
                }, 600);
            },
            300           
        );
      }
    }

    $(".click-time").click(function() {
        $(".click-time").removeClass('change');
        $(this).addClass('change');
    });


});

