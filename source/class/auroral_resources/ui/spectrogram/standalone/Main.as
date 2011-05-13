package  {
	
	import flash.display.MovieClip;
	import plot.YLog10Ticks;
	import plot.YLabels;
	import flash.text.TextFormatAlign;
	import plot.XLabels;
	import plot.Colormap;
	import plot.Colorbar;
	import plot.Heatmap;
	import loader.DataLoader;
	import flash.display.StageScaleMode;
	
	import flash.external.ExternalInterface;
	import flash.events.Event;
	import utils.math.log10;
	
	
	public class Main extends MovieClip {
		private var el_YLog10Ticks:YLog10Ticks;
		private var er_YLog10Ticks:YLog10Ticks;
		private var el_YLabels:YLabels;
		private var er_YLabels:YLabels;
		
		private var il_YLog10Ticks:YLog10Ticks;
		private var ir_YLog10Ticks:YLog10Ticks;
		private var il_YLabels:YLabels;
		private var ir_YLabels:YLabels;
		
		private var cl_YLog10Ticks:YLog10Ticks;
		private var cr_YLog10Ticks:YLog10Ticks;
		private var cl_YLabels:YLabels;
		private var cr_YLabels:YLabels;
		
		private var ut_XLabels:XLabels;
		private var lat_XLabels:XLabels;
		private var lon_XLabels:XLabels;
		private var mlat_XLabels:XLabels;
		private var mlt_XLabels:XLabels;
		
		private var colorbar:Colorbar;
		
		private var eHeatmap:Heatmap;
		private var iHeatmap:Heatmap;
		
		private var dataLoader:DataLoader;
		
		private var max_energy_e:Number = 10;
		private var min_energy_e:Number = 5;
		private var max_energy_ion:Number = 8;
		private var min_energy_ion:Number = 3;
		
		public function Main() {
			stage.scaleMode=StageScaleMode.NO_SCALE;

			// Electrons
			eHeatmap = new Heatmap(350, 115, new Colormap(min_energy_e,max_energy_e), 19);
			eHeatmap.x = 110;
			eHeatmap.y = 55;
			addChild(eHeatmap);
			
			el_YLog10Ticks = new YLog10Ticks(34, 29500, 7, 115);
			el_YLog10Ticks.x = 110;
			el_YLog10Ticks.y = 55;
			el_YLog10Ticks.scaleX = -1;
			addChild(el_YLog10Ticks);
			
			el_YLabels = new YLabels(["2", "3", "4"], el_YLog10Ticks, 115, TextFormatAlign.RIGHT);
			el_YLabels.x = 110 - 7;
			el_YLabels.y = 55;
			addChild(el_YLabels);
			
			er_YLog10Ticks = new YLog10Ticks(34, 29500, 7, 115);
			er_YLog10Ticks.x = 110 + 350;
			er_YLog10Ticks.y = 55;
			addChild(er_YLog10Ticks);
			
			er_YLabels = new YLabels(["2", "3", "4"], er_YLog10Ticks, 115, TextFormatAlign.LEFT);
			er_YLabels.x = 110 + 7 + 350;
			er_YLabels.y = 55;
			addChild(er_YLabels);

			// Ions
			iHeatmap = new Heatmap(350, 115, new Colormap(min_energy_ion,max_energy_ion), 19);
			iHeatmap.x = 110;
			iHeatmap.y = 190;
			addChild(iHeatmap);

			il_YLog10Ticks = new YLog10Ticks(34, 29500, 7, 115);
			il_YLog10Ticks.x = 110;
			il_YLog10Ticks.y = 190;
			il_YLog10Ticks.scaleX = -1;
			addChild(il_YLog10Ticks);
			
			il_YLabels = new YLabels(["2", "3", "4"], il_YLog10Ticks, 115, TextFormatAlign.RIGHT);
			il_YLabels.x = 110 - 7;
			il_YLabels.y = 190;
			addChild(il_YLabels);
			
			ir_YLog10Ticks = new YLog10Ticks(34, 29500, 7, 115);
			ir_YLog10Ticks.x = 110 + 350;
			ir_YLog10Ticks.y = 190;
			addChild(ir_YLog10Ticks);
			
			ir_YLabels = new YLabels(["2", "3", "4"], ir_YLog10Ticks, 115, TextFormatAlign.LEFT);
			ir_YLabels.x = 110 + 7 + 350;
			ir_YLabels.y = 190;
			addChild(ir_YLabels);
			

			// X labels
			ut_XLabels = new XLabels(["0","0","0","0","0","0"],XLabels.DATE,350);
			ut_XLabels.x = 110;
			ut_XLabels.y = 311.65;
			addChild(ut_XLabels);
			
			lat_XLabels = new XLabels(["0","0","0","0","0","0"],XLabels.DATE,350);
			lat_XLabels.x = 110;
			lat_XLabels.y = 325.15;
			addChild(lat_XLabels);

			lon_XLabels = new XLabels(["0","0","0","0","0","0"],XLabels.DATE,350);
			lon_XLabels.x = 110;
			lon_XLabels.y = 338.65;
			addChild(lon_XLabels);

			mlat_XLabels = new XLabels(["0","0","0","0","0","0"],XLabels.DATE,350);
			mlat_XLabels.x = 110;
			mlat_XLabels.y = 352.15;
			addChild(mlat_XLabels);
			
			mlt_XLabels = new XLabels(["0","0","0","0","0","0"],XLabels.DATE,350);
			mlt_XLabels.x = 110;
			mlt_XLabels.y = 365.65;
			addChild(mlt_XLabels);

			// Colorbar
			var cmWidth:Number = 20;
			var cmHeight:Number = 185;
			var cmX:Number = 552;
			var cmY:Number = 112;
			
			var cm:Colormap = new Colormap(2,7);
			colorbar = new Colorbar(cmWidth, cmHeight);
			colorbar.x = cmX;
			colorbar.y = cmY;
			addChild(colorbar);
			
			cl_YLog10Ticks = new YLog10Ticks(Math.pow(10,5), Math.pow(10,10), 7, cmHeight);
			cl_YLog10Ticks.x = cmX;
			cl_YLog10Ticks.y = cmY;
			cl_YLog10Ticks.scaleX = -1;
			addChild(cl_YLog10Ticks);
			
			cl_YLabels = new YLabels(["5", "6", "7", "8", "9", "10"], cl_YLog10Ticks, cmHeight, TextFormatAlign.RIGHT);
			cl_YLabels.x = cmX - 7;
			cl_YLabels.y = cmY;
			addChild(cl_YLabels);
			
			cr_YLog10Ticks = new YLog10Ticks(Math.pow(10,3), Math.pow(10,8), 7, cmHeight);
			cr_YLog10Ticks.x = cmX + cmWidth;
			cr_YLog10Ticks.y = cmY;
			addChild(cr_YLog10Ticks);
			
			cr_YLabels = new YLabels(["3", "4", "5", "6", "7", "8"], cr_YLog10Ticks, cmHeight, TextFormatAlign.LEFT);
			cr_YLabels.x = cmX + 7 + cmWidth;
			cr_YLabels.y = cmY;
			addChild(cr_YLabels);
			
			// Reset components
			reset();
			
			// Data loader
			dataLoader = new DataLoader();
			dataLoader.addEventListener(Event.COMPLETE, loaderListener);

			// JS interaction
/*				var dateFrom:Number = 1293840000*1000;//1280626260000;//'2010-07-01T01:31:00UTC';
				var dateTo:Number = 1293843600*1000;//1280627760000;//'2010-07-01T01:56:00UTC';
				setRequestStr('http://localhost:8080/proxy/TestProxy?');
				setTimeRange(dateFrom, dateTo);
*/			ExternalInterface.addCallback("setRequestStr", setRequestStr);
			ExternalInterface.addCallback("setTimeRangeFromJS", setTimeRange);
			ExternalInterface.addCallback("setTimeCenterFromJS", setTimeCenter);
			ExternalInterface.call('swfIsLoaded');
		}
		
		public function setRequestStr(str:String):void {
			dataLoader.requestStr = str;
		}
		
		public function setTimeRange(dateFrom:Number, dateTo:Number):void {
			reset();
			dataLoader.loadData(dateFrom, dateTo);
		}
		
		public function setTimeCenter(dateCenter:Number, dateInterval:Number):void {
			setTimeRange(dateCenter - dateInterval, dateCenter + dateInterval);
		}
		
		private function reset():void {
			ut_XLabels.labels = ["0","0","0","0","0","0"];
			lat_XLabels.labels = ["0","0","0","0","0","0"];
			lon_XLabels.labels = ["0","0","0","0","0","0"];
			mlat_XLabels.labels = ["0","0","0","0","0","0"];
			mlt_XLabels.labels = ["0","0","0","0","0","0"];
			eHeatmap.reset();
			iHeatmap.reset();
		}
		
		private function loaderListener(e:Event) {
			for(var i=0; i<19; i++) {
				var t:Array = dataLoader.e_data[i];
				if (t != undefined) {
					var eLine:Array = new Array(t.length);
					for (var j=0; j<eLine.length; j++) {
						if(t[j] >1) {
							eLine[j] = log10(t[j]);
						} else {
							eLine[j] = 0;
						}
					}
					eHeatmap.setDataLine(eLine, i);
				} else {
/*					eLine = new Array(700);
					for (var j=0; j<eLine.length; j++) {
						eLine[j] = (Math.random()*(max_energy_e - min_energy_e) + min_energy_e);
					}
					trace(eLine)
					eHeatmap.setDataLine(eLine, i);*/
				}
				
				t = dataLoader.ion_data[i];
				if (t != undefined) {
					var iLine:Array = new Array(t.length);
					for (var j=0; j<iLine.length; j++) {
						if(t[j] >1) {
							iLine[j] = log10(t[j]);
						} else {
							iLine[j] = 0;
						}
					}
					iHeatmap.setDataLine(iLine, i);
				}
			}
			if (dataLoader.times) {
				var times:Array = dataLoader.times; // in milliseconds! see DataLoader.times
				var timesTicks:Array = XLabels.getTicks(times);
				
				var deltat:Number = times[times.length-1]-times[0];
				for (var i=0;i<timesTicks.length;i++) {
					var date:Date = new Date();
					date.setTime(timesTicks[i]);
					
					if (deltat < 10*60000) {
						// delta < 10min
						// format = "%M:%S";
						timesTicks[i] = date.minutesUTC + ":" + date.secondsUTC;
					}
					if (10*60000 < deltat && deltat <= 10*3600000) {
						// 10min < deltat <= 10h
						// format = "%H:%M";
						timesTicks[i] = date.hoursUTC + ":" + date.minutesUTC;
					}
					if (10*3600000 < deltat) {
						// 10h < deltat
						// format = "%d %Hh";
						timesTicks[i] = date.dayUTC + " " + date.hoursUTC;
					}
				}
				
				ut_XLabels.labels = timesTicks;
			}
			if (dataLoader.lats) {
				var ticks:Array = XLabels.getTicks(dataLoader.lats);
				for (var i=0;i<timesTicks.length;i++) {
					ticks[i] = numberFormat(ticks[i],1,false,false);
				}
				lat_XLabels.labels = ticks;
			}
			if (dataLoader.lons) {
				var ticks:Array = XLabels.getTicks(dataLoader.lons);
				for (var i=0;i<timesTicks.length;i++) {
					ticks[i] = numberFormat(ticks[i],1,false,false);
				}
				lon_XLabels.labels = ticks;
			}
			if (dataLoader.mlats) {
				var ticks:Array = XLabels.getTicks(dataLoader.mlats);
				for (var i=0;i<timesTicks.length;i++) {
					ticks[i] = numberFormat(ticks[i],1,false,false);
				}
				mlat_XLabels.labels = ticks;
			}
			if (dataLoader.mlts) {
				var ticks:Array = XLabels.getTicks(dataLoader.mlts);
				for (var i=0;i<timesTicks.length;i++) {
					ticks[i] = numberFormat(ticks[i],1,false,false);
				}
				mlt_XLabels.labels = ticks;
			}
			
		}
		private function numberFormat(number:*, maxDecimals:int = 2, forceDecimals:Boolean = false, siStyle:Boolean = true):String {
			var i:int = 0;
			var inc:Number = Math.pow(10, maxDecimals);
			var str:String = String(Math.round(inc * Number(number))/inc);
			var hasSep:Boolean = str.indexOf(".") == -1, sep:int = hasSep ? str.length : str.indexOf(".");
			var ret:String = (hasSep && !forceDecimals ? "" : (siStyle ? "," : ".")) + str.substr(sep+1);
			if (forceDecimals) {
				for (var j:int = 0; j <= maxDecimals - (str.length - (hasSep ? sep-1 : sep)); j++) ret += "0";
			}
			while (i + 3 < (str.substr(0, 1) == "-" ? sep-1 : sep)) ret = (siStyle ? "." : ",") + str.substr(sep - (i += 3), 3) + ret;
			return str.substr(0, sep - i) + ret;
		}
	}
	
}
