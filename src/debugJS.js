import { reverse, selection } from 'd3';
import { select, range, nest } from 'd3';
import * as d3 from "d3";
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';


document.addEventListener('DOMContentLoaded', function (e) {

   d3.csv("tweetdata.csv").then(data => {
      lineChart(data)
   })



   function lineChart(data) {

      const blue = "#5eaec5";
      const green = "#92c463";
      const orange = "#fe9a22";

      let xScale = d3.scaleLinear().domain([1, 10.5]).range([20, 480])
      let yScale = d3.scaleLinear().domain([0, 35]).range([480, 20])

      let xAxis = d3
         .axisBottom()
         .scale(xScale)
         .tickSize(480)
         .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      d3
         .select("svg")
         .append("g")
         .attr("id", "xAxisG")
         .call(xAxis)

      let yAxis = d3
         .axisRight()
         .scale(yScale)
         .ticks(10)
         .tickSize(480)

      d3
         .select("svg")
         .append("g")
         .attr("id", "yAxisG")
         .call(yAxis)

      d3.select("svg")
         .selectAll("circle.tweets")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "tweets")
         .attr("r", 5)
         .attr("cx", d => xScale(d.day))
         .attr("cy", d => yScale(d.tweets))
         .style("fill", blue)

      d3.select("svg").selectAll("circle.retweets")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "retweets")
         .attr("r", 5)
         .attr("cx", d => xScale(d.day))
         .attr("cy", d => yScale(d.retweets))
         .style("fill", green)

      d3.select("svg").selectAll("circle.favorites")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "favorites")
         .attr("r", 5)
         .attr("cx", d => xScale(d.day))
         .attr("cy", d => yScale(d.favorites))
         .style("fill", orange)


      // let tweetLine = d3
      //    .line()
      //    .x(d => xScale(d.day))
      //    .y(d => yScale(d.tweets))

      // d3.select("svg")
      //    .append("path")
      //    .attr("d", tweetLine(data))
      //    .attr("fill", "none")
      //    .attr("stroke", "#fe9a22")
      //    .attr("stroke-width", 2)

      const lambdaXScale = d => xScale(d.day)

      const tweetLine = d3.line()
         .x(lambdaXScale)
         .y(d => yScale(d.tweets))

      const retweetLine = d3.line()
         .x(lambdaXScale)
         .y(d => yScale(d.retweets))

      const favLine = d3.line()
         .x(lambdaXScale)
         .y(d => yScale(d.favorites))

      tweetLine.curve(d3.curveBasis)
      retweetLine.curve(d3.curveStep)
      favLine.curve(d3.curveCardinal)

      d3.select("svg")
         .append("path")
         .attr("d", tweetLine(data))
         .attr("fill", "none")
         .attr("stroke", blue)
         .attr("stroke-width", 2)

      d3.select("svg")
         .append("path")
         .attr("d", retweetLine(data))
         .attr("fill", "none")
         .attr("stroke", green)
         .attr("stroke-width", 2)

      d3.select("svg")
         .append("path")
         .attr("d", favLine(data))
         .attr("fill", "none")
         .attr("stroke", orange)
         .attr("stroke-width", 2)

   }

})