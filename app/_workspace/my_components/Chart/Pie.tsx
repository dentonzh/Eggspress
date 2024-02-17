'use client'

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import {
  Colors,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PieController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  ArcElement,
  PieController,
  DoughnutController,
  Title,
  Tooltip,
  Legend
);

type PieChartProps = {
  type?: string,
  title?: string,
  data?: Record<any, any>,
  baseOptions?: Record<any, any>,
  userOptions?: Record<any, any>,
  colors?: string[],
}


const PieChart = ({type, data, baseOptions, userOptions, colors}: PieChartProps) => {
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

  if ( baseOptions ) {
    baseOptions.plugins.legend.position = 'right' as const
  }


  const options = {
    ...baseOptions,
  };

  const fields = Object.keys(data[0])

  const labels = data.map((x: any) => x[fields[0]]);

  const parsedData = {
    labels,
    datasets: [{
      label: fields[1],
      data: data.map((x: any) => { return x[fields[1]]}),
      yAxisID: 'y',
      backgroundColor: colors,
      borderColor: colors,
    }]
  };
  

  return <div style={{minHeight: `${(userOptions?.height || 360) * (windowWidth > 640 ? 1 : 0.8)}px`}}>
    {type === 'doughnut' ?
      windowWidth > 0 && <Doughnut options={options as any} data={parsedData as any} />
      :
      windowWidth > 0 && <Pie options={options as any} data={parsedData as any} />
    }
  </div>
}

export default PieChart
