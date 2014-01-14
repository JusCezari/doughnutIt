<!doctype html>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
		<title>Doughnut Chart</title>

		<!-- Chart.js para os gráficos -->
		<script src="Chart.js"></script>
		<!-- Jquery -->
		<script src="jquery.js"></script>

		<!-- Script com o plugin -->
		<script src="doughnutit.js"></script>
		<!-- Folha de estilos -->
		<link rel="stylesheet" type="text/css" href="doughnutit.css">

		<meta name = "viewport" content = "initial-scale = 1, user-scalable = no">
		
	</head>
	<body>

		<div id="myDoughnut">
		</div>

	<script>

		var doughnutData = [
				// {value:5,color:"#f00"},
				// {value:30,color:"#ff0"},
				// {value:15,color:"#00f"},
				// {value:50,color:"#0ff"}
				{value:65,color:"#819596"},
				{value:100-65,color:"#dce0df"}
			];

		$( "#myDoughnut" ).doughnutit({
		    dnSize: 450,
		    dnData: doughnutData,
		    dnInnerCutout: 60,
		    dnAnimation: true,
			dnAnimationSteps: 60,
			dnAnimationEasing: 'linear',
			dnStroke: false,
			dnShowText: true,
			dnFontSize: 70,
			dnFontColor: "#adb8b4",
			dnText: 'G1',
			dnStartAngle: 90,
			dnCounterClockwise: false,
			dnRightCanvas: {
				rcRadius: 15,
	        	rcPreMargin: 20,
	        	rcMargin: 20,
	        	rcText: 'TESTE',
	        	rcHeight: 200
			}
		});

	</script>
	</body>
</html>
