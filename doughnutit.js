(function ( $ ) {
 
    $.fn.doughnutit = function( options ) {
 		// These are the defaults.
        var settings = $.extend({            
        	// Data for a full doughnut
        	dnData: {value:100,color:"#819596"},
        	// Size of the doughnut
            dnSize: 200,
            // Percentage of the inner cutout
            dnInnerCutout: 60,
            // Animate it or not?
		    dnAnimation: true,
		    // Amount of animation steps
			dnAnimationSteps: 60,
			// Type of animation
			dnAnimationEasing: 'linear',
			// Stroke between the sections of the doughnut
			dnStroke: false,
			// Show the text inside the doughnut
			dnShowText: false,
			// Text inside the doughnut
			dnText: '',
			// Font for the text inside the doughnut
			dnFontFamily: 'Arial',
			// Style for the text inside
			dnFontStyle: 'normal',			
			// Size in px for the text inside
			dnFontSize: '190px',
			// Color for the text inside
			dnFontColor: "#666",
			// Offset to stay in center
			dnFontOffset: 35,
			// Start angle for the first slice of the doughnut
			dnStartAngle: -90,
			// Animation in counter clockwise - HAS ISSUES
			dnCounterClockwise: false,
			// If an object is passed it generates a right canvas with some text
			dnRightCanvas: false,
			// If an object is passed it generates a left canvas with some text
			dnLeftCanvas: false
        }, options );
 
 		// The element MUST have an ID
        var canvasId = '' + $(this).attr('id') + '-canvas';

        // CANVAS markup       

        // Width of the wrapper div - TODO Calculate width of secondary canvas using their elements        
        var wrapperWidth = settings.dnSize;
        // If there is a rightCanvas we sum it in the wrapper width
        if(settings.dnRightCanvas !== false){
        	wrapperWidth += settings.dnSize;
        }
		// If there is a leftCanvas we sum it in the wrapper width
        if(settings.dnLeftCanvas !== false){
        	wrapperWidth += settings.dnSize;
        }        
        // First we create and append the wrapper
        var wrapperId = 'wrapper-' + canvasId;
        var wrapperDiv = "<div class='canvas-wrapper' id='" + wrapperId + "' style='width:" + wrapperWidth + "px; height:" + settings.dnSize + "px'></div>";
		$(this).append(wrapperDiv);

        // Put the CANVAS elements on the html
        var canvasElement = "<canvas id='" + canvasId + "' width='" + settings.dnSize + "' height='" + settings.dnSize + "' class='canvas-inner'></canvas>";

        // Create a CANVAS element inside the element
        $('#'+wrapperId).append(canvasElement);

        // Translate the options to Chart,js standard
        var options = {			        	
			percentageInnerCutout: settings.dnInnerCutout,
			animation: settings.dnAnimation,
			animationSteps: settings.dnAnimationSteps,
			animationEasing: settings.dnAnimationEasing,
			segmentShowStroke: settings.dnStroke,
			labelFontFamily: settings.dnFontFamily,
	        labelFontStyle: settings.dnFontStyle,
	        labelFontSize: settings.dnFontSize,
	        labelFontColor: settings.dnFontColor,
	        labelFontOffset: settings.dnFontOffset,
	        showTextInside: settings.dnShowText,
	        doughnutText: settings.dnText,
	        degreeStart: settings.dnStartAngle,	
	        counterClockwise: settings.dnCounterClockwise
		}

        // Create the doughnut chart
		var myDoughnut = new Chart(document.getElementById(canvasId).getContext("2d")).Doughnut(settings.dnData,options);

		/*************************************************************************/
		/*************************                        ************************/
		/*************************   RIGHT CANVAS STUFF   ************************/
		/*************************                        ************************/
		/*************************************************************************/

			// Just generate it when there is some object
			if(settings.dnRightCanvas !== false){
	        	
	        	var rightCanvasId = 'rightCanvas-' + canvasId;
	        	// Generate the html for the right CANVAS
	        	var rightCanvas = "<canvas id='" + rightCanvasId + "' class='rightCanvas' width='" + settings.dnSize + "' height='" + settings.dnSize + "'></canvas>";
	        	// Create a CANVAS element inside the element
	        	$('#'+wrapperId).append(rightCanvas);


	        	/* GENERIC STUFF */
	        	// These are the defaults values for the right CANVAS, both bottom and top lanes
		        var rightSettings = $.extend({
		        	// Radius of the sphere on the middle of the CANVAS
		        	rcRadius: 5,
		        	// Offset for sphere on the middle, normally the same value of the radius
		        	rcOffset: 5,
		        	// Color for the sphere
		        	rcSphereColor: '#819596',
		        	// Color of the sphere stroke
					rcSphereStroke: '#819596',
		        	// Distance of the margin on the end of the angle
		        	rcPreMargin: 10,
		        	// Distance before drawing the text TODO - Automatic calc
		        	rcMargin: 10,	        	
		        	// Height of the line from the middle line
		        	rcHeight: 100,
		        	// Width in coordinates for the greater line
		        	rcLineWidth: 200,
		        	// Default value for the top lane
		        	rcTop: false,
		        	// Default value for the bottom lane
		        	rcBottom: false
		        }, settings.dnRightCanvas );

		        // CIRCLE ON THE MIDDLE OF THE CANVAS STUFF
		        if( (rightSettings.rcTop !== false) || (rightSettings.rcBottom !== false) ){

					// Get the right CANVAS element
	        		var c=document.getElementById(rightCanvasId);
	        		// Get the context of the element
				    var ctx = c.getContext('2d');
				    // Place it on the center
				    var centerX = c.width / 2;
				    var centerY = c.height / 2;
				    // Radius and offset
				    var radius = rightSettings.rcRadius;
				    var offset = rightSettings.rcOffset;
				    // Draw the circle on the CANVAS
				    ctx.beginPath();
				    ctx.arc(offset+radius, centerY, radius, 0, 2 * Math.PI, false);
				    ctx.fillStyle = rightSettings.rcSphereColor;
				    ctx.fill();
				    ctx.strokeStyle = rightSettings.rcSphereStroke;;
				  	ctx.stroke();
				  	ctx.closePath();

				  	/**********************************************************************/
				  	/*************************** TOP LANE STUFF ***************************/
				  	/**********************************************************************/
			        // If there is a top lane
			        if(rightSettings.rcTop !== false){

			        	/* GENERIC TOP LANE STUFF */
		        		// These are the defaults values for TOP lane in right CANVAS
				        var rcTopSettings = $.extend({
				        	// Font family for the top lane
				        	rcTopFontFamily: settings.dnFontFamily,
				        	// Font size for the top lane
				        	rcTopFontSize: settings.dnFontSize,
				        	// Font color for the top lane
				        	rcTopFontColor: settings.dnFontColor,
				        	// Font style for the top lane
				        	rcTopFontStyle: settings.dnFontStyle,
				        	// Color of the line on top lane
				        	rcTopLineColor: rightSettings.rcSphereColor,
				        	// Value for the dashed lines
				        	rcTopDashLine: 0,
				        	// Width for the line
				        	rcStrokeWidth: 3,
				        	// Object for above top lanve
				        	rctAbove: false,
				        	// Object for below top lanve
				        	rctBelow: false,
				        	// Distance of the margin on the end of the angle on TOP lane
				        	rcTopPreMargin: rightSettings.rcPreMargin,
				        	// Distance before drawing the text TODO on TOP lane
				        	rcTopMargin: rightSettings.rcMargin,
				        	// Height of the line from the middle line on TOP lane
				        	rcTopHeight: rightSettings.rcHeight,
				        	// Width in coordinates for the greater line on TOP lane
				        	rcTopLineWidth: rightSettings.rcLineWidth,
				        }, rightSettings.rcTop );

				        // Draw the LINES
			        	ctx.beginPath();
			        	ctx.strokeStyle = rcTopSettings.rcTopLineColor;
			        	ctx.lineWidth = rcTopSettings.rcStrokeWidth;
			        	// If there is support for the dashed line
			        	if(ctx.setLineDash){
			        		ctx.setLineDash([rcTopSettings.rcTopDashLine]);
			        	}
						ctx.moveTo(rightSettings.rcRadius*2 , c.height / 2);
						ctx.lineTo(rcTopSettings.rcTopPreMargin, (centerX-rcTopSettings.rcTopHeight) );
						ctx.stroke();
						ctx.lineTo( (rcTopSettings.rcTopPreMargin+rcTopSettings.rcTopMargin+rcTopSettings.rcTopLineWidth) , (centerX-rcTopSettings.rcTopHeight) );
						ctx.stroke();
						ctx.closePath();
						
						/* ABOVE TOP LANE STUFF */
						// If there are something to draw above the line
				        if(rcTopSettings.rctAbove !== false){
				        	
			        		// These are the defaults values for ABOVE TOP lane in right CANVAS
					        var rctaSettings = $.extend({
					        	// Font family for the top lane
					        	rctFontFamily: rcTopSettings.rcTopFontFamily,
					        	// Font size for the top lane
					        	rctFontSize: rcTopSettings.rcTopFontSize,
					        	// Font color for the top lane
					        	rctFontColor: rcTopSettings.rcTopFontColor,
					        	// Font style for the top lane
					        	rctFontStyle: rcTopSettings.rcTopFontStyle,
					        	// Text for above top lane
					        	rctText: false,				        	
					        	// Offset for text above top lane
					        	rctOffset: 10,
					        	// Image on the left side
					        	rctImage: false,
					        	// Offset for image from the left side
					        	rctImageOffsetRight: 0,
					        	// Offset for image from the bottom
					        	rctImageOffsetBottom: 0
					        }, rcTopSettings.rctAbove);

							//Draw the TEXT ABOVE
							ctx.fillStyle = rctaSettings.rctFontColor;
							ctx.font=rctaSettings.rctFontStyle + " " + rctaSettings.rctFontSize + " " + rctaSettings.rctFontFamily;
							ctx.textAlign = "right";
							ctx.textBaseline = "bottom";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(rctaSettings.rctText, ( rcTopSettings.rcTopLineWidth+rcTopSettings.rcTopPreMargin+rcTopSettings.rcTopMargin ) , ( centerX-rcTopSettings.rcTopHeight-rctaSettings.rctOffset ) );
							
							// Draw the IMAGE ABOVE
							if(rctaSettings.rctImage !== false){
								var cat = loadImg(rctaSettings.rctImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(rightCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=rctaSettings.rctFontStyle + " " + rctaSettings.rctFontSize + " " + rctaSettings.rctFontFamily;
									ctx.drawImage(cat, ( rcTopSettings.rcTopLineWidth+rcTopSettings.rcTopPreMargin+rcTopSettings.rcTopMargin-cat.width-ctx.measureText(rctaSettings.rctText).width-rctaSettings.rctImageOffsetRight ) , ( centerX-rcTopSettings.rcTopHeight-rctaSettings.rctOffset-cat.height-rctaSettings.rctImageOffsetBottom ) );
								});
							}
				        }

				        /* BELOW TOP LANE STUFF */
						// If there are something to draw below the line
				        if(rcTopSettings.rctBelow !== false){
				        	
			        		// These are the defaults values for BELOW TOP lane in right CANVAS
					        var rctbSettings = $.extend({
					        	// Font family for the top lane
					        	rctFontFamily: rcTopSettings.rcTopFontFamily,
					        	// Font size for the top lane
					        	rctFontSize: rcTopSettings.rcTopFontSize,
					        	// Font color for the top lane
					        	rctFontColor: rcTopSettings.rcTopFontColor,
					        	// Font style for the top lane
					        	rctFontStyle: rcTopSettings.rcTopFontStyle,
					        	// Text for above top lane
					        	rctText: false,
					        	// Offset for text below top lane
					        	rctOffset: 10,
					        	// Image on the left side
					        	rctImage: false,
					        	// Offset for image from the left side
					        	rctImageOffsetRight: 0,
					        	// Offset for image from the bottom
					        	rctImageOffsetBottom: 0
					        }, rcTopSettings.rctBelow);

							//Draw the TEXT BELOW
							ctx.fillStyle = rctbSettings.rctFontColor;
							ctx.font=rctbSettings.rctFontStyle + " " + rctbSettings.rctFontSize + " " + rctbSettings.rctFontFamily;
							ctx.textAlign = "right";
							ctx.textBaseline = "top";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(rctbSettings.rctText, ( rcTopSettings.rcTopLineWidth+rcTopSettings.rcTopPreMargin+rcTopSettings.rcTopMargin ) , ( centerX-rcTopSettings.rcTopHeight+rctbSettings.rctOffset ) );

							// Draw the IMAGE BELOW
							if(rctbSettings.rctImage !== false){							
								var cat = loadImg(rctbSettings.rctImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(rightCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=rctbSettings.rctFontStyle + " " + rctbSettings.rctFontSize + " " + rctbSettings.rctFontFamily;
		 							ctx.drawImage(cat, ( rcTopSettings.rcTopLineWidth+rcTopSettings.rcTopPreMargin+rcTopSettings.rcTopMargin-cat.width-ctx.measureText(rctbSettings.rctText).width-rctbSettings.rctImageOffsetRight ) , ( centerX-rcTopSettings.rcTopHeight+rctbSettings.rctOffset-rctbSettings.rctImageOffsetBottom ) );
								});
							}
				        }
						
			        }

			        /**********************************************************************/
				  	/************************* BOTTOM LANE STUFF **************************/
				  	/**********************************************************************/
			        // If there is a bottom lane
			        if(rightSettings.rcBottom !== false){

			        	/* GENERIC BOTTOM LANE STUFF */
		        		// These are the defaults values for BOTTOM lane in right CANVAS
				        var rcBottomSettings = $.extend({
				        	// Font family for the bottom lane
				        	rcBottomFontFamily: settings.dnFontFamily,
				        	// Font size for the bottom lane
				        	rcBottomFontSize: settings.dnFontSize,
				        	// Font color for the bottom lane
				        	rcBottomFontColor: settings.dnFontColor,
				        	// Font style for the bottom lane
				        	rcBottomFontStyle: settings.dnFontStyle,
				        	// Color of the line on bottom lane
				        	rcBottomLineColor: rightSettings.rcSphereColor,
				        	// Width for the line			        	
				        	rcStrokeWidth: 3,
				        	// Value for the dashed lines
				        	rcBottomDashLine: 0,
				        	// Object for above bottom lanve
				        	rcbAbove: false,
				        	// Object for below bottom lanve
				        	rcbBelow: false,
				        	// Distance of the margin on the end of the angle on BOTTOM lane
				        	rcBottomPreMargin: rightSettings.rcPreMargin,
				        	// Distance before drawing the text TODO on BOTTOM lane
				        	rcBottomMargin: rightSettings.rcMargin,
				        	// Height of the line from the middle line on BOTTOM lane
				        	rcBottomHeight: rightSettings.rcHeight,
				        	// Width in coordinates for the greater line on BOTTOM lane
				        	rcBottomLineWidth: rightSettings.rcLineWidth,
				        }, rightSettings.rcBottom );

				        // Draw the LINES
			        	ctx.beginPath();
			        	ctx.strokeStyle = rcBottomSettings.rcBottomLineColor;
			        	ctx.lineWidth = rcBottomSettings.rcStrokeWidth;
			        	// If there is support for the dashed line
			        	if(ctx.setLineDash){
			        		ctx.setLineDash([rcBottomSettings.rcBottomDashLine]);
			        	}
						ctx.moveTo(rightSettings.rcRadius*2 , c.height / 2);
						ctx.lineTo(rcBottomSettings.rcBottomPreMargin, (centerX+rcBottomSettings.rcBottomHeight) );
						ctx.stroke();
						ctx.lineTo( (rcBottomSettings.rcBottomPreMargin+rcBottomSettings.rcBottomMargin+rcBottomSettings.rcBottomLineWidth) , (centerX+rcBottomSettings.rcBottomHeight) );
						ctx.stroke();
						ctx.closePath();
						
						/* ABOVE BOTTOM LANE STUFF */
						// If there are something to draw above the line
				        if(rcBottomSettings.rcbAbove !== false){
				        	
			        		// These are the defaults values for ABOVE TOP lane in right CANVAS
					        var rcbaSettings = $.extend({
					        	// Font family for the top lane
					        	rcbFontFamily: rcBottomSettings.rcBottomFontFamily,
					        	// Font size for the top lane
					        	rcbFontSize: rcBottomSettings.rcBottomFontSize,
					        	// Font color for the top lane
					        	rcbFontColor: rcBottomSettings.rcBottomFontColor,
					        	// Font style for the top lane
					        	rcbFontStyle: rcBottomSettings.rcBottomFontStyle,
					        	// Text for above top lane
					        	rcbText: false,				        	
					        	// Offset for text above top lane
					        	rcbOffset: 10,
					        	// Image on the left side
					        	rcbImage: false,
					        	// Offset for image from the left side
					        	rcbImageOffsetRight: 0,
								// Offset for image from the bottom
					        	rcbImageOffsetBottom: 0
					        }, rcBottomSettings.rcbAbove);

							//Draw the TEXT ABOVE
							ctx.fillStyle = rcbaSettings.rcbFontColor;
							ctx.font=rcbaSettings.rcbFontStyle + " " + rcbaSettings.rcbFontSize + " " + rcbaSettings.rcbFontFamily;
							ctx.textAlign = "right";
							ctx.textBaseline = "bottom";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(rcbaSettings.rcbText, ( rcBottomSettings.rcBottomLineWidth+rcBottomSettings.rcBottomPreMargin+rcBottomSettings.rcBottomMargin ) , ( centerX+rcBottomSettings.rcBottomHeight-rcbaSettings.rcbOffset ) );
							
							// Draw the IMAGE ABOVE
							if(rcbaSettings.rcbImage !== false){								
								var cat = loadImg(rcbaSettings.rcbImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(rightCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=rcbaSettings.rcbFontStyle + " " + rcbaSettings.rcbFontSize + " " + rcbaSettings.rcbFontFamily;
									ctx.drawImage(cat, ( rcBottomSettings.rcBottomLineWidth+rcBottomSettings.rcBottomPreMargin+rcBottomSettings.rcBottomMargin-cat.width-ctx.measureText(rcbaSettings.rcbText).width-rcbaSettings.rcbImageOffsetRight ) , ( centerX+rcBottomSettings.rcBottomHeight-rcbaSettings.rcbOffset-cat.height-rcbaSettings.rcbImageOffsetBottom ) );
								});
							}
							
				        }

				        /* BELOW BOTTOM LANE STUFF */
						// If there are something to draw below the line
				        if(rcBottomSettings.rcbBelow !== false){
				        	
			        		// These are the defaults values for BELOW TOP lane in right CANVAS
					        var rcbbSettings = $.extend({
					        	// Font family for the top lane
					        	rcbFontFamily: rcBottomSettings.rcBottomFontFamily,
					        	// Font size for the top lane
					        	rcbFontSize: rcBottomSettings.rcBottomFontSize,
					        	// Font color for the top lane
					        	rcbFontColor: rcBottomSettings.rcBottomFontColor,
					        	// Font style for the top lane
					        	rcbFontStyle: rcBottomSettings.rcBottomFontStyle,
					        	// Text for above top lane
					        	rcbText: false,
					        	// Offset for text below top lane
					        	rcbOffset: 10,
					        	// Image on the left side
					        	rcbImage: false,
					        	// Offset for image from the left side
					        	rcbImageOffsetRight: 0,
					        	// Offset for image from the bottom
					        	rcbImageOffsetBottom: 0
					        }, rcBottomSettings.rcbBelow);

							//Draw the TEXT BELOW
							ctx.fillStyle = rcbbSettings.rcbFontColor;
							ctx.font=rcbbSettings.rcbFontStyle + " " + rcbbSettings.rcbFontSize + " " + rcbbSettings.rcbFontFamily;
							ctx.textAlign = "right";
							ctx.textBaseline = "top";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(rcbbSettings.rcbText, ( rcBottomSettings.rcBottomLineWidth+rcBottomSettings.rcBottomPreMargin+rcBottomSettings.rcBottomMargin ) , ( centerX+rcBottomSettings.rcBottomHeight+rcbbSettings.rcbOffset ) );

							// Draw the IMAGE BELOW
							if(rcbbSettings.rcbImage !== false){
								
								var cat = loadImg(rcbbSettings.rcbImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(rightCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=rcbbSettings.rcbFontStyle + " " + rcbbSettings.rcbFontSize + " " + rcbbSettings.rcbFontFamily;
									ctx.drawImage(cat, ( rcBottomSettings.rcBottomLineWidth+rcBottomSettings.rcBottomPreMargin+rcBottomSettings.rcBottomMargin-cat.width-ctx.measureText(rcbbSettings.rcbText).width-rcbbSettings.rcbImageOffsetRight ) , ( centerX+rcBottomSettings.rcBottomHeight+rcbbSettings.rcbOffset-rcbbSettings.rcbImageOffsetBottom ) );
								});
										
							}

				        }
						
			        }

				}

			}

		/************************************************************************/
		/*************************                       ************************/
		/*************************   LEFT CANVAS STUFF   ************************/
		/*************************                       ************************/
		/************************************************************************/		

			// Just generate it when there is some object
			if(settings.dnLeftCanvas !== false){
	        	
	        	var leftCanvasId = 'leftCanvas-' + canvasId;
	        	// Generate the html for the left CANVAS
	        	var leftCanvas = "<canvas id='" + leftCanvasId + "' class='leftCanvas' width='" + settings.dnSize + "' height='" + settings.dnSize + "'></canvas>";
	        	// Create a CANVAS element inside the element
	        	$('#'+wrapperId).append(leftCanvas);


	        	/* GENERIC STUFF */
	        	// These are the defaults values for the left CANVAS, both bottom and top lanes
		        var leftSettings = $.extend({
		        	// Radius of the sphere on the middle of the CANVAS
		        	lcRadius: 5,
		        	// Offset for sphere on the middle, normally the same value of the radius
		        	lcOffset: 5,
		        	// Color for the sphere
		        	lcSphereColor: '#819596',
		        	// Color of the sphere stroke
					lcSphereStroke: '#819596',
		        	// Distance of the margin on the end of the angle
		        	lcPreMargin: 10,
		        	// Distance before drawing the text TODO - Automatic calc
		        	lcMargin: 10,	        	
		        	// Height of the line from the middle line
		        	lcHeight: 100,
		        	// Width in coordinates for the greater line
		        	lcLineWidth: 200,
		        	// Default value for the top lane
		        	lcTop: false,
		        	// Default value for the bottom lane
		        	lcBottom: false
		        }, settings.dnLeftCanvas );

		        // CIRCLE ON THE MIDDLE OF THE CANVAS STUFF
		        if( (leftSettings.lcTop !== false) || (leftSettings.lcBottom !== false) ){

					// Get the left CANVAS element
	        		var c=document.getElementById(leftCanvasId);
	        		// Get the context of the element
				    var ctx = c.getContext('2d');
				    // Place it on the center
				    var centerX = c.width / 2;
				    var centerY = c.height / 2;
				    // Radius and offset
				    var radius = leftSettings.lcRadius;
				    var offset = leftSettings.lcOffset;
				    // Draw the circle on the CANVAS
				    ctx.beginPath();
				    ctx.arc(c.width-offset-radius, centerY, radius, 0, 2 * Math.PI, false);
				    ctx.fillStyle = leftSettings.lcSphereColor;
				    ctx.fill();
				    ctx.strokeStyle = leftSettings.lcSphereStroke;;
				  	ctx.stroke();
				  	ctx.closePath();

				  	/**********************************************************************/
				  	/*************************** TOP LANE STUFF ***************************/
				  	/**********************************************************************/
			        // If there is a top lane
			        if(leftSettings.lcTop !== false){

			        	/* GENERIC TOP LANE STUFF */
		        		// These are the defaults values for TOP lane in left CANVAS
				        var lcTopSettings = $.extend({
				        	// Font family for the top lane
				        	lcTopFontFamily: settings.dnFontFamily,
				        	// Font size for the top lane
				        	lcTopFontSize: settings.dnFontSize,
				        	// Font color for the top lane
				        	lcTopFontColor: settings.dnFontColor,
				        	// Font style for the top lane
				        	lcTopFontStyle: settings.dnFontStyle,
				        	// Color of the line on top lane
				        	lcTopLineColor: leftSettings.lcSphereColor,
				        	// Value for the dashed lines
				        	lcTopDashLine: 0,
				        	// Width for the line
				        	lcStrokeWidth: 3,
				        	// Object for above top lanve
				        	lctAbove: false,
				        	// Object for below top lanve
				        	lctBelow: false,
				        	// Distance of the margin on the end of the angle on TOP lane
				        	lcTopPreMargin: leftSettings.lcPreMargin,
				        	// Distance before drawing the text TODO on TOP lane
				        	lcTopMargin: leftSettings.lcMargin,
				        	// Height of the line from the middle line on TOP lane
				        	lcTopHeight: leftSettings.lcHeight,
				        	// Width in coordinates for the greater line on TOP lane
				        	lcTopLineWidth: leftSettings.lcLineWidth,
				        }, leftSettings.lcTop );

				        // Draw the LINES
			        	ctx.beginPath();
			        	ctx.strokeStyle = lcTopSettings.lcTopLineColor;
			        	ctx.lineWidth = lcTopSettings.lcStrokeWidth;
			        	// If there is support for the dashed line
			        	if(ctx.setLineDash){
			        		ctx.setLineDash([lcTopSettings.lcTopDashLine]);
			        	}
						ctx.moveTo(c.width-leftSettings.lcRadius*2 , c.height / 2);
						ctx.lineTo(c.width-lcTopSettings.lcTopPreMargin, (centerX-lcTopSettings.lcTopHeight) );
						ctx.stroke();
						ctx.lineTo( c.width-(lcTopSettings.lcTopPreMargin+lcTopSettings.lcTopMargin+lcTopSettings.lcTopLineWidth) , (centerX-lcTopSettings.lcTopHeight) );
						ctx.stroke();
						ctx.closePath();
						
						/* ABOVE TOP LANE STUFF */
						// If there are something to draw above the line
				        if(lcTopSettings.lctAbove !== false){
				        	
			        		// These are the defaults values for ABOVE TOP lane in left CANVAS
					        var lctaSettings = $.extend({
					        	// Font family for the top lane
					        	lctFontFamily: lcTopSettings.lcTopFontFamily,
					        	// Font size for the top lane
					        	lctFontSize: lcTopSettings.lcTopFontSize,
					        	// Font color for the top lane
					        	lctFontColor: lcTopSettings.lcTopFontColor,
					        	// Font style for the top lane
					        	lctFontStyle: lcTopSettings.lcTopFontStyle,
					        	// Text for above top lane
					        	lctText: false,				        	
					        	// Offset for text above top lane
					        	lctOffset: 10,
					        	// Image on the left side
					        	lctImage: false,
					        	// Offset for image from the left side
					        	lctImageOffsetRight: 0,
					        	// Offset for image from the bottom
					        	lctImageOffsetBottom: 0
					        }, lcTopSettings.lctAbove);

							//Draw the TEXT ABOVE
							ctx.fillStyle = lctaSettings.lctFontColor;
							ctx.font=lctaSettings.lctFontStyle + " " + lctaSettings.lctFontSize + " " + lctaSettings.lctFontFamily;
							ctx.textAlign = "left";
							ctx.textBaseline = "bottom";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(lctaSettings.lctText, c.width-( lcTopSettings.lcTopLineWidth+lcTopSettings.lcTopPreMargin+lcTopSettings.lcTopMargin ) , ( centerX-lcTopSettings.lcTopHeight-lctaSettings.lctOffset ) );
							
							// Draw the IMAGE ABOVE
							if(lctaSettings.lctImage !== false){								
								var cat = loadImg(lctaSettings.lctImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(leftCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=lctaSettings.lctFontStyle + " " + lctaSettings.lctFontSize + " " + lctaSettings.lctFontFamily;
									ctx.drawImage(cat, c.width-( lcTopSettings.lcTopLineWidth+lcTopSettings.lcTopPreMargin+lcTopSettings.lcTopMargin-cat.width-ctx.measureText(lctaSettings.lctText).width-lctaSettings.lctImageOffsetRight ) , ( centerX-lcTopSettings.lcTopHeight-lctaSettings.lctOffset-cat.height-lctaSettings.lctImageOffsetBottom ) );
								});
							}
				        }

				        /* BELOW TOP LANE STUFF */
						// If there are something to draw below the line
				        if(lcTopSettings.lctBelow !== false){
				        	
			        		// These are the defaults values for BELOW TOP lane in left CANVAS
					        var lctbSettings = $.extend({
					        	// Font family for the top lane
					        	lctFontFamily: lcTopSettings.lcTopFontFamily,
					        	// Font size for the top lane
					        	lctFontSize: lcTopSettings.lcTopFontSize,
					        	// Font color for the top lane
					        	lctFontColor: lcTopSettings.lcTopFontColor,
					        	// Font style for the top lane
					        	lctFontStyle: lcTopSettings.lcTopFontStyle,
					        	// Text for above top lane
					        	lctText: false,
					        	// Offset for text below top lane
					        	lctOffset: 10,
					        	// Image on the left side
					        	lctImage: false,
					        	// Offset for image from the left side
					        	lctImageOffsetRight: 0,
					        	// Offset for image from the bottom
					        	lctImageOffsetBottom: 0
					        }, lcTopSettings.lctBelow);

							//Draw the TEXT BELOW
							ctx.fillStyle = lctbSettings.lctFontColor;
							ctx.font=lctbSettings.lctFontStyle + " " + lctbSettings.lctFontSize + " " + lctbSettings.lctFontFamily;
							ctx.textAlign = "left";
							ctx.textBaseline = "top";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(lctbSettings.lctText, c.width-( lcTopSettings.lcTopLineWidth+lcTopSettings.lcTopPreMargin+lcTopSettings.lcTopMargin ) , ( centerX-lcTopSettings.lcTopHeight+lctbSettings.lctOffset ) );

							// Draw the IMAGE BELOW
							if(lctbSettings.lctImage !== false){							
								var cat = loadImg(lctbSettings.lctImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(leftCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=lctbSettings.lctFontStyle + " " + lctbSettings.lctFontSize + " " + lctbSettings.lctFontFamily;
		 							ctx.drawImage(cat, c.width-( lcTopSettings.lcTopLineWidth+lcTopSettings.lcTopPreMargin+lcTopSettings.lcTopMargin-cat.width-ctx.measureText(lctbSettings.lctText).width-lctbSettings.lctImageOffsetRight ) , ( centerX-lcTopSettings.lcTopHeight+lctbSettings.lctOffset-lctbSettings.lctImageOffsetBottom ) );
								});

							}
				        }
						
			        }

			        /**********************************************************************/
				  	/************************* BOTTOM LANE STUFF **************************/
				  	/**********************************************************************/
			        // If there is a bottom lane
			        if(leftSettings.lcBottom !== false){

			        	/* GENERIC BOTTOM LANE STUFF */
		        		// These are the defaults values for BOTTOM lane in left CANVAS
				        var lcBottomSettings = $.extend({
				        	// Font family for the bottom lane
				        	lcBottomFontFamily: settings.dnFontFamily,
				        	// Font size for the bottom lane
				        	lcBottomFontSize: settings.dnFontSize,
				        	// Font color for the bottom lane
				        	lcBottomFontColor: settings.dnFontColor,
				        	// Font style for the bottom lane
				        	lcBottomFontStyle: settings.dnFontStyle,
				        	// Color of the line on bottom lane
				        	lcBottomLineColor: rightSettings.rcSphereColor,
				        	// Width for the line			        	
				        	lcStrokeWidth: 3,
				        	// Value for the dashed lines
				        	lcBottomDashLine: 0,
				        	// Object for above bottom lanve
				        	lcbAbove: false,
				        	// Object for below bottom lanve
				        	lcbBelow: false,
				        	// Distance of the margin on the end of the angle on BOTTOM lane
				        	lcBottomPreMargin: leftSettings.lcPreMargin,
				        	// Distance before drawing the text TODO on BOTTOM lane
				        	lcBottomMargin: leftSettings.lcMargin,
				        	// Height of the line from the middle line on BOTTOM lane
				        	lcBottomHeight: leftSettings.lcHeight,
				        	// Width in coordinates for the greater line on BOTTOM lane
				        	lcBottomLineWidth: leftSettings.lcLineWidth,
				        }, leftSettings.lcBottom );

				        // Draw the LINES
			        	ctx.beginPath();
			        	ctx.strokeStyle = lcBottomSettings.lcBottomLineColor;
			        	ctx.lineWidth = lcBottomSettings.lcStrokeWidth;
			        	// If there is support for the dashed line
			        	if(ctx.setLineDash){
			        		ctx.setLineDash([lcBottomSettings.lcBottomDashLine]);
			        	}
						ctx.moveTo(c.width-leftSettings.lcRadius*2 , c.height / 2);
						ctx.lineTo(c.width-lcBottomSettings.lcBottomPreMargin, (centerX+lcBottomSettings.lcBottomHeight) );
						ctx.stroke();
						ctx.lineTo( c.width-(lcBottomSettings.lcBottomPreMargin+lcBottomSettings.lcBottomMargin+lcBottomSettings.lcBottomLineWidth) , (centerX+lcBottomSettings.lcBottomHeight) );
						ctx.stroke();
						ctx.closePath();
						
						/* ABOVE BOTTOM LANE STUFF */
						// If there are something to draw above the line
				        if(lcBottomSettings.lcbAbove !== false){
				        	
			        		// These are the defaults values for ABOVE TOP lane in right CANVAS
					        var lcbaSettings = $.extend({
					        	// Font family for the top lane
					        	lcbFontFamily: lcBottomSettings.lcBottomFontFamily,
					        	// Font size for the top lane
					        	lcbFontSize: lcBottomSettings.lcBottomFontSize,
					        	// Font color for the top lane
					        	lcbFontColor: lcBottomSettings.lcBottomFontColor,
					        	// Font style for the top lane
					        	lcbFontStyle: lcBottomSettings.lcBottomFontStyle,
					        	// Text for above top lane
					        	lcbText: false,				        	
					        	// Offset for text above top lane
					        	lcbOffset: 10,
					        	// Image on the left side
					        	lcbImage: false,
					        	// Offset for image from the left side
					        	lcbImageOffsetRight: 0,
								// Offset for image from the bottom
					        	lcbImageOffsetBottom: 0
					        }, lcBottomSettings.lcbAbove);

							//Draw the TEXT ABOVE
							ctx.fillStyle = lcbaSettings.lcbFontColor;
							ctx.font=lcbaSettings.lcbFontStyle + " " + lcbaSettings.lcbFontSize + " " + lcbaSettings.lcbFontFamily;
							ctx.textAlign = "left";
							ctx.textBaseline = "bottom";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(lcbaSettings.lcbText, c.width-( lcBottomSettings.lcBottomLineWidth+lcBottomSettings.lcBottomPreMargin+lcBottomSettings.lcBottomMargin ) , ( centerX+lcBottomSettings.lcBottomHeight-lcbaSettings.lcbOffset ) );
							
							// Draw the IMAGE ABOVE
							if(lcbaSettings.lcbImage !== false){
								var cat = loadImg(lcbaSettings.lcbImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(leftCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=lcbaSettings.lcbFontStyle + " " + lcbaSettings.lcbFontSize + " " + lcbaSettings.lcbFontFamily;
									ctx.drawImage(cat, c.width-( lcBottomSettings.lcBottomLineWidth+lcBottomSettings.lcBottomPreMargin+lcBottomSettings.lcBottomMargin-cat.width-ctx.measureText(lcbaSettings.lcbText).width-lcbaSettings.lcbImageOffsetRight ) , ( centerX+lcBottomSettings.lcBottomHeight-lcbaSettings.lcbOffset-cat.height-lcbaSettings.lcbImageOffsetBottom ) );
								});
							}
							
				        }

				        /* BELOW BOTTOM LANE STUFF */
						// If there are something to draw below the line
				        if(lcBottomSettings.lcbBelow !== false){
				        	
			        		// These are the defaults values for BELOW TOP lane in left CANVAS
					        var lcbbSettings = $.extend({
					        	// Font family for the top lane
					        	lcbFontFamily: lcBottomSettings.lcBottomFontFamily,
					        	// Font size for the top lane
					        	lcbFontSize: lcBottomSettings.lcBottomFontSize,
					        	// Font color for the top lane
					        	lcbFontColor: lcBottomSettings.lcBottomFontColor,
					        	// Font style for the top lane
					        	lcbFontStyle: lcBottomSettings.lcBottomFontStyle,
					        	// Text for above top lane
					        	lcbText: false,
					        	// Offset for text below top lane
					        	lcbOffset: 10,
					        	// Image on the left side
					        	lcbImage: false,
					        	// Offset for image from the left side
					        	lcbImageOffsetRight: 0,
					        	// Offset for image from the bottom
					        	lcbImageOffsetBottom: 0
					        }, lcBottomSettings.lcbBelow);

							//Draw the TEXT BELOW
							ctx.fillStyle = lcbbSettings.lcbFontColor;
							ctx.font=lcbbSettings.lcbFontStyle + " " + lcbbSettings.lcbFontSize + " " + lcbbSettings.lcbFontFamily;
							ctx.textAlign = "left";
							ctx.textBaseline = "top";
							// TODO - Calc the position where the text will be draw
							ctx.fillText(lcbbSettings.lcbText, c.width-( lcBottomSettings.lcBottomLineWidth+lcBottomSettings.lcBottomPreMargin+lcBottomSettings.lcBottomMargin ) , ( centerX+lcBottomSettings.lcBottomHeight+lcbbSettings.lcbOffset ) );

							// Draw the IMAGE BELOW
							if(lcbbSettings.lcbImage !== false){
								
								var cat = loadImg(lcbbSettings.lcbImage, function() {
									// Get the canvas and context again to prevent errors
									var c=document.getElementById(leftCanvasId);
								    var ctx = c.getContext('2d');
									ctx.font=lcbbSettings.lcbFontStyle + " " + lcbbSettings.lcbFontSize + " " + lcbbSettings.lcbFontFamily;									
									ctx.drawImage(cat, c.width-( lcBottomSettings.lcBottomLineWidth+lcBottomSettings.lcBottomPreMargin+lcBottomSettings.lcBottomMargin-cat.width-ctx.measureText(lcbbSettings.lcbText).width-lcbbSettings.lcbImageOffsetRight ) , ( centerX+lcBottomSettings.lcBottomHeight+lcbbSettings.lcbOffset-lcbbSettings.lcbImageOffsetBottom ) );
								});
										
							}

				        }
						
			        }

				}

			}

    };

    // Function to load an image and return an Image() Object
    function loadImg(src, callback) {
	    var img = new Image();
	    img.onload = callback;
	    img.src = src;
	    return img;
	}

}( jQuery ));

// TODO - All default params follow through the hierarchy