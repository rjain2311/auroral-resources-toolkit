package  plot {
	import flash.display.Sprite;
	import flash.display.Shape;
	
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
		}

	}
	
}
