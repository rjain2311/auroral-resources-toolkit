package  plot {
	import flash.text.TextField;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.text.TextFieldAutoSize;
	
	public class YLabels extends Sprite{
		private var labels:Array;
		private var _ticks:YLog10Ticks;
		private var bg:Shape;
		
		private var componentHeight:Number;

		public function YLabels(labels:Array, ticks:YLog10Ticks, height:Number, align:String) {
			_ticks = ticks;
			
			componentHeight = height;
			
			bg = new Shape();
			bg.graphics.beginFill(0xFFFFFF, 0);
			bg.graphics.drawRect(0,0,1,componentHeight);
			bg.graphics.endFill();
			addChild(bg);
			
			this.labels = new Array(labels.length);
			for (var i=0; i<labels.length; i++) {
				var tf:TextField = new TextField();
				var format:TextFormat = tf.getTextFormat();
				
				format.align = align;
				tf.text = labels[i];
				tf.setTextFormat(format);
				tf.autoSize = TextFieldAutoSize.CENTER;
				if (align == TextFormatAlign.LEFT) { tf.x = 0; }
				else { tf.x = -tf.width; }
				
				this.labels[i] = tf;
				addChild(tf);
			}
			
			updateLayout();
		}
		
		override public function get height():Number {
			return componentHeight;
		}
		
		override public function set height(value:Number):void {
			componentHeight = value;
			bg.height = componentHeight;
			updateLayout();
		}
		
		override public function set width(value:Number):void {
			return;
		}
		
		override public function get width():Number {
			return 1;
		}
		
		private function updateLayout():void {
			var labelTicks:Array = _ticks.getLabelTicks();
			for (var i=0; i<labels.length; i++) {
				labels[i].y = labelTicks[i] - labels[i].height/2;
			}
		}
	}
	
}
