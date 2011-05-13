package  plot {
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Rectangle;
	import flash.display.Shape;
	import flash.display.Sprite;
	
	public class Colorbar extends Sprite{
		private var bg:Shape;
		private var gradient:Bitmap;
		private var blackBar:Shape;
		private var barHeight:Number = 5;
		
		private var _componentWidth:Number;
		private var _componentHeight:Number;

		public function Colorbar(componentWidth:Number, componentHeight:Number) {
			_componentWidth = componentWidth;
			_componentHeight = componentHeight;
			
			bg = new Shape();
			bg.graphics.beginFill(0xFFFFFF, 0);
			bg.graphics.drawRect(0,0,_componentWidth,_componentHeight);
			bg.graphics.endFill();
			addChild(bg);
			
			var cm:Colormap = new Colormap(0, componentHeight);
			var bitmapData:BitmapData = new BitmapData(componentWidth, componentHeight, false);
			for (var i=0; i<=componentHeight; i++) {
				var rect:Rectangle = new Rectangle(0,componentHeight - i,componentWidth,1);
				bitmapData.fillRect(rect, cm.getColor(i));
			}
			gradient = new Bitmap(bitmapData);
			gradient.x = 0;
			gradient.y = 0;
			addChild(gradient);
			
			blackBar = new Shape();
			blackBar.graphics.beginFill(cm.getColor(componentHeight + 1));
			blackBar.graphics.drawRect(0,0,componentWidth,barHeight);
			blackBar.graphics.endFill();
			blackBar.x = 0;
			blackBar.y = -2*barHeight;
			addChild(blackBar);
		}

	}
	
}
