'use client'

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Colors,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type ComboBarLineProps = {
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

const ComboBarLine = ({type, xTitle, xMin, xMax, xPrefix, xSuffix, primaryYTitle, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYTitle, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, data, baseOptions, userOptions, colors}: ComboBarLineProps) => {
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


  if ( !data ) {
    return <></>
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
      y1: {
        display: false,
        min: secondaryYMin || 0,
        position: 'right',
        beginAtZero: true,
        title: {
          display: secondaryYTitle ? true : false,
          text: secondaryYTitle,
        },
        ticks: {
          callback: (value: number) => {
            return `${secondaryYPrefix || ''}${value.toLocaleString()}${secondaryYSuffix || ''}`
          }
        },
      }
    }
  };

  
  const fields = Object.keys(data[0])

  const hasSecondary = fields.filter(x => x.includes('(secondary)')).length > 0

  if (hasSecondary) {
    options.scales.y1.display = true
  }

  const labels = data.map((x: any) => x[fields[0]]);

  

  const parsedData = {
    labels,
    datasets: fields.slice(1).map((field: string, index: number) => {
      return {
        label: field.replace('(secondary)', ''),
        data: data.map((x: any) => x[field]),
        type: type === 'line' ? 'line' : type === 'bar' ? 'bar' : (field.toLowerCase().includes('(secondary)') ? 'line' : 'bar'),
        yAxisID: field.toLowerCase().includes('(secondary)') ? 'y1' : 'y',
        backgroundColor: colors ? colors[index] : undefined,
        borderColor: colors ? colors[index] : undefined,
        pointRadius: userOptions?.pointRadius || 0,
        order: field.toLowerCase().includes('(secondary)') ? 0 : 1
      }
    })
  };

  return <div style={{position: 'relative', minHeight: `${(userOptions?.height || 360) * (windowWidth > 640 ? 1 : 0.8)}px`}}>
    {windowWidth > 0 &&
      <Bar options={options as any} data={parsedData as any} />
    }
  </div>
}

export default ComboBarLine
