package ru.gcras.grids;

public class XYGrid {
    
	public Double[] X;
    public Double[] Y;

    public XYGrid(Double[] x, Double[] y)
    {
        X = new Double[x.length];
        Y = new Double[y.length];
        
        for (int i=0; i<x.length; i++) {
        	X[i] = x[i].doubleValue();
        }
        
        for (int i=0; i<y.length; i++) {
        	Y[i] = y[i].doubleValue();
        }
    }
}
