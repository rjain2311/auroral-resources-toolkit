package  plot {
	import flash.text.TextField;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.text.TextFieldAutoSize;
	
	public class XLabels extends Sprite{
		public static const DATE:String = "date";
		
		private var _labels:Array; /*of TextField components*/
		private var bg:Shape;
		
		private var componentWidth:Number;

		public function XLabels(labels:Array, type:String, width:Number) {
			componentWidth = width;
			
			bg = new Shape();
			bg.graphics.beginFill(0xFFFFFF, 0);
			bg.graphics.drawRect(0,0,componentWidth,1);
			bg.graphics.endFill();
			addChild(bg);
			
			this.labels = labels;
		}
		
		public function set labels(value:Array):void {
			if (_labels != null) {
				for (var i=0; i<_labels.length; i++) {
					removeChild(_labels[i]);
					_labels[i] = null;
				}
			}
			
			_labels = new Array(value.length);
			
			for (var i=0; i<value.length; i++) {
				var tf:TextField = new TextField();
				var format:TextFormat = tf.getTextFormat();
				
				format.align = TextFormatAlign.CENTER;
				tf.text = value[i];
				tf.setTextFormat(format);
				tf.autoSize = TextFieldAutoSize.CENTER;
				tf.y = 0;
				
				_labels[i] = tf;
				addChild(tf);
			}
			
			updateLayout();
		}
		
		override public function get height():Number {
			return 1;
		}
		
		override public function set height(value:Number):void {
			return;
		}
		
		override public function set width(value:Number):void {
			componentWidth = value;
			bg.width = componentWidth;
			updateLayout();
		}
		
		override public function get width():Number {
			return componentWidth;
		}
		
		private function updateLayout():void {
			var numLabels:int = _labels.length;
			for (var i=0; i<numLabels; i++) {
				_labels[i].x = componentWidth*i/(numLabels-1) - _labels[i].width/2;
			}
		}
		
		public static function getTicks(data:Array):Array {
			var numData:int = data.length;
			var ticks:Array = new Array(6);
			for (var i=0; i<6; i++) {
				ticks[i] = data[Math.floor((numData-1)*i/5)];
			}
			return ticks;
		}
	}
	
}
