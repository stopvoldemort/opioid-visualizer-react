// import * as d3 from "d3"
//
// export const stateData = () => {
//   // For some reason, this reads index.html rather than stateData.txt
//   d3.tsvParseRows('../stateData.tsv', function(error, text) {
//     if (error) throw error
//     console.log(text);
//   })
// }

// export const STATES: State[] = [
//   { id: 1, name: "vermont", crudeRate: 17.7, deaths: 111, population: 626042, year: 2015 },
//   { id: 2, name: "new hampshire", crudeRate: 32.5, deaths: 433, population: 1330608, year: 2015 },
//   { id: 3, name: "maine", crudeRate: 20.9, deaths: 278, population: 1329328, year: 2015 },
//   { id: 4, name: "massachusetts", crudeRate: 27.2, deaths: 1851, population: 6794422, year: 2015 },
//   { id: 5, name: "connecticut", crudeRate: 23.0, deaths: 827, population: 3590886, year: 2015 },
//   { id: 6, name: "rhode island", crudeRate: 30.1, deaths: 318, population: 1056298, year: 2015 }
// ]

export const DATA = {
  "VT": [
    {year: 1999, deaths: 31},
    {year: 2000, deaths: 37},
    {year: 2001, deaths: 53},
    {year: 2002, deaths: 54},
    {year: 2003, deaths: 73},
    {year: 2004, deaths: 52},
    {year: 2005, deaths: 55},
    {year: 2006, deaths: 83},
    {year: 2007, deaths: 68},
    {year: 2008, deaths: 76},
    {year: 2009, deaths: 57},
    {year: 2010, deaths: 68},
    {year: 2011, deaths: 87},
    {year: 2012, deaths: 81},
    {year: 2013, deaths: 99},
    {year: 2014, deaths: 90},
    {year: 2015, deaths: 111},
    {year: 2016, deaths: 131}
  ], "NH": [
    {year: 1999, deaths: 62},
    {year: 2000, deaths: 49},
    {year: 2001, deaths: 83},
    {year: 2002, deaths: 114},
    {year: 2003, deaths: 137},
    {year: 2004, deaths: 128},
    {year: 2005, deaths: 152},
    {year: 2006, deaths: 160},
    {year: 2007, deaths: 187},
    {year: 2008, deaths: 129},
    {year: 2009, deaths: 172},
    {year: 2010, deaths: 164},
    {year: 2011, deaths: 212},
    {year: 2012, deaths: 177},
    {year: 2013, deaths: 217},
    {year: 2014, deaths: 248},
    {year: 2015, deaths: 433},
    {year: 2016, deaths: 495}
  ], "ME": [
    {year: 1999, deaths: 70},
    {year: 2000, deaths: 62},
    {year: 2001, deaths: 92},
    {year: 2002, deaths: 147},
    {year: 2003, deaths: 134},
    {year: 2004, deaths: 145},
    {year: 2005, deaths: 168},
    {year: 2006, deaths: 166},
    {year: 2007, deaths: 161},
    {year: 2008, deaths: 162},
    {year: 2009, deaths: 182},
    {year: 2010, deaths: 140},
    {year: 2011, deaths: 160},
    {year: 2012, deaths: 157},
    {year: 2013, deaths: 183},
    {year: 2014, deaths: 227},
    {year: 2015, deaths: 278},
    {year: 2016, deaths: 369}
  ], "fake": [
    {year: 1999, deaths: 50},
    {year: 2000, deaths: 60},
    {year: 2001, deaths: 70},
    {year: 2002, deaths: 80},
    {year: 2003, deaths: 90},
    {year: 2004, deaths: 100},
    {year: 2005, deaths: 110},
    {year: 2006, deaths: 120},
    {year: 2007, deaths: 130},
    {year: 2008, deaths: 140},
    {year: 2009, deaths: 150},
    {year: 2010, deaths: 160},
    {year: 2011, deaths: 170},
    {year: 2012, deaths: 180},
    {year: 2013, deaths: 190},
    {year: 2014, deaths: 200},
    {year: 2015, deaths: 210},
    {year: 2016, deaths: 220}
  ], "morefake": [
    {year: 1999, deaths: 55},
    {year: 2000, deaths: 65},
    {year: 2001, deaths: 75},
    {year: 2002, deaths: 85},
    {year: 2003, deaths: 95},
    {year: 2004, deaths: 105},
    {year: 2005, deaths: 115},
    {year: 2006, deaths: 125},
    {year: 2007, deaths: 135},
    {year: 2008, deaths: 145},
    {year: 2009, deaths: 155},
    {year: 2010, deaths: 165},
    {year: 2011, deaths: 175},
    {year: 2012, deaths: 185},
    {year: 2013, deaths: 195},
    {year: 2014, deaths: 205},
    {year: 2015, deaths: 215},
    {year: 2016, deaths: 225}
  ]
}
