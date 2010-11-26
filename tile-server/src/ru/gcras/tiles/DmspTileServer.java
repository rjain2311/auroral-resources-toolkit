package ru.gcras.tiles;

import java.awt.Color;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.util.StringTokenizer;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ru.gcras.grids.Interpolation;

import ucar.nc2.Variable;
import ucar.nc2.dataset.NetcdfDataset;

public class DmspTileServer extends HttpServlet {

	//private static final String filename = "13736-19870129024814-19870129034932.FTS";
	//private static final String dods = "http://poseidon.wdcb.ru:8080/thredds/dodsC/images/";
	//private static final String images = "E:\\png\\";
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		try {
			res.setContentType("image/png");
			
			OutputStream os = res.getOutputStream();
			
			String s = req.getPathInfo();
			StringTokenizer st = new StringTokenizer(s,"/");
			String layer = st.nextToken();
			String hemisphere = st.nextToken();
			int hem = 0;
			if ("north".equals(hemisphere)) hem = 1;
			else if ("south".equals(hemisphere)) hem = -1;
			else throw new ServletException("Invalid hemisphere info");
			double alpha = Double.parseDouble(st.nextToken());
			int z = Integer.parseInt(st.nextToken());
			int x = Integer.parseInt(st.nextToken());
			int y = Integer.parseInt(st.nextToken());			
			
			BufferedImage image = GetTileImage(layer,hem,alpha,x,y,z);
			ImageIO.write(image, "png", os);
		}
		catch (Exception e) {
			throw new ServletException(e);
		}		
	}
	
	private BufferedImage GetTileImage(String layer, int hemisphere, double alpha, int x, int y, int z) throws Exception {
		
		int stride = 5;
		
		String threddsURL = getInitParameter("threddsBaseURL");
		String imageURL = getInitParameter("imageBaseURL");
		
		BufferedImage png = null;
	    String ym = layer.substring(3, 9);
	    png = ImageIO.read(new URL(imageURL+ym+"/"+layer+".ols.vis.png"));

		String[] parts = layer.split("\\.");
		int segment = Integer.parseInt(parts[1]);
		String olsFileName = parts[0];
		
		BufferedImage image = new BufferedImage(256,256,BufferedImage.TYPE_INT_ARGB);
		NetcdfDataset dataset = NetcdfDataset.openDataset(threddsURL + olsFileName+".OIS");
		int numScans = dataset.findDimension("numScans").getLength();
		int[] origin = new int[] { (segment-1) * numScans / 8 };
		int[] shape = new int[] { numScans / 8 };
		
		Variable latVar = dataset.findVariable("satEphemLatitude");
		float[] lat = (float[])latVar.read(origin,shape).copyTo1DJavaArray();
		Variable lonVar = dataset.findVariable("satEphemLongitude");
		float[] lon = (float[])lonVar.read(origin,shape).copyTo1DJavaArray();
		Variable altVar = dataset.findVariable("satEphemAltitude");
		float[] alt = (float[])altVar.read(origin,shape).copyTo1DJavaArray();
		Variable headVar = dataset.findVariable("satEphemHeading");
		float[] head = (float[])headVar.read(origin,shape).copyTo1DJavaArray();
		Variable scannerOffsVar = dataset.findVariable("scannerOffset");
		float[] scannerOffs = (float[])scannerOffsVar.read(origin,shape).copyTo1DJavaArray();
		int[][] pixels = new int[256][256];
		for (int i=0; i<lat.length; i+=stride) {
			
			int imageY = (int)((double)i/lat.length * png.getHeight());
			if (imageY >= png.getHeight()) imageY = png.getHeight()-1;
			double geoLat = lat[i];
			double geoLon = lon[i];
			if (geoLat < 0) continue;
			double pixelLatLon[][] = GeolocateOLS.Geolocate(geoLat, geoLon, alt[i], head[i], scannerOffs[i], false, false, stride);

		    int n = pixelLatLon.length;
		    //System.out.println("### "+n+" "+pixelLatLon[0][0]+" "+pixelLatLon[n-1][0]);
			for (int j=0; j<n; j++) {
				int imageX = (int)((double)j*stride / GeolocateOLS.NUM_SAMPLES * png.getWidth());
			    if (imageX >= png.getWidth()) imageX = png.getWidth()-1;
				int[] pixelXY = getPixelXY(x,y,z,alpha,pixelLatLon[j][0],pixelLatLon[j][1]);
				if ((pixelXY[1] <= 255) 
						&& (pixelXY[0] <= 255)
						&& (pixelXY[1] >= 0)
						&& (pixelXY[0] >= 0))
				{
					//image.setRGB(pixelXY[0],pixelXY[1],png.getRGB(imageX, imageY));
					if (segment < 3) {
						pixels[pixelXY[0]][pixelXY[1]] = png.getRGB(imageX, png.getHeight()-imageY-1);
					}
					else {
						pixels[pixelXY[0]][pixelXY[1]] = png.getRGB(png.getWidth()-imageX-1, imageY);
					}
				}
			}
		}
		
		interp(pixels);
		for (int i=0; i<256; i++) {
			for (int j=0; j<256; j++) {
				image.setRGB(i,j,pixels[i][j]);
			}
		}

		
		return image;
	}
	
	private void interp(int[][] pixels) {
		// interpolation
		

		
		int x1 = -1, x2;
		for (int row=0; row<256; row++) {
			int i=0;
			while (i<256) {
				if (pixels[i][row]!=0) {
					if (x1 == -1) {
						x1 = i;

					} else {
						x2=i;
						for (int x=(x2-1);x>x1;x--) {
							pixels[x][row] = Interpolation.LinearRgb(x1, x2, x, pixels[x1][row], pixels[x2][row]);
						}
						x1=x2;
					}
				}
				i++;
			}
		}
		
		int y1 = -1, y2;
		for (int col=0; col<256; col++) {
			int j=0;
			while (j<256) {
				if (pixels[col][j]!=0) {
					if (y1 == -1) {
						y1 = j;
					}
					else {
						y2=j;
						for (int y=(y2-1);y>y1;y--) {
							pixels[col][y] = Interpolation.LinearRgb(y1, y2, y, pixels[col][y1], pixels[col][y2]);
						}
						y1=y2;
					}
				}
				j++;
			}
		}

	}
	private int[] getPixelXY(int x, int y, int z, double alpha, double lat, double lon) {
		
		int[] pixelXY = new int[2];
		double[] magLatLon = new double[2];
		PolarTransform.GeoToMag(7.3, -114.4, lat, lon, magLatLon);
		double[] xy = PolarTransform.PolarToXY(magLatLon[0], magLatLon[1], alpha);
		double[] rect = new double[4];
		PolarTransform.XYZToXYRect(x, y, z, rect);
		
		//if (i ==  (lat.length-1)) System.out.println(geoLat+" "+ geoLon+"  "+magLatLon[0] + " " +magLatLon[1]+ " "+xy[0]+" "+xy[1]);
					
		double wx = xy[0];
		double wy = xy[1];
		double x1 = rect[0];
		double x2 = rect[1];
		double y1 = rect[2];
		double y2 = rect[3];
		pixelXY[1] = (int)Math.round((y2-wy)/(y2-y1)*255);
		pixelXY[0] = (int)Math.round((wx-x1)/(x2-x1)*255);
		return pixelXY;
	}
}
