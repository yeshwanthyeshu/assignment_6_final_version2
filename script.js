var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("widget");


// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// adding functionality to the save button
var savebutton = document.getElementById("modalsave");
var saved =[];
var num =1;
savebutton.onclick = function() {
	createtab();
	// the following adds the chart type to saved array
	var sel = document.getElementById("selectcharttype");
	var charttoshow  = sel.options[sel.selectedIndex].value;
	var nameofchart = document.getElementById("chartname").value;
	
	saved.push(["s.no:"+num,"name: "+nameofchart,"type:"+charttoshow]);
	num = num+1;
	modal.style.display = "none";
}



var data = [8, 10, 15,20,35,5,14];



newid=1;
// the following function is to add a tab 
function createtab() {
	
	var mydivid = "mydiv"+newid; // generating dynamic id
	var newdiv = document.createElement("div"); // creating newdiv
		newdiv.className="jumbotron";
		
		newdiv.style.border ="1px solid black";
		newdiv.id=mydivid;
	var height = document.getElementById("height").value;
	var width = document.getElementById("width").value;
		newdiv.style.width = width+"px";
		newdiv.style.height = height+"px";
	var cname = document.getElementById("chartname").value;
		newdiv.innerHTML ="<h2>The name of chart is : "+cname+"</h2>";
	// adding p elements
	var newp = document.createElement("p");
		newp.innerHTML="<h4>to see the chart click on me</h4>";
		newdiv.appendChild(newp);

 
 var mysvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	mysvgid = "mysvg"+newid;
	mysvg.id = mysvgid;
	mysvg.style.height=height;
	mysvg.style.width =width;
	mysvg.style.opacity = 0;
	newdiv.appendChild(mysvg);
	
	document.getElementById("tab").appendChild(newdiv);
	
	//newbarchart(mysvgid);
	//newlinechart(mysvgid);
	//newpiechart(mysvgid);
	
	var sel = document.getElementById("selectcharttype");
	var charttoshow  = sel.options[sel.selectedIndex].value;
	console.log(charttoshow);
	
	if(charttoshow == "pie"){
			newpiechart(mysvgid);
	}
	if(charttoshow == "bar"){
		newbarchart(mysvgid);
	}
	if(charttoshow == "line"){
		newlinechart(mysvgid);
	}
	if(charttoshow == "forcedirect"){
		newforeceddirect(mysvgid);
	}
	if(charttoshow == "scatter") {
		newscartter(mysvgid);
	}
	if(charttoshow =="chord"){
		chord(mysvgid);
	}
	
	// this is an alert event only for sample 
	var justdiv = document.getElementById(mydivid);
	justdiv.addEventListener('click', function (event) {
	var myfunsvg = document.getElementById(mysvgid);
	myfunsvg.style.opacity = 1;
	 //alert('Hi!');
	});
	newid = newid +1;  
}

// new bar chart is working fine

function newbarchart(val){
	var dataArray = [8, 10, 15,20,35,5,14];

	// Create variable for the SVG
	var myid = "#"+val;
	var svg = d3.select(myid)
		.attr("height","400px")
		.attr("width","50%");

	// Select, append to SVG, and add attributes to rectangles for bar chart
	svg.selectAll("rect")
		.data(dataArray)
		.enter().append("rect")
			  .attr("class", "bar")
			  .attr("height", function(d, i) {return (d * 10)})
			  .attr("width","40")
			  .attr("x", function(d, i) {return (i * 60) + 15})
			  .attr("y", function(d, i) {return 350 - (d * 10)});

	// Select, append to SVG, and add attributes to text
	svg.selectAll("text")
		.data(dataArray)
		.enter().append("text")
		.text(function(d) {return d})
			   .attr("class", "text")
			   .attr("x", function(d, i) {return (i * 60) + 36})
			   .attr("y", function(d, i) {return 415 - (d * 10)});
		

}


// the following is the line chart is working fine
function newlinechart(val) {
	val ="#"+val;
	var m = [80, 80, 80, 80]; // margins
	var w = 1000 - m[1] - m[3]; // width
	var h = 400 - m[0] - m[2]; // height
	var xscale = d3.scaleLinear()
		.domain([0, 10])
		.range([0, 350]);
	var x_axis = d3.axisBottom()
		.scale(xscale);
	var yscale = d3.scaleLinear()
			   .domain([0, 10])
			   .range([500, 0]);
	var y_axis = d3.axisLeft()
			   .scale(yscale);		   
			   
	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
	var line = d3.svg.line()
	// assign the X function to plot our line as we wish
	.x(function(d,i) { 
		// verbose logging to show what's actually being done
		console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
		// return the X coordinate where we want to plot this datapoint
		return x(i); 
	})
	.y(function(d) { 
		// verbose logging to show what's actually being done
		console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
		// return the Y coordinate where we want to plot this datapoint
		return y(d); 
	})
	var points = [[50, 250]];
	linedata = [8,10,5,9,11];
	for(var i=1; i<linedata.length; i++){
		points.push([i*100,250- (10*linedata[i])]);
	}
	// Add an SVG element with the desired dimensions and margin.
	var graph = d3.select(val)
		  .attr("width", 350)
		  .attr("height",400)
		  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	var xAxisTranslate = 250;
	graph.append("g")
		.attr("transform", "translate(20, " + xAxisTranslate  +")")
		.call(x_axis)
	graph.append("g")
	   .attr("transform", "translate(20, -255)")
	   .call(y_axis);
	var lineGenerator = d3.line()
		.curve(d3.curveCardinal);
		
	var pathData = lineGenerator(points);
	graph.append("path")
		.attr("d",pathData)
		.attr("stroke","blue")
		.attr("stroke-width",2)
		.attr("fill","none");
	
}




function newpiechart(val){
	val = "#"+val;
	var svg = d3.select(val),		
		radius = Math.min(250,200 ) / 2,
		g = svg.append("g").attr("transform", "translate(" + 200 / 2 + "," + 200 / 2 + ")");

	var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

	// Generate the pie
	var pie = d3.pie();

	// Generate the arcs
	var arc = d3.arc()
				.innerRadius(0)
				.outerRadius(radius);

	//Generate groups
	var arcs = g.selectAll("arc")
				.data(pie(data))
				.enter()
				.append("g")
				.attr("class", "arc")

	//Draw arc paths
	arcs.append("path")
		.attr("fill", function(d, i) {
			return color(i);
		})
		.attr("d", arc);
}


// the following function is the new forced directed graph
function newforeceddirect(val) {
	
	var graph = {
  "nodes": [
    {"id": "a"},
    {"id": "b"},
    {"id": "c"},
	{"id":"d"},
	{"id":"e"},
	{"id":"f"},
	{"id":"g"}	
  ],
  "links": [
    {"source": 0, "target": 1},
    {"source": 5, "target": 2},
	 {"source": 1, "target": 2},
	 {"source": 2, "target": 3},
	  {"source": 3, "target": 4},
	   {"source": 4, "target": 5},
	    {"source": 5, "target": 6}
  ]
};

val = "#"+val;
var svg = d3.select(val)
	width = +svg.attr("width")+250;
	height = +svg.attr("height")+250;
var color = d3.scaleOrdinal(d3.schemaCategory20);
var simulation = d3.forceSimulation()
	.force("link",d3.forceLink().id(function(d,i){return i}))
	.force("charge",d3.forceManyBody())
	.force('center',d3.forceCenter(width/2,height/2));
//console.log(simulation);
var link = svg.append("g")
	.attr("class","links")
	.selectAll("line")
	.data(graph.links)
	.enter().append("line")
	.attr("stroke","blue")
	.attr("stroke-width",function(d){
	return Math.sqrt(d.value);});
var node = svg.append("g")
	.attr("class","nodes")
	.selectAll("circles")
	.data(graph.nodes)
	.enter().append("circle")
	.attr("r",5)
	.attr("fill",function(d){
	return color(d.group);})
	.call(d3.drag()
		.on("start",dragstarted)
		.on("drag",dragged)
		.on("end",dragended));
		
// function declaring

function dragstarted(d){
 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

simulation
	.nodes(graph.nodes)
	.on("tick",ticked);
simulation
	.force("link")
	.links(graph.links);
function ticked() {
link
	.attr("x1", function(d) { return d.source.x; })
	.attr("y1", function(d) { return d.source.y; })
	.attr("x2", function(d) { return d.target.x; })
	.attr("y2", function(d) { return d.target.y; });

node
	.attr("cx", function(d) { return d.x; })
	.attr("cy", function(d) { return d.y; });
}

	
	
}

//newscartter();

// the following is the newscarteredplot
function newscartter(val){

data = [{"sepalLength":2.5 ,"sepalWidth":3.1 ,"petalLength":1.4 ,"petalWidth":0.2 ,"species":"setosa"},
	{"sepalLength": 4.2,"sepalWidth": 2.9,"petalLength": 1.8,"petalWidth": 0.1,"species":"setosa"},
	{"sepalLength":3.9 ,"sepalWidth": 3.2,"petalLength": 1.3,"petalWidth":0.1 ,"species":"versicolor"},
	{"sepalLength": 3.2,"sepalWidth":3.0 ,"petalLength": 1.2,"petalWidth": 0.2,"species":"versicolor"}
	];
	console.log("the data is:");
	console.log(data[0].sepalLength);
var margin = {top: 20, right: 20, bottom: 30, left: 40},
	svgwidht = document.getElementById("width").value;
	svgheight = document.getElementById("height").value;
    width = svgwidht-100 - margin.left - margin.right,
    height = svgheight-150 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);
val = "#"+val;
var svg = d3.select(val)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  data.forEach(function(d) {
    d.sepalLength = +d.sepalLength;
    d.sepalWidth = +d.sepalWidth;
  });

  x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
  y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.sepalWidth); })
      .attr("cy", function(d) { return y(d.sepalLength); })
      .style("fill", function(d) { return color(d.species); });

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

	
	
	
}


// the following chart is for chord diagram
function chord(val){
		
	var matrix = [
	  [1197,  5871, 8916, 200],
	  [ 1951, 10048, 2060, 6171],
	  [ 8010, 16145, 8090, 8045],
	  [ 1013,   990,  940, 6907]
	];
	val ="#"+val;
	var svg = d3.select(val),
		width = +svg.attr("width"),
		height = +svg.attr("height"),
		outerRadius = 150,
		innerRadius = 100;

	var formatValue = d3.formatPrefix(",.0", 1e3);

	var chord = d3.chord()
		.padAngle(0.05)
		.sortSubgroups(d3.descending);

	var arc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);

	var ribbon = d3.ribbon()
		.radius(innerRadius);

	var color = d3.scaleOrdinal()
		.domain(d3.range(4))
		.range(["#000000", "#FFDD89", "#957244", "#F26223"]);

	var g = svg.append("g")
		.attr("transform", "translate(" + 180  + "," + 180  + ")")
		.datum(chord(matrix));

	var group = g.append("g")
		.attr("class", "groups")
	  .selectAll("g")
	  .data(function(chords) { return chords.groups; })
	  .enter().append("g");

	group.append("path")
		.style("fill", function(d) { return color(d.index); })
		.style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
		.attr("d", arc);

	var groupTick = group.selectAll(".group-tick")
	  .data(function(d) { return groupTicks(d, 1e3); })
	  .enter().append("g")
		.attr("class", "group-tick")
		.attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

	groupTick.append("line")
		.attr("x2", 6);

	groupTick
	  .filter(function(d) { return d.value % 5e3 === 0; })
	  .append("text")
		.attr("x", 8)
		.attr("dy", ".35em")
		.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
		.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		.text(function(d) { return formatValue(d.value); });

	g.append("g")
		.attr("class", "ribbons")
	  .selectAll("path")
	  .data(function(chords) { return chords; })
	  .enter().append("path")
		.attr("d", ribbon)
		.style("fill", function(d) { return color(d.target.index); })
		.style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

	// Returns an array of tick angles and values for a given group and step.
	function groupTicks(d, step) {
	  var k = (d.endAngle - d.startAngle) / d.value;
	  return d3.range(0, d.value, step).map(function(value) {
		return {value: value, angle: value * k + d.startAngle};
	  });
	}

	
}

// the following function shows the saved charts to div
function savethecharts(){
	d3.select("#showcharts")
		.text("data is :["+data+"], saved charts:"+"["+saved+"]");
}


function addtodata() {
	val = document.getElementById("myinput").value;
	data.push(val);
	document.getElementById("mydiv").innerText = data;
}




