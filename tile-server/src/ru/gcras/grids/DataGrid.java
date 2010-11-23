package ru.gcras.grids;

import java.util.ArrayList;

public class DataGrid<T> extends XYGrid
{
    public ArrayList<T> Data;
    public boolean Transpose = false;
    public boolean ReverseY = false;

    public DataGrid(Double[] x, Double[] y)
    {
    	super(x,y);
        Data = new ArrayList<T>(x.length * y.length);
    }
    
    public DataGrid(XYGrid grid) 
    {
    	super(grid.X, grid.Y);
        Data = new ArrayList<T>(X.length * Y.length); 
    }

    public T GetValue(int i, int j)
    {

        int index;

        if (!Transpose)
            index = (ReverseY?(Y.length-j-1):j) * X.length + i;
        else
            index = i*Y.length + (ReverseY ? (Y.length - j - 1) : j);

        return Data.get(index);        
    }

    public void SetValue(int i, int j, T value)
    {
        int index;

        if (!Transpose)
            index = (ReverseY ? (Y.length - j - 1) : j) * X.length + i;
        else
            index = i * Y.length + (ReverseY ? (Y.length - j - 1) : j);

        Data.set(index, value);
    }
}
