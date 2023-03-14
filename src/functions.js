import * as d3 from "d3";

export async function ConvertCsvToArr(url) {
   let arr = [];

   await d3.csv(url, data => {
      arr.push(data)
   });

   return arr
}