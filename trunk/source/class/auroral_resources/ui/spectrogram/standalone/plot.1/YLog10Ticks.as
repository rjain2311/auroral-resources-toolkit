 package  plot {
	import flash.display.Sprite;
	import flash.display.Shape;
	import flash.display.Graphics;
	import utils.math.linearScale;
	import flash.display.LineScaleMode;
	import flash.display.CapsStyle;
	import flash.display.JointStyle;
	import utils.math.log10;
	
	public class YLog10Ticks extends Sprite {
		private var ticks:Shape;
		private var bg:Shape;
		
		private var _componentWidth:Number;
		private var _componentHeight:Number;
		
		private var _rangeMin:Number;
		private var _rangeMax:Number;
		
		private var log10RangeMin:Number;
		private var log10RangeMax:Number;
		
		public function YLog10Ticks(rangeMin:Number, rangeMax:Number, componentWidth:Number, componentHeight:Number) {
			_rangeMin = rangeMin;
			_rangeMax = rangeMax;
			
			log10RangeMin = log10(_rangeMin);
			log10RangeMax = log10(_rangeMax);
			
			_componentWidth = componentWidth;
			_componentHeight = componentHeight;
			
			createComponent();
		}
		
		// _rangeMin = 27
		// _rangeMax = 7100
		// tickValue = i*10^j
		// log10TickValue = log10(30 40 ... 90  100 200 ... 900  1000 2000 ... 7000)
		private function createComponent() {
			bg = new Shape();
			bg.graphics.beginFill(0xFFFFFF, 0);
			bg.graphics.drawRect(0,0,_componentWidth,_componentHeight);
			bg.graphics.endFill();
			addChild(bg);
			
			ticks = new Shape();
			var g:Graphics = ticks.graphics;
			g.lineStyle(1, 0x000000, 1, false, LineScaleMode.NONE, CapsStyle.NONE, JointStyle.MITER, 3);
			
			var j:int = Math.floor(log10RangeMin);
			var i:int = Math.ceil(_rangeMin/Math.pow(10,j));
			var log10TickValue:Number = j + log10(i);
			while (log10TickValue <= log10RangeMax) {
				if (i == 1) { i=10; }
				var x = _componentWidth*log10(i);
				if (i == 10) { i=1; }
				var y = linearScale(log10TickValue, log10RangeMin, log10RangeMax, _componentHeight, 0);
				g.moveTo(0, y);
				g.lineTo(x, y);
				
				i+=1;
				if (i == 10) { i=1; j+=1; };
				log10TickValue = j + log10(i);
			}
			g.moveTo(0, 0);
			g.lineTo(0, _componentHeight);
			
			addChild(ticks);
		}
		
		public function getLabelTicks():Array {
			var j0:int = Math.ceil(log10RangeMin);
			var j1:int = Math.floor(log10RangeMax);
			var labelTicks:Array = new Array(j1-j0+1);
			for (var i=j0; i<=j1; i++) {
				labelTicks[i-j0] = linearScale(i, log10RangeMin, log10RangeMax, _componentHeight, 0);;
			}
			
			return labelTicks;
		}
	}
	
}
