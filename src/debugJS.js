
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




document.addEventListener('DOMContentLoaded', function (e) {
   d3.json("tweets.json").then(data => {
      dataViz(data)
   })


   function dataViz(data) {
      let depthScale = d3
         .scaleOrdinal()
         .range([
            "#5EAFC6",
            "#FE9922",
            "#93c464",
            "#75739F"
         ])

      let nestedTweets = d3.group(data.tweets, d => d.user)
      let packableTweets = {
         id: "All Tweets",
         values: nestedTweets
      };
      let packChart = d3.pack();

      packChart.size([200, 200])


      console.log(packableTweets)


      let root = d3
         .hierarchy(packableTweets, d => {
            return d.values
         })
         .sum(() => {
            return 1
         })



      d3.hierarchy(packableTweets, d => d.values)
         .sum(d => d.retweets ? d.retweets.length +
            d.favorites.length + 1 : undefined)

      d3
         .select("svg")
         .append("g")
         .attr("transform", "translate(100,20)")
         .selectAll("circle")
         .data(packChart(root).descendants())
         .enter()
         .append("circle")
         .attr("r", d => {
            console.log(d);
            return d.r
         })
         .attr("cx", d => d.x)
         .attr("cy", d => d.y)
         .attr("id", d => d.data[0])
         .style("fill", d => depthScale(d.depth))
         .style("stroke", "#000000")
         .style("stroke-width", "2px")
   }
})