package  loader {
	import flash.events.Event;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.events.EventDispatcher;
	
	import com.adobe.serialization.json.JSON;
	
	public class DataLoader extends EventDispatcher {
		public var requestStr:String = ''; //'http://localhost:8080/proxy/TestProxy?'
		private var loaders:Array;

		public function DataLoader() {
			loaders = new Array(2*19+4);
			
			for(var i=0;i<loaders.length;i++) {
				loaders[i] = new URLLoader();
				loaders[i].addEventListener(Event.COMPLETE, loaderListener);
			}
		}

		public function loadData(dateFrom:Number, dateTo:Number) {
			var date:Date = new Date();
			
			date.setTime(dateFrom);
			var _dateFrom:String = 	date.fullYearUTC + '-' +
									(date.monthUTC+1) + '-' +
									date.dateUTC + 'T' +
									date.hoursUTC + ':' +
									date.minutesUTC + ':' +
									date.secondsUTC + 'UTC';
			
			date.setTime(dateTo);
			var _dateTo:String = 	date.fullYearUTC + '-' +
									(date.monthUTC+1) + '-' +
									date.dateUTC + 'T' +
									date.hoursUTC + ':' +
									date.minutesUTC + ':' +
									date.secondsUTC + 'UTC';
			reset();
			trace(_dateFrom, _dateTo)
			
			var count:int = 0;
			var url:String = "";
			
			for(var i=1;i<=19;i++) {
				url = requestStr + 'format=json&callbackID=10&location=ALL&datefrom='+ _dateFrom +'&dateto='+ _dateTo +'&dataset=DIFF_ENERGY_FLUX_ELECTRONS.ElectronChannel.'+ i +'@SSJ';
				loaders[count].load(new URLRequest(url));
				count += 1;
				
				url = requestStr + 'format=json&callbackID=10&location=ALL&datefrom='+ _dateFrom +'&dateto='+ _dateTo +'&dataset=DIFF_ENERGY_FLUX_IONS.ElectronChannel.'+ i +'@SSJ';
				loaders[count].load(new URLRequest(url));
				count += 1;
			}
			
			url = requestStr + 'format=json&callbackID=10&location=ALL&datefrom='+ _dateFrom +'&dateto='+ _dateTo +'&dataset=LATITUDE.Time@SSJ';
			loaders[count].load(new URLRequest(url));
			count += 1;
			
			url = requestStr + 'format=json&callbackID=10&location=ALL&datefrom='+ _dateFrom +'&dateto='+ _dateTo +'&dataset=LONGITUDE.Time@SSJ';
			loaders[count].load(new URLRequest(url));
			count += 1;
			
			url = requestStr + 'format=json&callbackID=10&location=ALL&datefrom='+ _dateFrom +'&dateto='+ _dateTo +'&dataset=CGMLAT_110.Time@SSJ';
			loaders[count].load(new URLRequest(url));
			count += 1;
			
			url = requestStr + 'format=json&callbackID=10&location=ALL&datefrom='+ _dateFrom +'&dateto='+ _dateTo +'&dataset=CGMLTIME_110.Time@SSJ';
			loaders[count].load(new URLRequest(url));
			count += 1;
		}
		
		private function reset():void {
			for (var i=0; i<loaders.length; i++) {
				try {
					loaders[i].close();
				} catch (error:Error) {
				}
			}
			
			num_responses = 0;
			e_data = new Array(num_channels);
			ion_data = new Array(num_channels);
			lats = null;
			lons = null;
			times = null;
			mlats = null;
			mlts = null;
		}
		
		private var num_responses:int = 0;
		private var num_channels:int = 19;
		
		public var e_data:Array;
		public var ion_data:Array;
		public var lats:Array;
		public var lons:Array;
		public var times:Array;
		public var mlats:Array;
		public var mlts:Array;
	
		private function loaderListener(e:Event) {
//			var data:XML = new XML((e.target as URLLoader).data);
			var data:Object = JSON.decode((e.target as URLLoader).data);
			
			switch(data.variables[4].name.substr(0,11))
				{
				case "DIFF_ENERGY":
					if (data.variables[4].name.substr(0,18) == 'DIFF_ENERGY_FLUX_E') {
						var no_channel = parseInt(data.variables[4].name.substr(43)); //DIFF_ENERGY_FLUX_ELECTRONS_ElectronChannel_18
						e_data[no_channel-1] = data.variables[4].values;
					} else {
						var no_channel = parseInt(data.variables[4].name.substr(38)); //DIFF_ENERGY_FLUX_IONS_ElectronChannel_16
						ion_data[no_channel-1] = data.variables[4].values;
					}
					break;
				case "LATITUDE_Ti":
					lats = data.variables[4].values;
					break;
				case "LONGITUDE_T":
					lons = data.variables[4].values;
					break;
				case "CGMLAT_110_":
					mlats = data.variables[4].values;
					break;
				case "CGMLTIME_11":
					mlts = data.variables[4].values;
					break;
				default:
			}
				
			if (num_responses == 0) {
				times = data.variables[0].values;
				for (var i=0; i<times.length; i++) {
					times[i] = times[i]*86400000;
				}
			}
			
//			var t:URLLoader = e.target as URLLoader;
//			t.removeEventListener(Event.COMPLETE, loaderListener);
//			t = null;
			
			dispatchEvent(new Event(Event.COMPLETE));
		}
	}
	
}
