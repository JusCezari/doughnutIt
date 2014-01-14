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
	        	// Default value for the top lane
	        	rcTop: false,
	        	// Default value for the bottom lane
	        	rcBottom: false
	        }, settings.dnRightCanvas );


	        // Just some debugging
	        console.log("RIGHT SETTINGS");
	        console.log(rightSettings);



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

			  	/* TOP LANE STUFF */
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
			        	rcTopLineColor: settings.dnFontColor,
			        	// Object for above top lanve
			        	rctAbove: false,
			        	// Object for below top lanve
			        	rctBelow: false
			        }, rightSettings.rcTop );

			        // Draw the LINES
		        	ctx.beginPath();
		        	ctx.strokeStyle = rcTopSettings.rcTopLineColor;
					ctx.moveTo(10,c.height / 2);
					ctx.lineTo(50,45);
					ctx.stroke();
					ctx.lineTo(200,45);
					ctx.stroke();
					ctx.closePath();
					
					/* ABOVE TOP LANE STUFF */
					// If there are something to draw above the line
			        if(rcTopSettings.rctAbove !== false){
			        	
		        		// These are the defaults values for ABOVE TOP lane in right CANVAS
				        var rctSettings = $.extend({
				        	// Font family for the top lane
				        	rctFontFamily: rcTopSettings.rctFontFamily,
				        	// Font size for the top lane
				        	rctFontSize: rcTopSettings.rctFontSize,
				        	// Font color for the top lane
				        	rctFontColor: rcTopSettings.rctFontColor,
				        	// Font style for the top lane
				        	rctFontStyle: rcTopSettings.rctFontStyle,
				        	// Text for above top lane
				        	rctText: false,				        	
				        }, rcTopSettings.rctAbove);

						//Draw the TEXT ABOVE
						ctx.fillStyle = rctSettings.rctFontColor;
						ctx.font=rctSettings.rctFontStyle + " " + rctSettings.rctFontSize + " " + rctSettings.rctFontFamily;

						// TODO - Calc the position where the text will be draw
						ctx.fillText(rctSettings.rctText, 136, 40);
						
			        }


			        /* BELOW TOP LANE STUFF */
					// If there are something to draw below the line
			        if(rcTopSettings.rctBelow !== false){
			        	
		        		// These are the defaults values for BELOW TOP lane in right CANVAS
				        var rctSettings = $.extend({
				        	// Font family for the top lane
				        	rctFontFamily: rcTopSettings.rctFontFamily,
				        	// Font size for the top lane
				        	rctFontSize: rcTopSettings.rctFontSize,
				        	// Font color for the top lane
				        	rctFontColor: rcTopSettings.rctFontColor,
				        	// Font style for the top lane
				        	rctFontStyle: rcTopSettings.rctFontStyle,
				        	// Text for above top lane
				        	rctText: false,				        	
				        }, rcTopSettings.rctBelow);

						//Draw the TEXT BELOW
						ctx.fillStyle = rctSettings.rctFontColor;
						ctx.font=rctSettings.rctFontStyle + " " + rctSettings.rctFontSize + " " + rctSettings.rctFontFamily;

						// TODO - Calc the position where the text will be draw
						ctx.fillText(rctSettings.rctText, 136, 140);
						
			        }
					
		        }

			}

		}

    };

}( jQuery ));

// TODO - All default params follow through the hierarchy