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
			// Start angle for the first slice of the doughnut
			dnStartAngle: -90,
			// Animation in counter clockwise - HAS ISSUES
			dnCounterClockwise: false,
			// If an object is passed it generates a right canvas with some text
			dnRightCanvas: false
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
	        showTextInside: settings.dnShowText,
	        doughnutText: settings.dnText,
	        degreeStart: settings.dnStartAngle,	
	        counterClockwise: settings.dnCounterClockwise
		}

        // Create the doughnut chart
		var myDoughnut = new Chart(document.getElementById(canvasId).getContext("2d")).Doughnut(settings.dnData,options);

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
			        	rctBelow: false
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
					ctx.lineTo(rightSettings.rcPreMargin, (centerX-rightSettings.rcHeight) );
					ctx.stroke();
					ctx.lineTo( (rightSettings.rcPreMargin+rightSettings.rcMargin+rightSettings.rcLineWidth) , (centerX-rightSettings.rcHeight) );
					ctx.stroke();
					ctx.closePath();
					
					/* ABOVE TOP LANE STUFF */
					// If there are something to draw above the line
			        if(rcTopSettings.rctAbove !== false){
			        	
		        		// These are the defaults values for ABOVE TOP lane in right CANVAS
				        var rctSettings = $.extend({
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
				        	rctOffset: 10
				        }, rcTopSettings.rctAbove);

						//Draw the TEXT ABOVE
						ctx.fillStyle = rctSettings.rctFontColor;
						ctx.font=rctSettings.rctFontStyle + " " + rctSettings.rctFontSize + " " + rctSettings.rctFontFamily;
						ctx.textAlign = "right";
						ctx.textBaseline = "bottom";
						// TODO - Calc the position where the text will be draw
						ctx.fillText(rctSettings.rctText, ( rightSettings.rcLineWidth+rightSettings.rcPreMargin+rightSettings.rcMargin ) , ( centerX-rightSettings.rcHeight-rctSettings.rctOffset ) );
						
			        }

			        /* BELOW TOP LANE STUFF */
					// If there are something to draw below the line
			        if(rcTopSettings.rctBelow !== false){
			        	
		        		// These are the defaults values for BELOW TOP lane in right CANVAS
				        var rctSettings = $.extend({
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
				        	rctOffset: 10
				        }, rcTopSettings.rctBelow);

						//Draw the TEXT BELOW
						ctx.fillStyle = rctSettings.rctFontColor;
						ctx.font=rctSettings.rctFontStyle + " " + rctSettings.rctFontSize + " " + rctSettings.rctFontFamily;
						ctx.textAlign = "right";
						ctx.textBaseline = "top";
						// TODO - Calc the position where the text will be draw
						ctx.fillText(rctSettings.rctText, ( rightSettings.rcLineWidth+rightSettings.rcPreMargin+rightSettings.rcMargin ) , ( centerX-rightSettings.rcHeight+rctSettings.rctOffset ) );

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
			        	rcbBelow: false
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
					ctx.lineTo(rightSettings.rcPreMargin, (centerX+rightSettings.rcHeight) );
					ctx.stroke();
					ctx.lineTo( (rightSettings.rcPreMargin+rightSettings.rcMargin+rightSettings.rcLineWidth) , (centerX+rightSettings.rcHeight) );
					ctx.stroke();
					ctx.closePath();
					
					/* ABOVE BOTTOM LANE STUFF */
					// If there are something to draw above the line
			        if(rcBottomSettings.rcbAbove !== false){
			        	
		        		// These are the defaults values for ABOVE TOP lane in right CANVAS
				        var rcbSettings = $.extend({
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
				        	rcbOffset: 10
				        }, rcBottomSettings.rcbAbove);

						//Draw the TEXT ABOVE
						ctx.fillStyle = rcbSettings.rcbFontColor;
						ctx.font=rcbSettings.rcbFontStyle + " " + rcbSettings.rcbFontSize + " " + rcbSettings.rcbFontFamily;
						ctx.textAlign = "right";
						ctx.textBaseline = "bottom";
						// TODO - Calc the position where the text will be draw
						ctx.fillText(rcbSettings.rcbText, ( rightSettings.rcLineWidth+rightSettings.rcPreMargin+rightSettings.rcMargin ) , ( centerX+rightSettings.rcHeight-rcbSettings.rcbOffset ) );
						
			        }

			        /* BELOW BOTTOM LANE STUFF */
					// If there are something to draw below the line
			        if(rcBottomSettings.rcbBelow !== false){
			        	
		        		// These are the defaults values for BELOW TOP lane in right CANVAS
				        var rcbSettings = $.extend({
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
				        	rcbOffset: 10
				        }, rcBottomSettings.rcbBelow);

						//Draw the TEXT BELOW
						ctx.fillStyle = rcbSettings.rcbFontColor;
						ctx.font=rcbSettings.rcbFontStyle + " " + rcbSettings.rcbFontSize + " " + rcbSettings.rcbFontFamily;
						ctx.textAlign = "right";
						ctx.textBaseline = "top";
						// TODO - Calc the position where the text will be draw
						ctx.fillText(rcbSettings.rcbText, ( rightSettings.rcLineWidth+rightSettings.rcPreMargin+rightSettings.rcMargin ) , ( centerX+rightSettings.rcHeight+rcbSettings.rcbOffset ) );

			        }
					
		        }

			}

		}

    };

}( jQuery ));

// TODO - All default params follow through the hierarchy