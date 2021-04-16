<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/animate.css">
<link rel="stylesheet" href="css/owl.transitions.css">
<link rel="stylesheet" href="css/owl.carousel.css">
<link rel="stylesheet" href="css/owl.theme.css">
<script src="bower_components/angular/angular.min.js"></script>
<script src="js/app.js"></script>
<script src="bower_components/wow/dist/wow.min.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/controllers/headerController.js"></script>
<script src="bower_components/jquery.lazy-master/jquery.lazy.min.js"></script>

<script>
	$(document).ready(function() {

		 $(function() {
	        $('.lazy').lazy({
	          effect: "fadeIn",
	          effectTime: 2000,
	          threshold: 0
	        });
	    });

	 });

</script>
<script src="js/funciones.js"></script>

<!--<script src="js/lazyload.js"></script>-->

<?php 
  function isTodayWeekend() {
    $currentDate = new DateTime("now", new DateTimeZone("America/Mexico_City"));
    return $currentDate->format('N') >= 6;
  }
  if(isTodayWeekend() == true){
    include("chat.php");
  }
?>