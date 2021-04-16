<?php include("header.php") ?>
<!--
<div class="diseno">
<img src="/diseños/Home.jpg" alt="">
</div>
-->
<div class="home">
	
	<div class="big-banner">
		
		<div class="cont max-widht1">
			
			<div class="box">
				<h1>
					Busca tu sitio <br>
					favorito
				</h1>

				<div class="container">
					
					<div class="cont-select">
						<select name="" id="">
							<option value=""> <i class="icon-location2"></i>Seleciona un lugar</option>
							<option value="">Cancún</option>
							<option value="">Mérida</option>
							<option value="">Ciudad de México</option>
							<option value="">Valladolid</option>
							<option value="">Sonora</option>
							
						</select>
						<i></i>
						<img src="/img/site.png" alt="" class="site">
					</div>
					
					<div class="cont-select border">
						<input type="date" id="start" name="trip-start" placeholder="Fecha de Nacimiento del Titular" >
						<img src="/img/calendario.png" alt="" class="site clandar">
						<i></i>
					</div>

					<button class="buscar">
						<i class="icon-buscar"></i>
					</button>
				
				</div>

				<a href="" class="button">
					<i class="icon-estrella"></i>
					<p>Hoy es mi día de suerte</p>
				</a>

			</div>

		</div>

	</div>

	<div class="vistazo">
		
		<div class="info">
			<div class="cont">
				<p><strong>No lo dudes solo viaja</strong></p>
				<h2>Vuelve a echar un vistazo</h2>
				<p class="small">
					Esto son las últimas experiencias que viste y otros que te pueden interesar.
				</p>
				<div class="buttons">
					
					<a class="left1" href=""><i class="icon-izq-flecha"></i></a>
					<a class="right1" href=""><i class="icon-der-flecha"></i></a>

				</div>
			</div>
		</div>

		<?php include("templates/slide1.php") ?>

	</div>

	<div class="atenciones">
		
		<div class="cont max-widht1">
			
			<div class="box">
				<img src="/img/experiencia.png" alt="">
				<h3>Personaliza tu experiencia</h3>
				<p>
					Conoce todas nuestras experiencias, viaja al lugar que desees, a la hora que gustes desde cualquier lugar, los días que quieras, acompañado o solo, al mejor precio.
				</p>
			</div>
			<div class="box">
				<img src="/img/ahorra.png" alt="">
				<h3>Ahorra tiempo y dinero</h3>
				<p>
					Somos una agencia que de experiencias que traba de la mano con proveedores para poder obtener los mejores productos y precio para nuestros usuarios.
				</p>
			</div>
			<div class="box">
				<img src="/img/catencion.png" alt="">
				<h3>Atención al cliente </h3>
				<p>
					¿Tienes dudas? chatea en vivo con nuestros equipo de atención al cliente para poder solucionar tus preguntas. 
				</p>
			</div>

		</div>

	</div>

	<div class="favorito">
		
		<div class="cont">
			
			<div class="info">
				<h2>Busca tu lugar favorito</h2>
				<p>
					Conoce hasta donde pueder llegar y haz recuerdos memorables.
				</p>
				<div class="cont-select">
				<select name="" id="">
					<option value="">Riviera Maya</option>
					<option value="">Mérida</option>
					<option value="">Ciudad de México</option>
					<option value="">Valladolid</option>
					<option value="">Sonora</option>
				</select>
				<i></i>
				<img src="/img/site.png" alt="" class="site">
				</div>
			</div>

			<div class="datos">
				
				<div class="cont">
					<h2>Riviera Maya</h2>
					<h3>Selecciona una categoría</h3>

					<div class="content">
						
						<a href="" class="button">
							<img src="/img/i1.png" alt="">
							<span>Acuática</span>
						</a>
						<a href="" class="button">
							<img src="/img/i2.png" alt="">
							<span>Terrestre</span>
						</a>
						<a href="" class="button">
							<img src="/img/i3.png" alt="">
							<span>Cultura</span>
						</a>
						<a href="" class="button">
							<img src="/img/i4.png" alt="">
							<span>Vida nocturna</span>
						</a>
						<a href="" class="button">
							<img src="/img/i5.png" alt="">
							<span>Aventura</span>
						</a>
						<a href="" class="button">
							<img src="/img/i6.png" alt="">
							<span>Familiar</span>
						</a>
						<a href="" class="button">
							<img src="/img/i7.png" alt="">
							<span>Tienda</span>
						</a>
						<a href="" class="button">
							<img src="/img/i8.png" alt="">
							<span>En linea</span>
						</a>

					</div>
				</div>

			</div>

		</div>

	</div>

	<div class="populares">
		
		<div class="cont max-widht1">
			
			<h3>Experiencias populares en Riviera Maya</h3>

			<div class="container">
				
				<?php include("templates/populares.php") ?>

			</div>

		</div>

	</div>

	<div class="colecciones">
		
		<div class="cont max-widht1">
			
			<h3>Colecciones</h3>

			<div class="container">
				
				<?php include("templates/colecciones.php") ?>

			</div>

		</div>

	</div>

	<div class="registrate">
		
		<div class="cont">
			<h2>
				Registrate
			</h2>
			<p>
				Si deseas recibir nuestras ofertas déjanos tu correo y serás el primero en enterarte de experiencias o actividades populares. 
			</p>
			<form action="">
				<input type="text" placeholder="correo@ejemplo.com">
				<button>Enviar</button>
			</form>
		</div>

	</div>

	<div class="visitados">
		
		<div class="cont max-widht">
			
			<h3>Lugares más visitados</h3>

			<div class="container">
				<a href="" class="arrow left2">
					<i class="icon-izq-flecha"></i>
				</a>
				<div class="slide-2 posts">
					<?php include("templates/visitados.php") ?>
				</div>
				<a href="" class="arrow right2">
					<i class="icon-der-flecha"></i>
				</a>
			</div>

		</div>

		<div class="cont max-widht">
			
			<h3>Categorias más vendidas</h3>

			<div class="container">
				<a href="" class="arrow left3">
					<i class="icon-izq-flecha"></i>
				</a>
				<div class="slide-3 posts">
					<?php include("templates/categorias.php") ?>
				</div>
				<a href="" class="arrow right3">
					<i class="icon-der-flecha"></i>
				</a>
			</div>

		</div>

	</div>

</div>



<?php include("footer.php") ?>