import { reverse, selection } from 'd3';
import { select, range, nest } from 'd3';
import * as d3 from "d3";
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';


document.addEventListener('DOMContentLoaded', function (e) {

   d3.json("tweets.json").then(data => {
      histogram(data.tweets)
   })



   function histogram(tweetsData) {
      console.log(tweetsData);

      var xScale = d3.scaleLinear().domain([0, 5]).range([0, 500]);
      var yScale = d3.scaleLinear().domain([0, 10]).range([400, 0]);


      var xAxis = d3.axisBottom().scale(xScale).ticks(5)
      var histoChart = d3.histogram();

      function retweets() {
         histoChart.value(d => d.retweets.length)
         histoData = histoChart(tweetsData);

         d3.selectAll("rect")
            .data(histoData)
            .transition()
            .duration(500)
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("height", d => 400 - yScale(d.length))
      };



      histoChart
         .domain([0, 5])
         .thresholds([0, 1, 2, 3, 4, 5])
         .value(d => {
            return d.favorites.length
         })

      let histoData = histoChart(tweetsData);

      console.log('histoData: ', histoData);

      d3.select("svg")
         .selectAll("rect")
         .data(histoData)
         .enter()
         .append("rect")
         .attr("x", d => {
            return xScale(d.x0)
         })
         .attr("y", d => yScale(d.length))
         .attr("width", d => xScale(d.x1 - d.x0) - 2)
         .attr("height", d => 400 - yScale(d.length))
         .style("fill", "#FCD88B")
         .on("click", retweets)

      d3.select("svg")
         .append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0,400)")
         .call(xAxis);

      d3.select("g.axis")
         .selectAll("text")
         .attr("dx", 50);
   }




})