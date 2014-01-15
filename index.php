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
			dnData: doughnutData,
		    dnSize: 450,
		    dnInnerCutout: 60,
		    dnAnimation: true,
			dnAnimationSteps: 60,
			dnAnimationEasing: 'linear',
			dnStroke: false,
			dnShowText: true,
			dnFontSize: '70px',
			dnFontColor: "#819596",
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
					rcTopFontSize: '20px',
					rcStrokeWidth: 3,
					rctAbove: {						
						rctText: 'MÉDIA',
						rctOffset: 5,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						// rctImage: 'calendar.png',
					},
					rctBelow: {
						rctText: '6.5',
						rctFontSize: '50px',
						rctOffset: 15,
						rctOffset: 5,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						// rctImage: 'calendar.png'
					}		        	
				},
				rcBottom:{					
					rcBottomDashLine: 0,
					rcBottomFontSize: '15px',
					rcBottomLineColor: '#819596',
					rcStrokeWidth: 3,
					rcbAbove: {
						// rcbImage: 'calendar.png',
						rcbImageOffsetBottom: 0,
						rcbImageOffsetRight: 5,
						rcbText: 'DATA DE G3',
						rcbFontSize: '20px',
						rcbOffset: 5
					},
					rcbBelow: {
						// rcbImage: 'calendar.png',
						rcbImageOffsetRight: 5,
						rcbImageOffsetBottom: 0,
						rcbText: '20/10/2013',
						rcbOffset: 10
					}		        	
				}
			}
		});

	</script>
	</body>
</html>
