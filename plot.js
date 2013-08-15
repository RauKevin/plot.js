function Plot(data,canvas_id,canvas_width,canvas_height)
{
	var bound = null;
	var scale = 0;
	var shift_x = 0;
	var shift_y = 0;
	var extremaX_delta = 0;
	var extremaY_delta = 0;
	var height = canvas_height > 0? canvas_height : 0;
	var width = canvas_width > 0? canvas_width : 0;
	var cnvs_id = canvas_id;

	plotData(data);
	function plotData(data)
	{
		bound = getBoundingBox(data);

		if (bound != null) {
			extremaY_delta = bound.max_y - bound.min_y;
			extremaX_delta = bound.max_x - bound.min_x;
			reverse_min_x = -1*bound.min_x;
			reverse_max_y = -1*bound.max_y;

			if (width < height) {
				if (extremaX_delta > 0) {
					scale = (0.9*width)/extremaX_delta; // 90% of canvas width
					shift_x = 0.05*width;					// 5% of canvas width
					shift_y = (height/2) - (0.5*extremaY_delta*scale);
				}
			} else {
				if (extremaY_delta > 0) {
					scale = (0.9*height)/extremaY_delta;
					shift_y = 0.05*height;
					shift_x = (width/2) - (0.5*extremaX_delta*scale);
				}
			}

			var canvas = document.getElementById(cnvs_id);
			var context = canvas.getContext('2d');

			var x = shift_x + (reverse_min_x + parseFloat(data[0][0]))*scale;
			var y = shift_y + -1*(reverse_max_y + parseFloat(data[0][1]))*scale;

			context.beginPath();
			context.moveTo(x,y);

			for( var i = 0; i < data.length; i++)
			{
				x = shift_x + (reverse_min_x + parseFloat(data[i][0]))*scale;
				y = shift_y + -1*(reverse_max_y + parseFloat(data[i][1]))*scale;
				context.lineTo(x,y);

				console.log({x :x,y :y});
			}

			context.lineWidth = 2;
			context.strokeStyle = 'white';
			context.stroke();
		}
	}

	function getBoundingBox(data)
	{
		if (data.length > 0) {
			try {
				var bound = {
					"max_x" : parseFloat(data[0][0]),
					"min_x" : parseFloat(data[0][0]),
					"max_y" : parseFloat(data[0][1]),
					"min_y" : parseFloat(data[0][1])
				};

				for( var i = 0; i < data.length; i++)
				{
					if(data[i][0] < bound.min_x)
						bound.min_x = parseFloat(data[i][0]);
					else if(data[i][0] > bound.max_x)
						bound.max_x = parseFloat(data[i][0]);

					if(data[i][1] < bound.min_y)
						bound.min_y = parseFloat(data[i][1]);
					else if(data[i][1] > bound.max_y)
						bound.max_y = parseFloat(data[i][1]);
				}
				return bound;
			}catch(err){}
		}
		return null;
	}
}