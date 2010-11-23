package ru.gcras.tiles;

public class GeolocateOLS
{
    /// <summary>
    /// Degrees to radians
    /// </summary>
    private static final double DTOR = Math.PI / 180.0;

    /// <summary>
    /// Degrees from radians
    /// </summary>
    private static final double RADEG = 180.0 / Math.PI;

    /// <summary>
    /// conversions for parametric from geodetic latitude
    /// </summary>
    private static double Parametric(double phi)
    {
        return phi;   // the OLS scans geodetically
        //------------------------------------------------------------------------
        // if the OLS scanned geocentrically:
        // Ee2 = 0.006693855d0			; Earth eccentricity squared (GRS 80)
        // return atan((1-Ee2)*tan(phi))
        //------------------------------------------------------------------------
    }

     /// <summary>
    /// conversions for parametric to geodetic latitude
    /// </summary>
    private static double Geodetic(double phig)
    {
      return phig;	// the OLS scans geodetically
      //------------------------------------------------------------------------
      // if the OLS scanned geocentrically:
      // Ee2 = 0.006693855d0			; Earth eccentricity squared (GRS 80)
      // return, atan(tan(phig)/(1-Ee2))
      //------------------------------------------------------------------------
    }
    
    /// <summary>
    /// ellipsoid_radius_km - ellipsoidal radius for Earth at given latitude
    /// </summary>
    /// <param name="phig">parametric latitude (radians)</param>
    /// <returns>ellipsoidal radius (km) at specified latitude</returns>
    private static double EllipsoidRadiusKm(double phig)
    {
        //-----------------------------------------------------------------------------
        // Earth ellipsoid constants (figure of the Earth GRS 80)
        //-----------------------------------------------------------------------------
        double Ae_km = 6378.135;          // Earth semi-major axis (kilometers)
        double Be_km = 6356.752;          // Earth semi-minor axis (kilometers)
        //const double Re_km = 6367.435;          // Earth sphere radius (sqrt(a*b))

        double sin_phig = Math.sin(phig);
        double cos_phig = Math.cos(phig);

        double r2 = (Ae_km * Ae_km * Be_km * Be_km) / (Ae_km * Ae_km * sin_phig * sin_phig + Be_km * Be_km * cos_phig * cos_phig);

        return Math.sqrt(r2);
    }

    private static double[] OLSScanAngle(double scannerOffset, boolean fine, boolean thermal)
    {
        //-----------------------------------------------------------------------------
        // number of pixels is based on data type (OLS smooth or fine)
        //
        // Note: There's some ambiguity about whether fine has 7322 or 7324 pixels.
        //       The formula below, which comes from IS-YD-821C, really only makes
        //       senses for the first 7322 pixels. We'll do all 7324 pixels here, and
        //       leave it up to the user about the other 2 pixels.
        //-----------------------------------------------------------------------------
        //dmedv
        //int nPixels = (fine) ? 7324 : 1465;
        int nPixels = 4669;

        //-----------------------------------------------------------------------------
        // array containing pixel numbers
        // scans are flipped end for end by the time order correction code
        // sample = last_sample[datacode] - sample; (last_sample = 1464 smooth, 7323 fine)

        // CW Note: Not sure exactly the reason for this; the geolocation DOES seem
        //          to be reversed without it.
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------
        // constants from IS-YD-821B pp.14a,33
        //
        // Note: IS-YD-821C has values which are 1-2 digits less precise than these values
        //
        // Note: There's also another conditional that needs to be inserted here for
        //       the thermal constants based on OLS number. A few OLS's have slightly
        //       different calibration constants for the thermal sensor. Have asked Don
        //       Boucher for a mapping between OLS number and satellite; waiting.
        //       10/16/2002 CW
        //-----------------------------------------------------------------------------

        double M = 2.66874260;
        double K = 0.00098550;
        double B = (fine) ? 0.23663990 : ((thermal) ? 0.23590740 : 0.23685510);
        double thetaPeak = 1.0096730;
        //dmedv
        //double totalPixels = (fine) ? 7322.1790 : 1464.4360;
        double totalPixels = 4669;

        //-----------------------------------------------------------------------------
        // compute scan angles
        //-----------------------------------------------------------------------------
        double[] thetaRadians = new double[nPixels];
        for (int i = 0; i < nPixels; i++)
        {
            thetaRadians[i] = thetaPeak * Math.cos(M * ((nPixels - i - 1) / totalPixels) + B) - (K * scannerOffset);
        }

        return thetaRadians;
    }

    private static double[] Sin(double[] angles)
    {
        double[] d = new double[angles.length];
        for (int i = 0; i < d.length; i++)
        {
            d[i] = Math.sin(angles[i]);
        }

        return d;
    }

    /// <summary>
    /// The routine geolocates pixels of an OLS scan, given their nadir 
    /// locations.
    /// </summary>
    /// <remarks>
    /// This algorithm was originally written in C by Ken Knowles (NSDIC) in 1993 as 
    /// part of popview. These routines taken from ./popview/poplib/ols_geom.c
    /// 
    /// Converted to IDL in October 2002, Chris D. Wells, Operational Systems, Inc.
    /// Translated to C# in September 2006, Voitsekhovskiy D., CMC MSU.
    /// 
    /// Note:	This routine and its inverse use an ellipsoid model of the Earth and
    ///       are intended for accurate navigation and systematic rectification
    ///       of OLS imagery.
    /// </remarks>
    /// <param name="nadirSatLatitude">satellite nadir latitude (degrees)</param>
    /// <param name="nadirSatLongitude">satellite nadir longitude (degrees)</param>
    /// <param name="satAltitude">satellite altitude at nadir (km)</param>
    /// <param name="nadirSatHeading">satellite heading at nadir (west of north, degrees)</param>
    /// <param name="scannerOffset">OLS scanner offset (radians)</param>
    /// <param name="pixelLatitude">latitude at each pixel within scan (degrees)</param>
    /// <param name="pixelLongitude">longitude at each pixel within scan (degrees)</param>
    /// <param name="fineData">Set this keyword to compute lat/lon locations for input fine data.  
    /// Output will have 7324 columns.  
    /// If not set, the lat/lon locations computed are appropriate for 
    /// input smooth data (output of 1465 columns).</param>
    /// <param name="thermal">Set this keyword to compute lat/lon locations for input thermal data.</param>
    public static double[][] Geolocate(double nadirSatLatitude, double nadirSatLongitude, double satAltitude, double nadirSatHeading, double scannerOffset, boolean fineData, boolean thermal, int stride)
    {
        //-----------------------------------------------------------------------------
        // theta = scan angles for each pixel in OLS scans
        //
        // Note: theta is a 1-D array - [pixel]
        //-----------------------------------------------------------------------------
        double[] theta = OLSScanAngle(scannerOffset, fineData, thermal);
        double[] sin_theta = Sin(theta);
        int nPixels = theta.length;

        
        //-----------------------------------------------------------------------------
        // (phign, lamn, Rn_km) = parametric coordinates of subpoint
        // (phign, lamn, SC_km) = parametric coordinates of sensor
        //-----------------------------------------------------------------------------
        double phign = Parametric(nadirSatLatitude * DTOR);
        double lamn = nadirSatLongitude * DTOR;
        double Rn_km = EllipsoidRadiusKm(phign);
        double SC_km = satAltitude + Rn_km;

        double sin_phign = Math.sin(phign);
        double cos_phign = Math.cos(phign);

        //-----------------------------------------------------------------------------
        // construct output arrays
        //-----------------------------------------------------------------------------
        //pixelLatitude = new double[nPixels];
        //pixelLongitude = new double[nPixels];
        int nPixelsStride = nPixels/stride + 1;
        double[][] pixelLatLon = new double[nPixelsStride][2];
        //-----------------------------------------------------------------------------
        // A = sensor heading
        //-----------------------------------------------------------------------------
        double A = nadirSatHeading * DTOR;
        double sin_A = Math.sin(A);
        if(nadirSatHeading > 90) sin_A = -sin_A;

        int i = 0;
        for (int pixel = 0; pixel < nPixels; pixel+=stride)
        {
            //-----------------------------------------------------------------------------
            // W = Earth central angle from target to nadir
            // (use elevation of subpoint for 1st guess)
            //-----------------------------------------------------------------------------
            double W = Math.asin((SC_km / Rn_km) * sin_theta[pixel]) - theta[pixel];
            if (nadirSatHeading > 90) W = -W;
            double sin_W = Math.sin(W);
            double cos_W = Math.cos(W);

            //-----------------------------------------------------------------------------
            // phig = parametric latitude of target
            //-----------------------------------------------------------------------------
            double phig = Math.asin(sin_phign * cos_W + cos_phign * sin_W * sin_A);

            //-----------------------------------------------------------------------------
            // make a 2nd guess using the true elevation of the 1st guess
            //-----------------------------------------------------------------------------
            double R_km = EllipsoidRadiusKm(phig);
            W = Math.asin(SC_km / R_km * sin_theta[pixel]) - theta[pixel];
            if (nadirSatHeading > 90) W = -W;
            sin_W = Math.sin(W);
            cos_W = Math.cos(W);
            phig = Math.asin(sin_phign * cos_W + cos_phign * sin_W * sin_A);

            //-----------------------------------------------------------------------------
            // dlam = longitude of target minus longitude of subpoint
            //-----------------------------------------------------------------------------
            double cos_dlam = (cos_W - sin_phign * Math.sin(phig)) / (cos_phign * Math.cos(phig));

            if (cos_dlam > 1) cos_dlam = 1.0;

            double dlam = Math.acos(cos_dlam);
            if (W < 0) dlam = -dlam;

            double lam = lamn + dlam;

            //-----------------------------------------------------------------------------
            // convert back to geodetic coordinates (degrees)
            //-----------------------------------------------------------------------------
            /*
            pixelLatitude[pixel] = Geodetic(phig) * RADEG;
            pixelLongitude[pixel] = lam * RADEG;
            if (pixelLongitude[pixel] < -180.0)
                pixelLongitude[pixel] += 360.0;
            else if (pixelLongitude[pixel] > 180)
                pixelLongitude[pixel] -= 360.0;
            */
            pixelLatLon[i][0] = Geodetic(phig) * RADEG;
            pixelLatLon[i][1] = lam * RADEG;
            if (pixelLatLon[i][1] < -180.0)
                pixelLatLon[i][1] += 360.0;
            else if (pixelLatLon[i][1] > 180)
                pixelLatLon[i][1] -= 360.0;
            
            i++;
        }
        return pixelLatLon;
    }

    /// <summary>
    /// The routine geolocates pixels of an OLS scan, given their nadir 
    /// locations.
    /// </summary>
    /// <remarks>
    /// This algorithm was originally written in C by Ken Knowles (NSDIC) in 1993 as 
    /// part of popview. These routines taken from ./popview/poplib/ols_geom.c
    /// 
    /// Converted to IDL in October 2002, Chris D. Wells, Operational Systems, Inc.
    /// Translated to C# in September 2006, Voitsekhovskiy D., CMC MSU.
    /// 
    /// Note:	This routine and its inverse use an ellipsoid model of the Earth and
    ///       are intended for accurate navigation and systematic rectification
    ///       of OLS imagery.
    /// </remarks>
    /// <param name="nadirSatLatitude">satellite nadir latitude (degrees)</param>
    /// <param name="nadirSatLongitude">satellite nadir longitude (degrees)</param>
    /// <param name="satAltitude">satellite altitude at nadir (km)</param>
    /// <param name="nadirSatHeading">satellite heading at nadir (west of north, degrees)</param>
    /// <param name="scannerOffset">OLS scanner offset (radians)</param>
    /// <param name="pixelLatitude">latitude at each pixel within scan (degrees)</param>
    /// <param name="pixelLongitude">longitude at each pixel within scan (degrees)</param>
    /// <param name="fineData">Set this keyword to compute lat/lon locations for input fine data.  
    /// If not set, the lat/lon locations computed are appropriate for input smooth data.</param>
    /// <param name="thermal">Set this keyword to compute lat/lon locations for input thermal data.</param>
    /// <param name="pixelsNumber">Desirable number of pixels in output.</param>
    public static double[][] Geolocate(double nadirSatLatitude, double nadirSatLongitude, double satAltitude, double nadirSatHeading, double scannerOffset, int pixelsNumber, boolean fineData, boolean thermal)
    {
        double[][] pixelLatLon = Geolocate(nadirSatLatitude, nadirSatLongitude, satAltitude, nadirSatHeading, scannerOffset,
            fineData, thermal, 1);

        //double[] plat = new double[pixelsNumber];
        //double[] plon = new double[pixelsNumber];
        double[][] newLatLon = new double[pixelsNumber][2];
        
        double coeff = (double)(pixelsNumber - 1) / (pixelLatLon.length - 1);
        int i, i0 = -1;
        for (int j = 0; j < pixelLatLon.length; j++)
        {
            i = (int)Math.round(coeff * j);
            if (i != i0)
            {
                newLatLon[i][1] = pixelLatLon[j][1];
                newLatLon[i][0] = pixelLatLon[j][0];
                i0 = i;
            }
        }

        //pixelLatitude = plat;
        //pixelLongitude = plon;
        return newLatLon;
    }
}

