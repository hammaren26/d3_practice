import { reverse, selection } from 'd3';
import { select, range, nest } from 'd3';
import * as d3 from "d3";
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';


document.addEventListener('DOMContentLoaded', function (e) {
   d3.csv('boxplots.csv').then(data => {
      scatterplot(data)
   })


   const tickSize = 470


   function scatterplot(data) {
      const xScale = d3.scaleLinear().domain([1, 8]).range([20, tickSize])
      const yScale = d3.scaleLinear().domain([0, 100]).range([tickSize + 10, 20])



      const yAxis = d3
         .axisLeft()
         .scale(yScale)
         .ticks(8)
         .tickSize(tickSize)

      // const xAxis = d3
      //    .axisBottom()
      //    .scale(xScale)
      //    .tickSize(-tickSize)
      //    .tickValues([1, 2, 3, 4, 5, 6, 7])



      const xAxis = d3
         .axisBottom()
         .scale(xScale)
         .tickSize(-tickSize)
         .tickValues([1, 2, 3, 4, 5, 6, 7]);


      d3.select("svg")
         .append("g")
         .attr("transform", `translate(${tickSize},0)`)
         .attr("id", "yAxisG")
         .call(yAxis)

      d3.select("svg")
         .append("g")
         .attr("transform", `translate(0,${tickSize + 10})`)
         .attr("id", "xAxisG")
         .call(xAxis)

      d3.select("svg")
         .selectAll("circle.median")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "tweets")
         .attr("r", 5)
         .attr("cx", d => xScale(d.day))
         .attr("cy", d => yScale(d.median))
         .style("fill", "red")


      d3.select("svg")
         .selectAll("g.box")
         .data(data)
         .enter()
         .append("g")
         .attr("class", "box")
         .attr("transform", d => {
            return `translate(${xScale(d.day)}, ${yScale(d.median)})`
         })
         .each(function (obj, index) {
            // d3.select(this)
            //    .append("rect")
            //    .attr("x", -10)
            //    .attr("fill-opacity", '0.5')
            //    .attr("y", yScale(obj.q3) - yScale(obj.median))
            //    .attr("width", 20)
            //    .attr("height", yScale(obj.q1) - yScale(obj.q3));

            d3.select(this)
               .append('line')
               .attr('class', 'range')
               .attr('x1', 0)
               .attr('x2', 0)
               .attr('y1', yScale(obj.max) - yScale(obj.median))
               .attr('y2', yScale(obj.min) - yScale(obj.median))
               .style('stroke', 'black')
               .style('stroke-width', '4px')

            d3.select(this)
               .append("line")
               .attr("class", "max")
               .attr("x1", -10)
               .attr("x2", 10)
               .attr("y1", yScale(obj.max) - yScale(obj.median))
               .attr("y2", yScale(obj.max) - yScale(obj.median))
               .style("stroke", "black")
               .style("stroke-width", "4px")

            d3.select(this)
               .append("line")
               .attr("class", "min")
               .attr("x1", -10)
               .attr("x2", 10)
               .attr("y1", yScale(obj.min) - yScale(obj.median))
               .attr("y2", yScale(obj.min) - yScale(obj.median))
               .style("stroke", "black")
               .style("stroke-width", "4px")

            d3.select(this)
               .append("rect")
               .attr("class", "range")
               .attr("width", 20)
               .attr("x", -10)
               .attr("y", yScale(obj.q3) - yScale(obj.median))
               .attr("height", yScale(obj.q1) - yScale(obj.q3))
               .style("fill", "white")
               .style("stroke", "black")
               .style("stroke-width", "2px")
               .style("fill-opacity", "0.5")

            d3.select(this)
               .append("line")
               .attr("x1", -10)
               .attr("x2", 10)
               .attr("y1", 0)
               .attr("y2", 0)
               .style("stroke", "darkgray")
               .style("stroke-width", "4px")
         })


      d3.select("#xAxisG > path.domain").style("display", "none");

   }
})