import { reverse, selection } from 'd3';
import { select, range, nest } from 'd3';
import * as d3 from "d3";
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';


document.addEventListener('DOMContentLoaded', function (e) {

   d3.csv("movies.csv").then(data => {
      lineChart(data)
   })


   function lineChart(data) {
      var fillScale = d3.scaleOrdinal()
         .domain(["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"])
         .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"])


      var xScale = d3.scaleLinear().domain([1, 8]).range([20, 470]);
      var yScale = d3.scaleLinear().domain([0, 55]).range([480, 20])

      Object.keys(data[0]).forEach(key => {
         if (key != "day") {
            var movieArea = d3.area()
               .x(d => xScale(d.day))
               .y0(d => yScale(simpleStacking(d, key) - d[key]))
               .y1(d => yScale(simpleStacking(d, key)))
               .curve(d3.curveBasis)

            d3.select("svg")
               .append("path")
               .attr("id", key + "Area")
               .attr("d", movieArea(data))
               .attr("fill", fillScale(key))
               .attr("stroke", "black")
               .attr("stroke-width", 1)
         }
      })

      function simpleStacking(lineData, lineKey) {

         var newHeight = 0
         Object.keys(lineData).every(key => {
            if (key !== "day") {
               newHeight += parseInt(lineData[key]);
               if (key === lineKey) {
                  return false
               }
            }
            return true
         })
         return newHeight
      }
   }
})