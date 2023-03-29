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

      var fillScale = d3.scaleOrdinal().range(["#fcd88a", "#cf7c1c", "#93c464"])
      var normal = d3.randomNormal()
      var sampleData1 = d3.range(100).map(d => normal())
      var sampleData2 = d3.range(100).map(d => normal())

      console.log(sampleData2);

      var sampleData3 = d3.range(100).map(d => normal())
      var histoChart = d3.histogram();

      histoChart
         .domain([-3, 3])
         .thresholds([-3, -2.5, -2, -1.5, -1,
         -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3])
         .value(d => d)

      var yScale = d3.scaleLinear().domain([-3, 3]).range([400, 0]);
      var yAxis = d3.axisRight().scale(yScale)
         .tickSize(300)

      d3.select("svg").append("g").call(yAxis)

      var area = d3.area()
         .x0(d => -d.length)
         .x1(d => d.length)
         .y(d => yScale(d.x0))
      // .curve(d3.curveCatmullRom)

      d3.select("svg")
         .selectAll("g.violin")
         .data([sampleData1, sampleData2, sampleData3])
         .enter()
         .append("g")
         .attr("class", "violin")
         .attr("transform", (d, i) => `translate(${50 + i * 100},0)`)
         .append("path")
         .style("stroke", "black")
         .style("fill", (d, i) => fillScale(i))
         .attr("d", d => area(histoChart(d)))
   }




})