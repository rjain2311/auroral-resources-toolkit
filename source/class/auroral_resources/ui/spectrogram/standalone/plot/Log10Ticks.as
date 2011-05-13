package  plot {
	import flash.display.Sprite;
	import flash.display.Shape;
	import flash.display.Graphics;
	
	public class Log10Ticks extends Sprite {
		private var tisks:Shape;
		private var _componentWidth:Number;
		private var _componentHeight:Number;
		
		private var _rangeMin:Number;
		private var _rangeMax:Number;
		
		public function Log10Ticks(rangeMin:Number, rangeMax:Number, componentWidth:Number, componentHeight:Number) {
			_rangeMin = rangeMin;
			_rangeMax = rangeMax;
			
			_componentWidth = componentWidth;
			_componentHeight = componentHeight;
			
			createComponent();
		}
		
		private function createComponent() {
			var y_scale = pv.Scale.log(_rangeMin, _rangeMax, 0, _componentHeight);
			var y_tick_scale = pv.Scale.linear(0, 1).range(0, 5);
			heatmap.add(pv.Rule)
				.data(y_scale.ticks())
				.bottom(y_scale)
				.width(function(d) { var t=log10(d); return y_tick_scale(t-Math.floor(t)); } )
				.left(function(d) { var t=log10(d); return -y_tick_scale(t-Math.floor(t)); })
				.strokeStyle("black");
			
			ticks = new Shape();
			var g:Graphics = ticks.graphics;
			
		}

		private function getLog10TicksValues():Array {
			// log10RangeMin = 27
			// log10RangeMax = 7100
			// return log10(30 40 ... 90  100 200 ... 900  1000 2000 ... 7000)
			var values:Array = new Array();
			
			var log10From:Number = Math.floor(Math.log(rangeMin));
			var log10To:Number = log10RangeMin;
			for(var i=log10From;i<=log10To;i++) {
				for (var j=1; j<9; j++) {
					values.push(i + log10(j));
				}
			}
		}
	}
	
}
