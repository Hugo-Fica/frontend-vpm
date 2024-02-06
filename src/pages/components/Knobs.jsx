import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { generateData } from '../../helpers/datas/data'
import { useSettingStore } from '../../store/setting-store'
export const Knobs = ({ transform, valueKnobs, setValueKnobs }) => {
  const period = useSettingStore((state) => state.period)
  const { result } = generateData(period)
  const svgRef = useRef(null)
  const [data, setData] = useState(transform || result)
  useEffect(() => {
    const svg = d3.select(svgRef.current)

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([50, 500])

    const yScale = d3.scaleLinear().domain([0, 25]).range([200, 10])

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveLinear)

    const circles = svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('id', (d, i) => `circle-${i}`)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'blue')
      .call(drag)

    const inputs = svg
      .selectAll('foreignObject')
      .data(data)
      .enter()
      .append('foreignObject')
      .attr('x', (d) => xScale(d.x) - 15)
      .attr('y', 210)
      .attr('width', 30)
      .attr('height', 20)
      .append('xhtml:input')
      .attr('id', (d, i) => `input-${i}`)
      .attr('type', 'number')
      .attr('value', (d) => d.y)
      .on('input', handleInputChange)

    const yAxisScale = d3.scaleLinear().domain([0, 25]).range([200, 10])
    const yAxis = d3
      .axisLeft(yAxisScale)
      .ticks(10)
      .tickSize(-500)
      .tickFormat((d) => d)

    svg.append('g').call(yAxis).attr('transform', 'translate(30,0)')

    function drag(selection) {
      const dragHandler = d3
        .drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded)

      selection.call(dragHandler)
    }

    function dragStarted(event, d) {
      d3.select(this).raise().classed('active', true)
    }

    function dragged(event, d) {
      if (event.y !== 0) {
        const newY = Math.round(yScale.invert(event.y))
        const newCappedY = newY < 0 ? 0 : newY
        d.y = newCappedY
        d3.select(this).attr('cy', yScale(newCappedY))
        updateInputValue(d, newCappedY)
        updateData()
      }
    }

    function dragEnded(event, d) {
      d3.select(this).classed('active', false)
    }

    function handleInputChange(event, d) {
      const inputId = event.target.id
      const inputIndex = inputId.split('-')[1]
      const newValue = +event.target.value
      const circle = svg.select(`#circle-${inputIndex}`)
      const newY = yScale(newValue)
      const newCappedY = newValue < 0 ? 0 : newValue
      d.y = newCappedY
      circle.attr('cy', newY)
      updateInputValue(d, newCappedY)
      updateData()
    }

    function updateInputValue(d, newValue) {
      const input = svg.select(`#input-${data.indexOf(d)}`)
      input.property('value', newValue)
    }
  }, [])

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([50, 500])

    const yScale = d3.scaleLinear().domain([0, 25]).range([200, 10])

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveLinear)

    svg.select('path').remove()

    svg
      .append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
  }, [data])

  function updateData() {
    setData([...data])
    setValueKnobs([...data])
  }
  return (
    <div
      style={{
        padding: 10,
        border: 'solid #000 1px',
      }}
    >
      <svg ref={svgRef} width={550} height={230}></svg>
    </div>
  )
}
