
import * as d3 from "d3";
import { reverse, selection, scaleLinear } from 'd3';
import { select, range } from 'd3';
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';




document.addEventListener('DOMContentLoaded', function (e) {
   d3.csv("movies.csv").then(data => {
      dataViz(data)
   })


   function dataViz(data) {
      // var xScale = d3.scaleLinear().domain([0, 10]).range([0, 500]);
      // var yScale = d3.scaleLinear().domain([0, 100]).range([500, 0]);


      var xScale = d3.scaleLinear().domain([0, 10]).range([0, 500])
      var yScale = d3.scaleLinear().domain([0, 60]).range([480, 0])
      var heightScale = d3.scaleLinear().domain([0, 60]).range([0, 480])


      let movies = [
         "titanic",
         "avatar",
         "akira",
         "frozen",
         "deliverance",
         "avengers"
      ]

      var fillScale = d3
         .scaleOrdinal()
         .domain(movies)
         .range([
            "#fcd88a",
            "#cf7c1c",
            "#93c464",
            "#75734F",
            "#5eafc6",
            "#41a368"
         ])

      let stackLayout = d3
         .stack()
         .keys(movies)


      var stackArea = d3.area()
         .x((d, i) => {
            return xScale(i)
         })
         .y0((d, i) => {
            return yScale(d[0])
         })
         .y1(d => yScale(d[1]))
         .curve(d3.curveBasis)



      // stackLayout
      //    .offset(d3.stackOffsetSilhouette)
      //    .order(d3.stackOrderInsideOut)


      // yScale.domain([-50, 50])


      // d3.select("svg")
      //    .selectAll("path")
      //    .data(stackLayout(data))
      //    .enter()
      //    .append("path")
      //    .style("fill", d => fillScale(d.key))
      //    .attr("d", d => stackArea(d))
      //    .attr("id", d => {
      //       return d.key
      //    });



      d3.select("svg")
         .selectAll("g.bar")
         .data(stackLayout(data))
         .enter()
         .append("g")
         .attr("class", "bar")
         .each(function (d) {
            console.log(d);
            d3
               .select(this)
               .selectAll("rect")
               .data(d)
               .enter()
               .append("rect")
               .attr("x", (p, q) => {
                  // console.log(p, q);
                  return xScale(q) + 30
               })
               .attr("y", (p, i) => {
                  // console.log(p[1], i);
                  return yScale(p[1])
               })
               .attr("height", p => heightScale(p[1] - p[0]))
               .attr("width", 40)
               .style("fill", fillScale(d.key));
         });



      /*----------------------------------------------------*/
      const new_data = [
         { month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, durians: 400 },
         { month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, durians: 400 },
         { month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, durians: 400 },
         { month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, durians: 400 },
      ];

      const stack = d3.stack()
         .keys(["apples", "bananas", "cherries", "durians"])
         .order(d3.stackOrderNone)
         .offset(d3.stackOffsetNone);

      const series = stack(new_data);



   }
})