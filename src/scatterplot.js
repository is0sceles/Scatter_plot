import * as d3 from 'd3';
import React, { Component } from 'react';
import fileData from './data';


class Scatterplot extends Component {
  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
  }

  chart() {
// set the dimensions and margins of the graph
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50,
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// parse the date / time
    const parseTime = d3.timeParse('%d-%b-%y');

// set the ranges
    const x = d3
  .scaleTime()
  .range([0, width]);
    const y = d3
  .scaleLinear()
  .range([height, 0]);

// define the line
    const valueline = d3
  .line()
  .x(d => x(d.date))
  .y(d => y(d.close));

// append the svg obgect to the body of the page appends a 'group' element to
// 'svg' moves the 'group' element to the top left margin
    const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// Get the data
    d3.csv('data.csv', (error, data) => {
      if (error) { throw error; }

  // format the data
      data
    .forEach((d) => {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });

  // Scale the range of the data
      x.domain(d3.extent(data, d => d.date));
      y.domain([
        0,
        d3.max(data, d => d.close),
      ]);

  // Add the valueline path.
      svg
        .append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline);

  // Add the scatterplot
      svg
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.close));

  // Add the X Axis
      svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

  // Add the Y Axis
      svg
    .append('g')
    .call(d3.axisLeft(y));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Scatter plot</h1>
        </header>
      </div>
    );
  }
}

export default Scatterplot;
