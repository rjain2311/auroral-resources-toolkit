package  plot {
	import utils.math.linearScale;
	import fl.motion.Color;
	import flash.geom.ColorTransform;
	
	public class Colormap {
		private var _minX:Number;
		private var _maxX:Number;
		
		public static const white:uint  = 0xFFFFFF;
		public static const gray:uint   = 0xCCCCCC;
		public static const black:uint  = 0x000000;
		
		public static const blue:uint   = 0x0000FF;
		public static const cyan:uint   = 0x00FFFF;
		public static const green:uint  = 0x009B00;
		public static const yellow:uint = 0xFFFF00;
		public static const red:uint    = 0xFF0000;
		
		private var colors:Array = [blue, cyan, green, yellow, red];

		public function Colormap(minX:Number, maxX:Number) {
			_minX = minX;
			_maxX = maxX;
		}
		
		public function getColor(x:Number):uint {
			if (x <= 0) return white;
			if (x < _minX) return gray;
			if (x > _maxX) return black;
			
			var ratio:Number = (x-_minX)/(_maxX-_minX);
			var noInterval:int = Math.floor(ratio*(colors.length-1));
			var color0:Object = hexToRGB(colors[noInterval]);
			var color1:Object = hexToRGB(colors[noInterval+1]);
			
			var tx:Number = ratio*(colors.length-1) - noInterval;
			
			var color:Object = new Object();
			color.r = uint(linearScale(tx, 0, 1, color0.r, color1.r));
			color.g = uint(linearScale(tx, 0, 1, color0.g, color1.g));
			color.b = uint(linearScale(tx, 0, 1, color0.b, color1.b));
			return RGBToHex(color);
			
//			return uint(linearScale(ratio-noInterval, 0, 1, color0, color1));
//			return color1;
//			return uint((ratio-noInterval)*color0 + (1 - (ratio-noInterval))*color1);
		}

		public static function hexToRGB(hex:uint):Object {
			var c:Object = {};
	
			c.a = hex >> 24 & 0xFF;
			c.r = hex >> 16 & 0xFF;
			c.g = hex >> 8 & 0xFF;
			c.b = hex & 0xFF;
	
			return c;
		}
		
		public static function RGBToHex(c:Object):uint {
			var ct:ColorTransform = new ColorTransform(0, 0, 0, 0, c.r, c.g, c.b, 100);
			return ct.color as uint
		}
	}
	
}
