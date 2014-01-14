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
			dnFontSize: 24,
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

        	// These are the defaults values for the right CANVAS
	        var rightSettings = $.extend({
	        	// Radius of the sphere on the middle of the CANVAS
	        	rcRadius: 5,
	        	// Distance of the margin on the end of the angle
	        	rcPreMargin: 10,
	        	// Distance before drawing the text TODO - Automatic calc
	        	rcMargin: 10,
	        	// Text to display
	        	rcText: 'MÉDIA',

	        	rcHeight: 100
	        }, settings.dnRightCanvas );


	        console.log(rightSettings);

			var c=document.getElementById(rightCanvasId);

		    var ctx = c.getContext('2d');
		    var centerX = c.width / 2;
		    var centerY = c.height / 2;
		    var radius = 5;

		    var offset = 5;

		    ctx.beginPath();
		    ctx.arc(offset+radius, centerY, radius, 0, 2 * Math.PI, false);
		    ctx.fillStyle = '819596';
		    ctx.fill();
		    ctx.strokeStyle = '#819596';
		  	ctx.stroke();
		  	ctx.closePath();
		    
			
			ctx.beginPath();
			ctx.moveTo(10,c.height / 2);
			ctx.lineTo(50,45);
			ctx.stroke();
			ctx.lineTo(200,45);
			ctx.stroke();
			ctx.closePath();

			ctx.font="100% Arial";
			ctx.fillText('MÉDIA', 149, 40);

			ctx.font="300% Arial";
			ctx.fillText('8.3', 135, 90);

		}

    };

}( jQuery ));