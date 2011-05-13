package  plot {
	import flash.display.BitmapData;
	import flash.display.Bitmap;
	import flash.display.Shape;
	import flash.display.Sprite;
	import utils.math.linearScale;
	import flash.geom.Rectangle;
	
	public class Heatmap extends Sprite{
		private var bg:Shape;
		private var image:Bitmap;
		private var bitmapData:BitmapData;
		
		private var _componentWidth:Number;
		private var _componentHeight:Number;
		
		private var _colormap:Colormap;
		private var _numLines:Number;
		
		public function Heatmap(componentWidth:Number, componentHeight:Number, colormap:Colormap, numLines:Number) {
			_componentWidth = componentWidth;
			_componentHeight = componentHeight;
			_colormap = colormap;
			_numLines = numLines;
			
			bg = new Shape();
			bg.graphics.beginFill(0xFFFFFF, 0.3);
			bg.graphics.drawRect(0,0,_componentWidth,_componentHeight);
			bg.graphics.endFill();
			addChild(bg);
			
			bitmapData = new BitmapData(_componentWidth, _numLines, false);
			image = new Bitmap(bitmapData,"auto",false);
			image.x = 0;
			image.y = 0;
			image.height = _componentHeight;
			addChild(image);
		}
		
		public function setDataLine(line:Array, noLine:uint) {
			for (var i=0; i<_componentWidth; i++) {
				var ind:uint = Math.floor(linearScale(i,0,_componentWidth,0,line.length));
				bitmapData.setPixel(i, noLine, _colormap.getColor(line[ind]));
			}
		}
		
		public function reset():void {
			var rect:Rectangle = new Rectangle(0,0,_componentWidth,_numLines);
			bitmapData.fillRect(rect,0xFFFFFF);
		}

	}
	
}
