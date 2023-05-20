'use strict';

import * as d3 from "d3";
import { reverse, selection, scaleLinear } from 'd3';
import { select, range } from 'd3';
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';
import * as d3Sankey from 'd3-sankey';
import cloud from "d3-cloud";
import { event } from "d3";


document.addEventListener('DOMContentLoaded', function (e) {
   d3.json("tweets.json").then(data => {
      dataViz(data.tweets)
   })


   function dataViz(data) {
      let nestedTweets = d3.group(data, d => d.user)
      // console.log('nestedTweets', nestedTweets);



      let packableTweets = {
         id: "All Tweets",
         values: nestedTweets
      };

      let depthScale = d3
         .scaleOrdinal()
         .range([
            "#5EAFC6",
            "#FE9922",
            "#93c464",
            "#75739F"
         ])

      // console.log(packableTweets)


      function project(x, y) {
         var angle = x / 90 * Math.PI
         var radius = y
         return [radius * Math.cos(angle), radius * Math.sin(angle)];
      }

      let root = d3
         .hierarchy(packableTweets, d => {
            return d.values
         })
         .sum(() => {
            return 1
         })

      var treeChart = d3.tree();
      treeChart.size([200, 200])
      var treeData = treeChart(root).descendants()

      // console.log(treeData);

      d3.select("svg")
         .append("g")
         .attr("id", "treeG")
         .attr("transform", "translate(250,250)")
         .selectAll("g")
         .data(treeData)
         .enter()
         .append("g")
         .attr("class", "node")
         // .attr("transform", d => `translate(${d.y},${d.x})`)
         .attr("transform", d => `translate(${project(d.x, d.y)})`)

      d3.selectAll("g.node")
         .append("circle")
         .attr("r", 10)
         .style("fill", d => depthScale(d.depth))
         .style("stroke", "white")
         .style("stroke-width", "2px");

      d3.select("#treeG")
         .selectAll("line")
         .data(treeData.filter(d => d.parent))
         .enter()
         .insert("line", "g")
         // .attr("x1", d => d.parent.y)
         // .attr("y1", d => d.parent.x)
         // .attr("x2", d => d.y)
         // .attr("y2", d => d.x)



         .attr("x1", d => project(d.parent.x, d.parent.y)[0])
         .attr("y1", d => project(d.parent.x, d.parent.y)[1])
         .attr("x2", d => project(d.x, d.y)[0])
         .attr("y2", d => project(d.x, d.y)[1])


         .style("stroke", "black")

      d3.selectAll("g.node")
         .append("text")
         .style("text-anchor", "middle")
         .style("fill", "#4f442b")
         .text(d => {
            console.log(d);
            return d.data.id || d.data.key || d.data.content || d.data[0]
         })


      // let treeZoom = d3.zoom()
      // treeZoom.on("zoom", zoomed)
      // d3.select("svg").call(treeZoom)

      // function zoomed(e) {
      //    d3
      //       .select("#treeG")
      //       .attr(
      //          "transform",
      //          `translate(${e.transform.x},${e.transform.y})`
      //       )
      // }
   }
})