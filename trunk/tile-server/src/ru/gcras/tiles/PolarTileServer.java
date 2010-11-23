package ru.gcras.tiles;

import ru.gcras.grids.*;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.StringTokenizer;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
import ru.wdcb.activestorage.DataType;
import ru.wdcb.activestorage.Database;
import ru.wdcb.activestorage.Group;
import ru.wdcb.activestorage.Variable;
*/
import ucar.ma2.Array;
import ucar.nc2.NetcdfFile;

public class PolarTileServer extends HttpServlet {
	
	//static final String connectionString = "jdbc:sqlserver://poseidon.wdcb.ru;database=ActiveStorage;user=sa;password=nimda!mssql";
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		try {
			res.setContentType("image/jpg");
			
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
			
			BufferedImage image = GetTileImage2(layer,hem,alpha,x,y,z);
			ImageIO.write(image, "jpg", os);
		}
		catch (Exception e) {
			throw new ServletException(e);
		}
	}

	private RgbDataGrid GetGridFromLatLon2(String layer, int z, double lat1, double lat2, double lon1, double lon2) throws Exception {
        String path = getInitParameter("NetcdfPath");
        
        NetcdfFile f = NetcdfFile.open(path+"level"+z+".nc");
        
        ucar.nc2.Variable data = f.findVariable("data");

        int[] shape = data.getShape();

        ucar.nc2.Attribute geo = data.findAttribute("geo");


        double originLon = geo.getNumericValue(0).doubleValue();
        double lonStride = geo.getNumericValue(1).doubleValue();
        double originLat = geo.getNumericValue(2).doubleValue();
        double latStride = geo.getNumericValue(3).doubleValue();

        int iLon1 = (int)((lon1 - originLon) / lonStride);
        int iLon2 = (int)((lon2 - originLon) / lonStride) + 1;
        if (iLon1 < 0) iLon1 = 0;
        if (iLon2 >= shape[1] - 1) iLon2 = shape[1] - 1;

        int iLat1 = (int)((lat2 - originLat) / latStride);
        int iLat2 = (int)((lat1 - originLat) / latStride) + 1;
        if (iLat1 < 0) iLat1 = 0;
        if (iLat2 < 0) iLat2 = 0;
        if (iLat1 >= shape[0] - 1) iLat1 = shape[0] - 1;
        if (iLat2 >= shape[0] - 1) iLat2 = shape[0] - 1;

        int[] origin = new int[] { iLat1, iLon1 };
        int[] size = new int[] { iLat2 - iLat1 + 1, iLon2 - iLon1 + 1 };

        Double[] lats = new Double[size[0]];
        for (int i = 0; i < lats.length; i++)
        {
            lats[lats.length - i - 1] = originLat + (iLat1 + i) * latStride;
        }

        Double[] lons = new Double[size[1]];
        for (int i = 0; i < lons.length; i++)
        {
            lons[i] = originLon + (iLon1 + i) * lonStride;
        }

        Array a = data.read(origin, size);
        int[] buffer = (int[])a.copyTo1DJavaArray();
        f.close();
        
        RgbDataGrid dataGrid = new RgbDataGrid(lons, lats);
        for (int i=0; i<buffer.length; i++) {
        	dataGrid.Data.add(buffer[i]);
        }
        
        dataGrid.ReverseY = true;
        
        return dataGrid;
	}
	
	/*
	private RgbDataGrid GetGridFromLatLon(String layer, int z, double lat1, double lat2, double lon1, double lon2) throws Exception {
        Database db = new Database(connectionString);
        
        Group root = db.getGroup(layer);
        Group group = root.getSubgroup("level" + z);

        if (group == null) group = GetLastLevel(root);
        Variable data = group.getVariable("data");
        int[] shape = data.getShape();

        ru.wdcb.activestorage.Attribute geo = group.getAttribute("geo");
        double[] geoValues = (double[])geo.getValues();

        double originLon = geoValues[0];
        double lonStride = geoValues[1];
        double originLat = geoValues[2];
        double latStride = geoValues[3];

        int iLon1 = (int)((lon1 - originLon) / lonStride);
        int iLon2 = (int)((lon2 - originLon) / lonStride) + 1;
        if (iLon1 < 0) iLon1 = 0;
        if (iLon2 >= shape[1] - 1) iLon2 = shape[1] - 1;

        int iLat1 = (int)((lat2 - originLat) / latStride);
        int iLat2 = (int)((lat1 - originLat) / latStride) + 1;
        if (iLat1 < 0) iLat1 = 0;
        if (iLat2 < 0) iLat2 = 0;
        if (iLat1 >= shape[0] - 1) iLat1 = shape[0] - 1;
        if (iLat2 >= shape[0] - 1) iLat2 = shape[0] - 1;

        int[] origin = new int[] { iLat1, iLon1 };
        int[] size = new int[] { iLat2 - iLat1 + 1, iLon2 - iLon1 + 1 };

        Double[] lats = new Double[size[0]];
        for (int i = 0; i < lats.length; i++)
        {
            lats[lats.length - i - 1] = originLat + (iLat1 + i) * latStride;
        }

        Double[] lons = new Double[size[1]];
        for (int i = 0; i < lons.length; i++)
        {
            lons[i] = originLon + (iLon1 + i) * lonStride;
        }

        
        int[] buffer = (int[])data.getData(origin, size);
        db.close();
        
        RgbDataGrid dataGrid = new RgbDataGrid(lons, lats);
        for (int i=0; i<buffer.length; i++) {
        	dataGrid.Data.add(buffer[i]);
        }
        
        dataGrid.ReverseY = true;
        
        return dataGrid;
	}
	*/
	
	private BufferedImage GetTileImage2(String layer, int hemisphere, double alpha, int x, int y, int z) throws Exception {
		
        double minLat;
        double maxLat;
        double minLon;
        double maxLon;
        
		double[] bounds = new double[4];
		PolarTransform.XYZToXYRect(x, y, z, bounds);
        double[] minmax = new double[4];
        double[][][] points = new double[256][256][2];
        PolarTransform.CoordsForImageMag(7.3, -114.4, alpha, bounds[0], bounds[1], bounds[2], bounds[3], 256, 256, points, minmax);
        BufferedImage image = new BufferedImage(256,256,BufferedImage.TYPE_INT_RGB);
        
        RgbDataGrid dataGrid = null;
        minLat = minmax[0];
        maxLat = minmax[1];
        minLon = minmax[2];
        maxLon = minmax[3];
        
        System.out.println(minLat+" "+maxLat+" "+minLon+" "+maxLon);
        
        if (maxLon - minLon > 180) {
        	RgbDataGrid dataGrid1 = GetGridFromLatLon2(layer,z,minLat,maxLat,minLon,180);
        	RgbDataGrid dataGrid2 = GetGridFromLatLon2(layer,z,minLat,maxLat,-180,maxLon);
        	
        	//Merge grids
        	//...
        	
        	Double[] X = new Double[dataGrid1.X.length + dataGrid2.X.length];
        	Double[] Y =  dataGrid1.Y;
        	
        	int index = 0;
        	for (int i=0; i<dataGrid1.X.length; i++) {
        		X[index] = dataGrid1.X[i];
        		index++;
        	}
        	for (int i=0; i<dataGrid2.X.length; i++) {
        		X[index] = 360 + dataGrid2.X[i];
        		index++;
        	}
        	      
        	int index1 = 0;
        	int index2 = 0;
        	dataGrid = new RgbDataGrid(X,Y);
        	for (int j=0; j<Y.length; j++) {
        		
        		for (int i=0; i<dataGrid1.X.length; i++) {
        			dataGrid.Data.add(dataGrid1.Data.get(index1));
        			index1++;
        		}

        		for (int i=0; i<dataGrid2.X.length; i++) {
        			dataGrid.Data.add(dataGrid2.Data.get(index2));
        			index2++;
        		}
        	}
        	dataGrid.ReverseY = true;   
            for (int j=0; j<256; j++) {
            	for (int i=0; i<256; i++) {		
            		double lat = points[i][j][0];
            		double lon = points[i][j][1];
            		if (lon<0) lon = 360+lon;
            		
            		image.setRGB(i,j,dataGrid.GetInterpolated(lon,lat)); 
            	}
            }
        	     	
        }
        else {
        	dataGrid = GetGridFromLatLon2(layer,z,minLat,maxLat,minLon,maxLon);
            for (int j=0; j<256; j++) {
            	for (int i=0; i<256; i++) {		
            		double lat = points[i][j][0];
            		double lon = points[i][j][1];

            		image.setRGB(i,j,dataGrid.GetInterpolated(lon,lat)); 
            	}
            }
        }
        
        return image;
	}
	
	/*
	private BufferedImage GetTileImage(String layer, int hemisphere, double alpha, int x, int y, int z) throws Exception {
		double[] bounds = Transform.xyzToLatLon(hemisphere, alpha, x, y, z);
        double minLat = bounds[0];
        double maxLat = bounds[1];
        double minLon = bounds[2];
        double maxLon = bounds[3];
  
        Database db = new Database(connectionString);
        
        Group root = db.getGroup(layer);
        Group group = root.getSubgroup("level" + z);
        if (group == null) group = GetLastLevel(root);
        Variable data = group.getVariable("data");
        DataType dt = data.getDataType();

        int[] shape = data.getShape();

        ru.wdcb.activestorage.Attribute geo = group.getAttribute("geo");
        double[] geoValues = (double[])geo.getValues();

        double originLon = geoValues[0];
        double lonStride = geoValues[1];
        double originLat = geoValues[2];
        double latStride = geoValues[3];

        int iLon1 = (int)((minLon - originLon) / lonStride);
        int iLon2 = (int)((maxLon - originLon) / lonStride) + 1;
        if (iLon1 < 0) iLon1 = 0;
        if (iLon2 >= shape[1] - 1) iLon2 = shape[1] - 1;

        int iLat1 = (int)((maxLat - originLat) / latStride);
        int iLat2 = (int)((minLat - originLat) / latStride) + 1;
        if (iLat1 < 0) iLat1 = 0;
        if (iLat2 < 0) iLat2 = 0;
        if (iLat1 >= shape[0] - 1) iLat1 = shape[0] - 1;
        if (iLat2 >= shape[0] - 1) iLat2 = shape[0] - 1;

        int[] origin = new int[] { iLat1, iLon1 };
        int[] size = new int[] { iLat2 - iLat1 + 1, iLon2 - iLon1 + 1 };

        Double[] lats = new Double[size[0]];
        for (int i = 0; i < lats.length; i++)
        {
            lats[lats.length - i - 1] = originLat + (iLat1 + i) * latStride;
        }

        Double[] lons = new Double[size[1]];
        for (int i = 0; i < lons.length; i++)
        {
            lons[i] = originLon + (iLon1 + i) * lonStride;
        }

        
        int[] buffer = (int[])data.getData(origin, size);
        
        RgbDataGrid dataGrid = new RgbDataGrid(lons, lats);
        for (int i=0; i<buffer.length; i++) {
        	dataGrid.Data.add(buffer[i]);
        }
        dataGrid.ReverseY = true;
        
        double[] bounds2 = Transform.xyzToBounds(x, y, z);
        int quarter = Transform.xyzToQuarter(x, y, z);
        double[][][] points = Transform.GetPoints(hemisphere, alpha, bounds2[0], bounds2[1], bounds2[2], bounds2[3], 256, 256);
        
        BufferedImage image = new BufferedImage(256,256,BufferedImage.TYPE_INT_RGB);
        for (int j=0; j<256; j++) {
        	for (int i=0; i<256; i++) {
        		
        		image.setRGB(i,j,dataGrid.GetInterpolated(points[i][j][1],points[i][j][0])); 
        	}
        }
        return image;        
	}
	*/
	
	/*
    public Group GetLastLevel(Group root) throws Exception
    {
        List<Group> groups = root.listSubgroups();
        Group last = groups.get(0);
        for (int i=0; i<groups.size(); i++) 
        {
        	Group group = groups.get(i);
            if (last.getName().compareTo(group.getName()) < 0)
            {
                last = group;
            }
        }
        return last;
    }
    */
	
    public int GetLastLevel2() {
    	return 6;
    }
}

