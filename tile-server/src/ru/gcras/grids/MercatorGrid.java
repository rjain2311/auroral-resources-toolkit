package ru.gcras.grids;

public class MercatorGrid extends XYGrid
{
    private MercatorGrid(Double[] x, Double[] y)  
    { 
    	super(x,y);
    }

    public static MercatorGrid FromXYZ(int x, int y, int z)
    {
        Double[] lat = new Double[256];
        Double[] lon = new Double[256];

        int levelOfDetail;
        int tileX, tileY;
        int pixelX, pixelY;

        // This one is for NASA-like tile server only
        //y = (int)Math.round(Math.pow(2,z))-y-1;
        
        tileX = x;
        tileY = y;
        levelOfDetail = z;
        
        int[] result1 = TileSystem.TileXYToPixelXY(tileX, tileY);

        pixelX = result1[0];
        pixelY = result1[1];
        
        for (int i = 0; i < 256; i++)
        {
            int x1 = pixelX + i;
            int y1 = pixelY + i;

            double[] result2 = TileSystem.PixelXYToLatLong(x1, y1, levelOfDetail);
            lat[255-i] = result2[0];
            lon[i] = result2[1];
        }

        return new MercatorGrid(lon, lat);
    }
}

