package ru.gcras.grids;

import java.awt.Color;
import java.util.Arrays;

public class Interpolation
{
    public static <T> boolean FindNeighbours(T[] array, T x, int[] result)
    {
        int n = Arrays.binarySearch(array, x);
        //System.out.print(n+" ");
        if (n >= 0)
        {
            result[0] = result[1] = n;
            return true;
        }
        else
        {
            n = ~n;
            
            if (n >= array.length || n == 0)
            {
                result[0] = result[1] = -1;
                return false;
            }
            else
            {
                result[1] = n;
                result[0] = n - 1;
                //System.out.println("Neighbors found: "+result[0]+", "+result[1]);
                return true;
                
            }
        }
    }

    public static double Linear(double x1, double x2, double x, double f1, double f2)
    {
        if (x == x1) return f1;
        else if (x == x2) return f2;
        else return ((x2 - x) * f1 + (x - x1) * f2) / (x2 - x1);
    }

    public static byte Linear(double x1, double x2, double x, byte f1, byte f2)
    {
        if (x == x1) return f1;
        else if (x == x2) return f2;
        else return (byte)(((x2 - x) * f1 + (x - x1) * f2) / (x2 - x1));
    }

    public static float Linear(double x1, double x2, double x, float f1, float f2)
    {
        if (x == x1) return f1;
        else if (x == x2) return f2;
        else return (float)(((x2 - x) * f1 + (x - x1) * f2) / (x2 - x1));
    }

    public static int LinearRgb(double x1, double x2, double x, int f1, int f2)
    {
        Color c1 = new Color(f1,false);
        Color c2 = new Color(f2,false);

        if (x == x1) return f1;
        else if (x == x2) return f2;
        else
        {
            int r = (int)(((x2 - x) * c1.getRed() + (x - x1) * c2.getRed()) / (x2 - x1));
            int g = (int)(((x2 - x) * c1.getGreen() + (x - x1) * c2.getGreen()) / (x2 - x1));
            int b = (int)(((x2 - x) * c1.getBlue() + (x - x1) * c2.getBlue()) / (x2 - x1));

            return new Color(r, g, b).getRGB();
        }
    }
}

