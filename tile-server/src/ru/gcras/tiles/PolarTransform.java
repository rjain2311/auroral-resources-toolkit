package ru.gcras.tiles;

import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

// All longitudes are -180 ... +180
public class PolarTransform {
	
	//For 2005 dLat = 7.3, dLon = -114.4.
	
	public static void GeoToMag(double dLat, double dLon, double geoLat, double geoLon, double[] magLatLon) {
		double dLatR = Math.toRadians(dLat);
	 	double colatGeo = Math.toRadians(90 - geoLat);
	 	double lonGeo = Math.toRadians(geoLon);
	 	double theta = Math.toRadians(geoLon - dLon);
	 	
	 	double colatMag = Math.acos(
	 			Math.cos(dLatR)*Math.cos(colatGeo)+
	 			Math.sin(dLatR)*Math.sin(colatGeo)*
	 			Math.cos(theta)
	 		);
	 	
	 	double lonMag = Math.acos(
	 			(Math.cos(dLatR)*Math.cos(colatMag)-Math.cos(colatGeo)) /
	 			(Math.sin(dLatR)*Math.sin(colatMag))
	 		);
	 	
	 	if (!(lonGeo>=Math.toRadians(dLon) && lonGeo<=Math.toRadians(180+dLon))) {
	 		lonMag = -lonMag;
	 	}
	 	
	 	magLatLon[0] = Math.toDegrees(Math.PI/2 - colatMag);
	 	magLatLon[1] = Math.toDegrees(lonMag);
	}
	
	public static void MagToGeo(double dLat, double dLon, double magLat, double magLon, double[] geoLatLon) {
		double dLatR = Math.toRadians(dLat);
		
		double lonMag = Math.toRadians(magLon);
		double colatMag = Math.toRadians(90 - magLat);
		
		double colatGeo = Math.acos(
				Math.cos(dLatR) * Math.cos(colatMag) +
				Math.sin(dLatR) * Math.sin(colatMag) * 
				Math.cos(Math.PI - Math.abs(lonMag))
			);
		
		double theta = Math.acos(
				(Math.cos(colatMag) - Math.cos(dLatR) * Math.cos(colatGeo)) /
				(Math.sin(dLatR) * Math.sin(colatGeo))
			);
		
		if (lonMag < 0) theta = -theta;
		
		double lonGeo = Math.toRadians(dLon) + theta;
		
		double newLat = Math.toDegrees(Math.PI/2 - colatGeo);
		double newLon = Math.toDegrees(lonGeo);
		
		if (newLon < -180) newLon = 360 + newLon;
		
		geoLatLon[0] = newLat;
		geoLatLon[1] = newLon;
		
	}
	
	
	//         1| y
	//          |
	//          |
	//          |        x
	// ---------|---------
	//  -1     0|        1
	//          |
	//          |
	//        -1|
	public static double XYToPolarLat(double x, double y) {
		double r = Math.sqrt(x*x+y*y);
		double lat = -90 + Math.toDegrees(2*Math.atan2(1,r));
		return lat;
	}
	
	
	public static double[] PolarToXY(double lat, double lon, double alpha0) {
		double[] xy = new double[2];
		double lat2 = Math.toRadians(lat+90);
		double r = Math.sin(lat2)/(1-Math.cos(lat2));
		double lon2 = Math.toRadians(lon - (alpha0 + 90));
		double x = r*Math.cos(lon2);
		double y = r*Math.sin(lon2);
		xy[0] = x;
		xy[1] = y;
		return xy;
	}
	
	//          |
	//          |
	//          |
	//   -------|--------
	//          |
	//          |  
	//          |alpha0
	public static double XYToPolarLon(double alpha0, double x, double y) {
		double lon = Math.toDegrees(Math.atan2(y, x)) + (alpha0 + 90);
		
		if (lon > 180) lon = lon - 360;
		else if (lon < -180) lon = lon + 360;
		
		return lon;
	}
	
	public static double SubsolarLat(double dayofyear) {
		return -23.45*Math.cos(2*Math.PI/365*(dayofyear+10));
	}
	
	public static double SubsolarLon(double hourofday) {
		return (12-hourofday)/24*360;
	}

	public static void CoordsForImageMag(double dLat, double dLon, double alpha0, double x1, double x2, double y1, double y2, int nx, int ny, double[][][] coords, double[] minMax) {
		minMax[0] = 1E+10; // lat min
		minMax[1] = -1E+10; // lat max
		minMax[2] = 1E+10; // lon min
		minMax[3] = -1E+10; // lon max
		
		double dx = (x2-x1)/nx;
		double dy = (y2-y1)/ny;
		
		//Image origin - upper left corner
		for (int j=0; j<ny; j++) {
			double y = y2-j*dy;
			for (int i=0; i<nx; i++) {
				double x = x1+i*dx;
				
				double lat = XYToPolarLat(x,y);
				double lon = XYToPolarLon(alpha0,x,y);
				
				coords[i][j][0] = lat;
				coords[i][j][1] = lon;
				
				MagToGeo(dLat, dLon, lat, lon, coords[i][j]);
				
				if (coords[i][j][0] < minMax[0]) minMax[0] = coords[i][j][0];
				else if (coords[i][j][0] > minMax[1]) minMax[1] = coords[i][j][0];
				
				if (coords[i][j][1] < minMax[2]) minMax[2] = coords[i][j][1];
				else if (coords[i][j][1] > minMax[3]) minMax[3] = coords[i][j][1];
			}
		}
	}
	
	public static void CoordsForImageGeo(double alpha0, double x1, double x2, double y1, double y2, int nx, int ny, double[][][] coords, double[] minMax) {
		
		minMax[0] = 1E+10; // lat min
		minMax[1] = -1E+10; // lat max
		minMax[2] = 1E+10; // lon min
		minMax[3] = -1E+10; // lon max
		
		double dx = (x2-x1)/nx;
		double dy = (y2-y1)/ny;
		
		//Image origin - upper left corner
		for (int j=0; j<ny; j++) {
			double y = y2-j*dy;
			for (int i=0; i<nx; i++) {
				double x = x1+i*dx;
				
				double lat = XYToPolarLat(x,y);
				double lon = XYToPolarLon(alpha0,x,y);
				
				coords[i][j][0] = lat;
				coords[i][j][1] = lon;
				
				if (lat < minMax[0]) minMax[0] = lat;
				else if (lat > minMax[1]) minMax[1] = lat;
				
				if (lon < minMax[2]) minMax[2] = lon;
				else if (lon > minMax[3]) minMax[3] = lon;
			}
		}
	}

	
	//            x2,y2
	//    -------------
	//    |           |
	//    |           | 
	//    |           |
	//    -------------
	//    x1,y1
	public static void XYZToXYRect(int x, int y, int z, double[] rect) {
		int n = (int)Math.round(Math.pow(2, z));
		double d = 2.0/n;
		
		double x1, x2, y1, y2;
		
		x1 = -1 + d * x;
		x2 = x1 + d;
		
		y2 = 1 - d * y;
		y1 = y2 - d;
		
		rect[0] = x1;
		rect[1] = x2;
		rect[2] = y1;
		rect[3] = y2; 
	}
	

	public static void main(String[] args) {
		Calendar cal = Calendar.getInstance(Locale.US);
		cal.setTimeZone(TimeZone.getTimeZone("UTC"));
		cal.set(2010, Calendar.APRIL, 11, 23, 50, 0);
		int dayofyear = cal.get(Calendar.DAY_OF_YEAR);
		double lat = SubsolarLat(dayofyear);
		double lon = SubsolarLon(23.83);
		
		double[] magLatLon = new double[2];
		GeoToMag(7.3, -114.4, lat, lon, magLatLon);
		
		System.out.println(lat+", "+lon);
		System.out.println(magLatLon[0]+", "+magLatLon[1]);
		
		System.out.println(magLatLon[1]+180);
	}
}
