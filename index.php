<!doctype html>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
		<title>Doughnut Chart</title>

		<!-- Chart.js para os gráficos -->
		<script src="Chart.js"></script>
		<!-- Jquery -->
		<script src="jquery.js"></script>

		<!--[if lt IE 9]>
		    <script src="excanvas.js"></script>
		<![endif]-->

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
			dnFontSize: '70px',
			dnFontColor: "#adb8b4",
			dnText: 'G1',
			dnStartAngle: 90,
			dnCounterClockwise: false,
			dnRightCanvas: {
				rcRadius: 15,
				rcPreMargin: 100,
				rcMargin: 20,
				rcHeight: 100,
				rcOffset: 15,
				rcLineWidth: 200,
				rcSphereColor: '#819596',
				rcSphereStroke: '#819596',				
				rcTop:{
					rcTopLineColor: '#819596',
					rcTopDashLine: 5,
					rcStrokeWidth: 3,
					rctAbove: {
						rctText: 'MÉDIA',
						rctFontColor: '#111',
						rctFontSize: '20px',
						rctFontFamily: 'Arial',
						rctFontStyle: 'normal',
						rctOffset: 5
					},
					rctBelow: {
						rctText: '6.5',
						rctFontColor: '#111',
						rctFontSize: '50px',
						rctFontFamily: 'Arial',
						rctFontStyle: 'normal',
						rctOffset: 5
					}		        	
				},
				rcBottom:{
					rcBottomLineColor: '#819596',
					rcStrokeWidth: 3,
					rcbAbove: {
						rcbText: 'MÉDIA',
						rcbFontColor: '#111',
						rcbFontSize: '20px',
						rcbFontFamily: 'Arial',
						rcbFontStyle: 'normal',
						rcbOffset: 5
					},
					rcbBelow: {
						rcbText: '6.5',
						rcbFontColor: '#111',
						rcbFontSize: '50px',
						rcbFontFamily: 'Arial',
						rcbFontStyle: 'normal',
						rcbOffset: 5
					}		        	
				}
			}
		});

	</script>
	</body>
</html>
