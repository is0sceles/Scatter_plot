import * as d3 from 'd3';
import React, { Component } from 'react';

class Scatterplot extends Component {
  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    this.data = this.props.data;
  }

  chart() {
    // set the dimensions and margins of the graph
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // parse the date / time
    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');

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
                      .y(d => y(d.duration));

    // append the svg obgect to the body of the page appends a 'group' element to
    // 'svg' moves the 'group' element to the top left margin
    const svg = d3
                .select('body')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

    // const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g;

    this.data
          .forEach((d) => {
            d.date = parseTime(d.start_time);
            d.duration = +d.duration;
            console.log(d); // delete me por favor
          });

      // Scale the range of the data
    x.domain(d3.extent(this.data, d => d.date));
    y.domain([
      0,
      d3.max(this.data, d => d.duration),
    ]);

      // Add the valueline path.
    svg
        .append('path')
        .data([this.data])
        .attr('class', 'line')
        .attr('d', valueline);

      // Add the scatterplot
    svg
        .selectAll('dot')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.duration));

      // Add the X Axis
    svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add the Y Axis
    svg
        .append('g')
        .call(d3.axisLeft(y));
  }

  render() {
    return (
      <div className="App">
        {this.chart()}
        <footer className="App-header">
          <h6 className="App-title">powered by D3</h6>
        </footer>
      </div>
    );
  }
}

export default Scatterplot;
