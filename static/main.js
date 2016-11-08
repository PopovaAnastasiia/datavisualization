var w = 1500;
var h = 500;
var barPadding = 20;
var padding = 2;
var url = "http://127.0.0.1:5000/population"

//Create scale functions
var xScale = d3.scaleBand()
             .range([0, w - padding]);

var yScale = d3.scaleLinear()
            .range([h - barPadding, padding]);

//Define X,Y asis
var xAxis = d3.axisBottom()
            .scale(xScale);

var yAxis = d3.axisRight()
            .scale(yScale);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


d3.json(url, function(json){
var dataset = json.result
xScale.domain(dataset.map(function(d){return d.city.city;}))
yScale.domain([0, d3.max(dataset, function(d) { return d.pop })])

//Create rectangles
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
         return i * (w / dataset.length);
    })
   .attr("y", function(d) {
          return (yScale(d.pop) - barPadding);
    })
   .attr("width", w / dataset.length - padding)
   .attr("height", function(d) {
          return h  - yScale(d.pop);
    })
   .attr("fill", function(d) {
          return "rgb(66, 244, 101)";
    })
    .append("title")
    .text(function(d) { return d.pop; });;

//Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - barPadding) + ")")
    .call(xAxis);

//Create Y axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 1 +  ",0)")
    .call(yAxis);
});