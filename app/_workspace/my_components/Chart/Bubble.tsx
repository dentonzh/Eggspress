'use client'

import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';

import {
  Colors,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type BubbleChartProps = {
  type?: string,
  title?: string,
  xTitle?: string,
  xMin?: number,
  xMax?: number,
  xPrefix?: string,
  xSuffix?: string,
  primaryYTitle?: string,
  primaryYMin?: number,
  primaryYMax?: number,
  primaryYPrefix?: string,
  primaryYSuffix?: string,
  secondaryYTitle?: string,
  secondaryYMin?: number,
  secondaryYMax?: number,
  secondaryYPrefix?: string,
  secondaryYSuffix?: string,
  data?: Record<any, any>,
  baseOptions?: Record<any, any>,
  userOptions?: Record<any, any>,
  colors?: string[],
}


const BubbleChart = ({type, xTitle, xMin, xMax, xPrefix, xSuffix, primaryYTitle, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYTitle, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, data, baseOptions, userOptions, colors}: BubbleChartProps) => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowWidth(window.innerWidth)
    }
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if ( baseOptions ) {
    baseOptions.plugins.tooltip = {
      enabled: true,
      usePointStyle: true,
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const labels = [
            `${fields[1]}: ${parseFloat(tooltipItem.raw.x).toLocaleString()}`,
            `${fields[2]}: ${parseFloat(tooltipItem.raw.y).toLocaleString()}`,
            `${fields[3]}: ${parseFloat(tooltipItem.raw.rOriginal).toLocaleString()}`,
          ].slice(0, type === 'scatter' ? 2 : 3)
          return labels
        }
      }
    }
  }

  const options = {
    ...baseOptions,
    scales: {
      x: {
        min: xMin,
        max: xMax,
        title: {
          display: xTitle ? true : false,
          text: xTitle
        },
        ticks: {
          callback: (value: number) => {
            return `${xPrefix || ''}${value.toLocaleString()}${xSuffix || ''}`
          }
        },
      },
      y: {
        min: primaryYMin || 0,
        max: primaryYMax,
        display: true,
        title: {
          display: primaryYTitle ? true : false,
          text: primaryYTitle
        },
        ticks: {
          callback: (value: number) => {
            return `${primaryYPrefix || ''}${value.toLocaleString()}${primaryYSuffix || ''}`
          }
        },
      },
    }
  };

  if ( !data ) {
    return <></>
  }

  const normalizeRadius = (val: number, minRadius: number, maxRadius: number) => {
    const normalizedMin = 1
    const normalizedMax = 20
    return (Math.log(val - minRadius) / Math.log(maxRadius - minRadius)) * (normalizedMax - normalizedMin)
    
  }
  
  const fields = Object.keys(data[0])

  const labels = data.map((x: any) => x[fields[0]]);

  const radii = data.map((x: any) => {try {return parseInt(x[fields[3]])} catch {}})
  const minRadius = Math.min(...radii)
  const maxRadius = Math.max(...radii)

  const parsedData = {
    labels,
    datasets: [{
      label: fields[3],
      data: data.map((x: any) => { return {'x': x[fields[1]], 'y': x[fields[2]], 'r': type === 'scatter' ? 3 : normalizeRadius(x[fields[3]], minRadius, maxRadius), 'rOriginal': x[fields[3]] }}),
      pointRadius: 2,
      yAxisID: 'y',
      backgroundColor: colors ? `${colors[0]}aa` : undefined,
      borderColor: colors ? `${colors[1]}aa` : undefined,
    }]
  };

  return <div style={{minHeight: `${(userOptions?.height || 360) * (windowWidth > 640 ? 1 : 0.8)}px`}}>
    {windowWidth > 0 &&
      <Bubble options={options as any} data={parsedData as any} />
    }
  </div>
}

export default BubbleChart
