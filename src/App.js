import React from 'react'
import ReactDOM from 'react-dom'
import { scaleBand, scaleLinear, max } from 'd3'

import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'

const width = 960
const height = 500

// Margin convention:
// How you make room for axes - margin = gaps (inner rect = where svg viz goes) therefore we use inner width and inner // ////// height
const margin = { top: 20, right: 20, bottom: 20, left: 200 }

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  // (X) Linear scale:
  // Domain of the linear sace is 2 number = minimum and maximum (from data space)
  // Range of linear scale also has min and max (within screen space)

  // Max utility:
  // d3 provides a utility called 'max'
  // max takess two arguments - the data array, and an accesser fxn which takes as input d(one of our rows) => and returns in // this case d.Population
  // In this example - this will compare the population numbers across all rows and will return the maximum

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth])

  // (Y) Band scale:
  // y axis determined by the different countries - to figure out y position we need to use a construction called a scale - //// specifically an band scale (useful for ordinal attributes)
  // Band scale takes values from the 'data' space or domain (eg. countries) and return them in 'screen' space or the range //// of the scale
  // Bandwidth of the scale = width of one bar

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks data={data} xScale={xScale} yScale={yScale} />
      </g>
    </svg>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
