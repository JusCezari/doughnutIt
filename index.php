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

		<div id="mySmallDoughnut">
		</div>

		<div id="myMediumDoughnut">
		</div>

		<div id="myBigDoughnut">
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
						rcbImage: 'calendar.png',
						rcbImageOffsetRight: 5,
						rcbImageOffsetBottom: 0,
						rcbText: '20/10/2013',
						rcbOffset: 10
					}		        	
				}
			},
			dnLeftCanvas: {
				lcRadius: 15,
				lcPreMargin: 100,
				lcMargin: 20,
				lcHeight: 100,
				lcOffset: 15,
				lcLineWidth: 200,
				lcSphereColor: '#819596',
				lcSphereStroke: '#819596',				
				lcTop:{
					lcTopLineColor: '#819596',
					lcTopDashLine: 5,
					lcTopFontSize: '20px',
					lcStrokeWidth: 3,
					lctAbove: {						
						lctText: 'NOTA G1',
						lctOffset: 5,
						lctImageOffsetRight: 5,
						lctImageOffsetBottom: 0,
						// lctImage: 'calendar.png',
					},
					lctBelow: {
						lctText: '8.4',
						lctFontSize: '50px',
						lctOffset: 15,
						lctOffset: 5,
						lctImageOffsetRight: 5,
						lctImageOffsetBottom: 0,
						// lctImage: 'calendar.png'
					}		        	
				},
				lcBottom:{					
					lcBottomDashLine: 0,
					lcBottomFontSize: '15px',
					lcBottomLineColor: '#819596',
					lcStrokeWidth: 3,
					lcbAbove: {
						// lcbImage: 'calendar.png',
						lcbImageOffsetBottom: 0,
						lcbImageOffsetRight: 5,
						lcbText: 'NOTA G2',
						lcbFontSize: '20px',
						lcbOffset: 5
					},
					lcbBelow: {
						lcbImage: 'calendar.png',
						lcbImageOffsetRight: -10,
						lcbImageOffsetBottom: 1,
						lcbText: '10/02/1994',
						lcbOffset: 10
					}		        	
				}
			}
		});// End Doughnut

		// SMALL DOUGHNUT :(

		var smallDoughnutData = [
				{value:65,color:"#d9c54a"},
				{value:100-65,color:"#dce0df"}
			];

		$( "#mySmallDoughnut" ).doughnutit({
			dnData: smallDoughnutData,
		    dnSize: 130,
		    dnInnerCutout: 60,
		    dnAnimation: true,
			dnAnimationSteps: 60,
			dnAnimationEasing: 'linear',
			dnStroke: false,
			dnShowText: true,
			dnFontSize: '30px',
			dnFontOffset: 20,
			dnFontColor: "#819596",
			dnText: 'G1',
			dnStartAngle: 90,
			dnCounterClockwise: false,
			dnRightCanvas: {
				rcRadius: 5,
				rcPreMargin: 20,
				rcMargin: 20,
				rcHeight: 40,
				rcOffset: 5,
				rcLineWidth: 85,
				rcSphereColor: '#819596',
				rcSphereStroke: '#819596',				
				rcTop:{
					rcTopLineColor: '#819596',
					rcTopDashLine: 0,
					rcTopFontSize: '13px',
					rcStrokeWidth: 1,

					rcTopPreMargin: 20,
		        	rcTopMargin: 20,
		        	rcTopHeight: 40,
		        	rcTopLineWidth: 85,

					rctAbove: {						
						rctText: 'MÉDIA',
						rctOffset: 2,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						// rctImage: 'calendar.png',
					},
					rctBelow: {
						rctText: '6.5',
						rctFontSize: '35px',
						rctFontStyle: 'bold',
						rctOffset: 2,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						// rctImage: 'calendar.png'
					}		        	
				},
				rcBottom:{					
					rcBottomDashLine: 0,
					rcBottomFontSize: '15px',
					rcBottomLineColor: '#819596',
					rcStrokeWidth: 1,

					rcBottomPreMargin: 20,
		        	rcBottomMargin: 20,
		        	rcBottomHeight: 30,
		        	rcBottomLineWidth: 85,

					rcbAbove: {
						// rcbImage: 'calendar.png',
						rcbImageOffsetBottom: 0,
						rcbImageOffsetRight: 5,
						rcbText: 'DATA DE G3',
						rcbFontSize: '13px',
						rcbOffset: 2
					},
					rcbBelow: {
						rcbImage: 'calendar.png',
						rcbImageOffsetRight: 5,
						rcbImageOffsetBottom: 0,
						rcbText: '20/10/2013',
						rcbOffset: 5
					}		        	
				}
			}
		});// End Doughnut

		// MEDIUM DOUGHNUT :)

		var mediumDoughnutData = [
				{value:87,color:"#4bc584"},
				{value:100-87,color:"#dce0df"}
			];

		$( "#myMediumDoughnut" ).doughnutit({
			dnData: mediumDoughnutData,
		    dnSize: 230,
		    dnInnerCutout: 60,
		    dnAnimation: true,
			dnAnimationSteps: 60,
			dnAnimationEasing: 'linear',
			dnStroke: false,
			dnShowText: true,
			dnFontSize: '50px',
			dnFontOffset: 30,
			dnFontColor: "#819596",
			dnText: 'G1',
			dnStartAngle: 0,
			dnCounterClockwise: false,
			dnRightCanvas: {
				rcRadius: 5,
				rcPreMargin: 20,
				rcMargin: 20,
				rcHeight: 40,
				rcOffset: 5,
				rcLineWidth: 170,
				rcSphereColor: '#819596',
				rcSphereStroke: '#819596',				
				rcTop:{
					rcTopLineColor: '#819596',
					rcTopDashLine: 0,
					rcTopFontSize: '13px',
					rcStrokeWidth: 1,

					rcTopPreMargin: 30,
		        	rcTopMargin: 20,
		        	rcTopHeight: 70,

					rctAbove: {						
						rctText: 'MÉDIA',
						rctOffset: 2,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						rctFontSize: '22px',
						// rctImage: 'calendar.png',
					},
					rctBelow: {
						rctText: '8.7',
						rctFontSize: '55px',
						rctFontStyle: 'bold',
						rctOffset: 2,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						// rctImage: 'calendar.png'
					}		        	
				},
				rcBottom:{					
					rcBottomDashLine: 0,
					rcBottomFontSize: '15px',
					rcBottomLineColor: '#819596',
					rcStrokeWidth: 1,

					rcBottomPreMargin: 30,
		        	rcBottomMargin: 20,
		        	rcBottomHeight: 60,

					rcbAbove: {
						// rcbImage: 'calendar.png',
						rcbImageOffsetBottom: 0,
						rcbImageOffsetRight: 5,
						rcbText: 'DATA DE G3',
						rcbFontSize: '14px',
						rcbOffset: 2
					},
					rcbBelow: {
						rcbImage: 'calendar.png',
						rcbImageOffsetRight: 5,
						rcbImageOffsetBottom: 0,
						rcbText: '20/10/2013',
						rcbFontSize: '16px',
						rcbOffset: 5
					}		        	
				}
			}
		});// End Doughnut

		// BIG DOUGHNUT :D

		var bigDoughnutData = [
				{value:32,color:"#ff4d4d"},
				{value:100-32,color:"#dce0df"}
			];

		$( "#myBigDoughnut" ).doughnutit({
			dnData: bigDoughnutData,
		    dnSize: 500,
		    dnInnerCutout: 60,
		    dnAnimation: true,
			dnAnimationSteps: 60,
			dnAnimationEasing: 'linear',
			dnStroke: false,
			dnShowText: true,
			dnFontSize: '90px',
			dnFontOffset: 60,
			dnFontColor: "#819596",
			dnText: 'G1',
			dnStartAngle: -90,
			dnCounterClockwise: false,
			dnRightCanvas: {
				rcRadius: 5,
				rcPreMargin: 20,
				rcMargin: 20,
				rcHeight: 40,
				rcOffset: 5,
				rcLineWidth: 400,
				rcSphereColor: '#819596',
				rcSphereStroke: '#819596',				
				rcTop:{
					rcTopLineColor: '#819596',
					rcTopDashLine: 0,
					rcTopFontSize: '13px',
					rcStrokeWidth: 1,

					rcTopPreMargin: 60,
		        	rcTopMargin: 20,
		        	rcTopHeight: 170,

					rctAbove: {						
						rctText: 'MÉDIA',
						rctOffset: 2,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						rctFontSize: '35px',
						// rctImage: 'calendar.png',
					},
					rctBelow: {
						rctText: '3.2',
						rctFontSize: '100px',
						rctFontStyle: 'bold',
						rctOffset: 2,
						rctImageOffsetRight: 5,
						rctImageOffsetBottom: 0,
						// rctImage: 'calendar.png'
					}		        	
				},
				rcBottom:{					
					rcBottomDashLine: 0,
					rcBottomFontSize: '15px',
					rcBottomLineColor: '#819596',
					rcStrokeWidth: 1,

					rcBottomPreMargin: 60,
		        	rcBottomMargin: 20,
		        	rcBottomHeight: 150,

					rcbAbove: {
						// rcbImage: 'calendar.png',
						rcbImageOffsetBottom: 0,
						rcbImageOffsetRight: 5,
						rcbText: 'DATA DE G3',
						rcbFontSize: '30px',
						rcbFontStyle: 'bold',
						rcbOffset: 2
					},
					rcbBelow: {
						// rcbImage: 'calendar.png',
						rcbImageOffsetRight: 5,
						rcbImageOffsetBottom: 0,
						rcbText: '20/10/2013',
						rcbFontSize: '40px',
						rcbOffset: 5
					}		        	
				}
			}
		});// End Doughnut


	</script>
	</body>
</html>
