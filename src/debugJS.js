import { reverse, selection } from 'd3';
import { select, range, nest } from 'd3';
import * as d3 from "d3";
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';


document.addEventListener('DOMContentLoaded', function (e) {


   let scatterData = [
      { friends: 5, salary: 22000 },
      { friends: 3, salary: 18000 },
      { friends: 10, salary: 88000 },
      { friends: 0, salary: 180000 },
      { friends: 27, salary: 56000 },
      { friends: 8, salary: 74000 }
   ];

   let xExtent = d3.extent(scatterData, d => d.salary);
   let yExtent = d3.extent(scatterData, d => d.friends);
   let xScale = d3.scaleLinear().domain(xExtent).range([0, 500]);
   let yScale = d3.scaleLinear().domain(yExtent).range([0, 500]);


   console.log({
      xExtent,
      yExtent,
      xScale,
      yScale,
   });

   d3.select("svg")
      .selectAll("circle")
      .data(scatterData)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", d => xScale(d.salary))
      .attr("cy", d => yScale(d.friends));


   let yAxis = d3.axisRight().scale(yScale).ticks(4).tickSize(500)
   d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis)

   let xAxis = d3.axisBottom().scale(xScale).tickSize(500).ticks(8)
   d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis)
   // xAxis(d3.select("svg").append("g").attr("id", "xAxisG"))

})