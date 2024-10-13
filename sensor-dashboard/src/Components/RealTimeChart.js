import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const RealTimeChart = () => {
  const data = useSelector(state => state.sensorData);
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .attr('width', 600)
      .attr('height', 400)
      .style('background', '#2e2e2e')
      .style('margin-top', '50')
      .style('overflow', 'visible');

    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 600]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([400, 0]);

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));

    // Clear previous path
    svg.selectAll('*').remove();

    // Append new path
    svg.append('path')
      .datum(Object.values(data))
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add text elements for temperature and humidity
    svg.selectAll('.text')
      .data([data.temperature, data.humidity])
      .enter()
      .append('text')
      .attr('x', (d, i) => xScale(i * 50))
      .attr('y', d => yScale(d))
      .attr('fill', (d, i) => i === 1 && d > 70 ? 'black' : 'white') // Conditional color for humidity
      .attr('font-size', '14px')
      .attr('font-family', 'Arial')
      .attr('text-anchor', 'middle') // Center the text
      .text((d, i) => {
        if (d === undefined) return '';
        return i === 0 ? `Temperature: ${d.toFixed(2)}°C` : `Humidity: ${d.toFixed(2)}%`;
      });

  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default RealTimeChart;