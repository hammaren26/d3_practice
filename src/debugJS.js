
import * as d3 from "d3";
import { reverse, selection, scaleLinear } from 'd3';
import { select, range } from 'd3';
import $ from "jquery";
import jQuery from "jquery";
import inputmask from "inputmask/dist/jquery.inputmask.js";
import colorbrewer from 'colorbrewer';
import { ConvertCsvToArr, highlightRegion } from './functions';




document.addEventListener('DOMContentLoaded', function (e) {
   d3.json("tweets.json").then(data => {
      pieChart(data.tweets)
      // test()
   })

   function pieChart(data) {
      var nestedTweets = d3.group(data, d => d.user)

      nestedTweets.forEach(obj => {
         obj.numTweets = obj.length;
         obj.numFavorites = d3.sum(obj, p => {
            return p.favorites.length
         })
         obj.numRetweets = d3.sum(obj, p => {
            return p.retweets.length
         })
      })

      let pieChart = d3.pie();
      let newArc = d3.arc();
      pieChart.value(d => d[1].numTweets).sort(null)
      let tweetsPie = pieChart(nestedTweets)



      pieChart.value(d => {
         return d[1].numRetweets
      })

      let retweetsPie = pieChart(nestedTweets)



      nestedTweets.forEach((d, i) => {
         d.tweetsSlice = tweetsPie.filter(el => {
            return el['data'][0] == i;
         })
         d.retweetsSlice = retweetsPie.filter(el => {
            return el['data'][0] == i;
         })
      })

      // console.log('nestedTweets', nestedTweets);
      // console.log('tweetsPie', tweetsPie);
      // console.log(retweetsPie);







      newArc
         .innerRadius(20)
         .outerRadius(100)

      var fillScale = d3.scaleOrdinal()
         .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F"])

      d3.select("svg")
         .append("g")
         .attr("transform", "translate(100,100)")
         .selectAll("path")
         .data(tweetsPie, function (d, i) {
            // console.log(d, i);
         })
         .enter()
         .append("path")
         .attr("d", newArc)
         .style("fill", (d, i) => fillScale(i))
         .style("stroke", "black")
         .style("stroke-width", "2px");


      btn.addEventListener('click', () => {
         pieChart.value(d => d[1].numFavorites).sort(null)

         d3.selectAll("path")
            .data(pieChart(nestedTweets))
            .transition()
            .duration(1000)
            .attr("d", newArc)
         // .attrTween("d", arcTween)
      })

      function arcTween(d) {
         console.log(d);
         return t => {
            // var interpolateStartAngle = d3
            //    .interpolate(d.tweetsSlice.startAngle, d.retweetsSlice.startAngle);
            // var interpolateEndAngle = d3
            //    .interpolate(d.tweetsSlice.endAngle, d.retweetsSlice.endAngle);
            // d.startAngle = interpolateStartAngle(t);
            // d.endAngle = interpolateEndAngle(t);
            return newArc(d);
         }
      }
   }

   function test() {
      // const i = d3.interpolateNumber(0, 100);
      const i = d3.interpolate(
         { colors: ["red", "blue"] },
         { colors: ["white", "black"] }
      );
      let ff = i(1)
      console.log(ff);
      // let f = d3.interpolateLab("#ffffff", "red")(0.3);
      // console.log(f)



      btn.addEventListener('click', () => {



         console.log(d3.select("path#test"));

         d3.select("path#test")
            .transition()
            .duration(5000)
            // .style("fill", 'black')
            .styleTween("fill", function (t) {
               console.log(t);
               return function (t) {
                  return "hsl(" + t * 360 + ",100%,50%)";
               };
            })



      })






   }
})