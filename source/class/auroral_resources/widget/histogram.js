var chart = new qxprotovis.Panel();
this.add(chart);
this.__chart = chart;

var pv = chart.getPv();
var data = pv.range(10).map(function(d) { return Math.random() + .1; });
var vis = chart.getPanel()
    .bottom(20)
    .left(20)
    .right(10)
    .top(5)
    .def("i", -1);            

var x = pv.Scale.linear(0, 1.1).range(0, 570);
var y = pv.Scale.ordinal(pv.range(10)).splitBanded(0, 230, 4/5);

this.addListener('resize',function(e){
    var s=e.getData();
    x.range(0,s.width-30);
    y.splitBanded(0,s.height-50,4/5);
    vis.render();
});

var bar = vis.add(pv.Bar)
   .data(data)
   .top(function(){return y(this.index)})
   .height(function(){return y.range().band})
   .left(0)
   .width(x)
   .fillStyle(function(){return vis.i() == this.index ? "green" : "steelblue"})
   .event("mouseover", function(){return vis.i(this.index)})
   .event("mouseout", function(){return vis.i(-1)});

/* The value label. */
bar.anchor("right").add(pv.Label)
    .textStyle("white")
    .text(function(d){return d.toFixed(2)});
    
/* The variable label. */
bar.anchor("left").add(pv.Label)
    .textMargin(5)
    .textAlign("right")
    .text(function(){return "ABCDEFGHIJK".charAt(this.index)});

/* X-axis ticks. */
vis.add(pv.Rule)
    .data(function(){return x.ticks(5)})
    .left(x)
    .strokeStyle(function(d){return d ? "rgba(255,255,255,.3)" : "#000"})
.add(pv.Rule)
    .bottom(0)
    .height(5)
    .strokeStyle("#000")
.anchor("bottom").add(pv.Label)
    .text(x.tickFormat);	
