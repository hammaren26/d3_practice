import { reverse, selection } from 'd3';
import { select, range, nest } from 'd3';
import * as d3 from "d3";
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';



function createSoccerViz() {
   function overallTeamViz(incomingData) {
      d3.select("svg")
         .append("g")
         .attr("id", "teamsG")
         .attr("transform", "translate(50,300)").selectAll("g")
         .data(incomingData)
         .enter()
         .append("g")
         .attr("class", "overallG")
         .attr("transform", function (d, i) {
            return `translate(${i * 90}, 0)`
         })

      let teamG = d3.selectAll("g.overallG");

      teamG
         .append("circle")
         .attr("r", 20)

      teamG
         .append("text")
         .attr("y", 30)
         .attr("x", -30)
         .text(d => d.team)

      // d3.selectAll("g.overallG")
      //    .insert("image", "text")
      //    .attr("href", d => `images/${d.team}.png`)
      //    .attr("width", "45px")
      //    .attr("height", "20px")
      //    .attr("x", -22)
      //    .attr("y", -10)

      teamG.on("mouseenter", highlightRegion);
      teamG.on("mouseleave", function () {
         d3.selectAll("g.overallG")
            .select("circle")
            .attr("class", "")

         d3.selectAll("g.overallG")
            .select("text")
            .classed("active", false)
            .transition()
            .duration(300)
            .attr("y", 30)
            .attr("style", "transform: scale(1)")
      })


      d3.text("resources/infobox.html").then(data => {
         d3.select("body")
            .append("div")
            .attr("id", "infobox")
            .html(data)
      })


      function loadSVG(svgData) {
         console.log(svgData)


         d3.select(svgData).selectAll("path").each(function () {
            d3.select("svg").node().appendChild(this);
         });





         d3.selectAll("path").attr("transform", "translate(50,50)");
      }



      d3.html("ball.svg").then(data => {
         loadSVG(data)
      })




      teamG.on("click", teamClick)


      function teamClick(event) {
         d3.selectAll("td.data")
            .data(Object.values(event.target.__data__))
            .html(p => {
               return p;
            })
      }



      function highlightRegion(event) {
         // d3.selectAll("g.overallG")
         //    .select("circle")
         //    .attr("class", p => {
         //       return p.region === event.target.__data__.region ? "active" : "inactive"
         //    })

         d3.select(this)
            .select("text")
            .classed("active", true)
            .transition()
            .duration(300)
            .attr("y", 10)
            .attr("style", "transform: scale(1.5)")

         d3.selectAll("g.overallG")
            .select("circle")
            .each(function (p) {
               p.region == event.target.__data__.region ?
                  d3.select(this).classed("active", true) :
                  d3.select(this).classed("inactive", true)
            })

         let teamColor = d3.rgb("#75739F");

         d3.selectAll("g.overallG")
            .select("circle")
            .style("fill", (p) => {
               return p.region === event.target.__data__.region ? teamColor.darker(.75) : teamColor.brighter(.5)
            })
      }

      const dataKeys = Object.keys(incomingData[0])
         .filter(d => {
            return d != false && d !== "team" && d !== "region"
         });

      d3.select("#controls")
         .selectAll("button.teams")
         .data(dataKeys)
         .enter()
         .append("button")
         .on("click", buttonClick)
         .html(d => d);

      function buttonClick(event) {
         let maxValue = d3.max(incomingData, d => parseFloat(d[event.target.innerHTML]))
         let colorQuantize = d3.scaleQuantize()
            .domain([0, maxValue])
            .range(colorbrewer.Greens[3]);
         let tenColorScale = d3.scaleOrdinal()
            .domain(["UEFA", "CONMEBOL", "CAF"])
            .range(d3.schemeCategory10)
            .unknown('#c4b9ac')
         let radiusScale = d3.scaleLinear().domain([0, maxValue]).range([2, 20]);

         // d3.selectAll("g.overallG")
         //    .select("circle")
         //    .transition()
         //    .duration(1000)
         // .attr("r", d => {
         //    return radiusScale(d[event.target.innerHTML])
         // })

         let ybRamp = d3
            .scaleLinear()
            .interpolate(d3.interpolateLab)
            .domain([0, maxValue])
            .range(["blue", "yellow"])


         d3.selectAll("g.overallG")
            .select("circle")
            .transition()
            .duration(1000)
            // .attr("r", d => radiusScale(d[event.target.innerHTML]))
            // .style("fill", d => tenColorScale(d.region))
            .style("fill", d => colorQuantize(d[event.target.innerHTML]))
            .attr("r", d => radiusScale(d[event.target.innerHTML]))
      }
   }

   ConvertCsvToArr("worldcup.csv").then(data => {
      overallTeamViz(data)
   })
}


document.addEventListener('DOMContentLoaded', function (e) {
   createSoccerViz()
})