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
    const height = 520 - margin.top - margin.bottom;

    // parse the date / time
    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');

    // set the ranges
    const x = d3
              .scaleTime()
              .range([0, width]);
    const y = d3
              .scaleLinear()
              .range([height, 0]);

    // append the svg obgect to the body of the page appends a 'group' element to
    // 'svg' moves the 'group' element to the top left margin
    const svg = d3
                .select('body')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

    this.data
          .forEach((d, i) => {
            // d.date = new Date(Date.parse(d.start_time));
            d.date = parseTime(d.start_time); // format date and add as new property
            d.duration = +d.duration;
            // console.log(d); // delete me por favor
          });

      // Scale the range of the data
    x.domain(d3.extent(this.data, d => d.date));
    y.domain([
      0,
      d3.max(this.data, d => d.duration),
    ]); // dynamically check for max duration

      // Add the scatterplot
    svg
        .selectAll('dot')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.duration))
        .attr('fill', (d) => {
          switch (d.status) {
            case 'pass': return '#00ff00';
            case 'fail': return '#ff0000';
            case 'error' : return '#ffa500';
            default: return '#000';
          }
        });

      // Add the X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

      // text label for the x axis
    svg
      .append('text')
      .attr('transform', `translate(${width / 2} ,${height + margin.top + 10})`)
      .style('text-anchor', 'middle')
      .text('Time');

      // Add the Y Axis
    svg
        .append('g')
        .call(d3.axisLeft(y));

      // text label for the y axis
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Duration in milliseconds');

     // Add onclick handlers
    const circle = d3.selectAll('circle');

    circle._groups[0]
      .forEach(c => c.addEventListener('click', function () {
        if (d3.select(this)._groups[0][0].style.stroke.length !== 0) {
          d3.select(this)._groups[0][0].style.stroke = '';
        } else {
          d3.select(this)._groups[0][0].style.stroke = '#000';
          d3.select(this)._groups[0][0].style.strokeWidth = 4;
        }
      }));

    // Add legend
    const legend = svg
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', `translate(${width - 100}, ${5})`)
                    .selectAll('g')
                    .data(['pass', 'fail', 'error'])
                    .enter()
                    .append('g');

    legend.append('circle')
          .attr('cy', (d, i) => i * 13)
          .attr('r', () => 5)
          .attr('stroke', '#000')
          .attr('fill', (d) => {
            switch (d) {
              case 'pass': return '#00ff00';
              case 'fail': return '#ff0000';
              case 'error' : return '#ffa500';
              default: return '#000';
            }
          });

    legend.append('text')
          .attr('y', (d, i) => (i * 15) + 2)
          .attr('x', () => 10)
          .text(d => d);
  }

  render() {
    return (
      <div className="App">
        {this.chart()}
        <footer className="App-footer">
          <h6 className="App-title">powered by D3</h6>
        </footer>
      </div>
    );
  }
}

export default Scatterplot;
