// react-chartjs-2, chart.js, chartjs-plugin-deferred, csvtojson

import ComboBarLine from './Chart/ComboBarLine'
import Bubble from './Chart/Bubble'
import Pie from './Chart/Pie'
import { getUserDataRecursively } from '@/app/utils'
import { IncomingMessage } from 'http'
import 'chartjs-plugin-deferred'

const fs = require('fs-extra')
const https = require('node:https')
const csv = require('csvtojson')
const palettes = require('./Chart/palettes.json')

/*

How to use this custom component:

Add this file and the accompanying folder "Chart" to the `my_components` folder of your workspace.

For usage instructions, please read the documentation at https://eggspress.vercel.app/blog/eggspress-chart

*/

type ChartProps = {
  type?: string
  title?: string
  filename?: string
  source?: string
  xTitle?: string
  xMin?: number
  xMax?: number
  xPrefix?: string
  xSuffix?: string
  primaryYTitle?: string
  primaryYMin?: number
  primaryYMax?: number
  primaryYPrefix?: string
  primaryYSuffix?: string
  secondaryYTitle?: string
  secondaryYMin?: number
  secondaryYMax?: number
  secondaryYPrefix?: string
  secondaryYSuffix?: string
  data?: Record<any, any>
  columns?: number[]
  rowStart?: number
  rowEnd?: number
  baseOptions?: Record<any, any>
  userOptions?: Record<any, any>
  colors?: string[]
  palette?: PaletteColorKeys
  height?: number
  orientation?: string
  pointRadius?: number
  children?: React.ReactNode
}

type PaletteColorKeys = keyof typeof palettes

const renderComponent = ({
  type,
  xTitle,
  xMin,
  xMax,
  xPrefix,
  xSuffix,
  primaryYTitle,
  primaryYMin,
  primaryYMax,
  primaryYPrefix,
  primaryYSuffix,
  secondaryYTitle,
  secondaryYMin,
  secondaryYMax,
  secondaryYPrefix,
  secondaryYSuffix,
  data,
  userOptions,
  baseOptions,
  colors,
}: ChartProps) => {
  switch (type) {
    case undefined:
    case '':
    case 'bar':
    case 'line':
    case 'combo':
      return (
        <ComboBarLine
          type={type}
          xTitle={xTitle}
          xMin={xMin}
          xMax={xMax}
          xPrefix={xPrefix}
          xSuffix={xSuffix}
          primaryYTitle={primaryYTitle}
          primaryYMin={primaryYMin}
          primaryYMax={primaryYMax}
          primaryYPrefix={primaryYPrefix}
          primaryYSuffix={primaryYSuffix}
          secondaryYTitle={secondaryYTitle}
          secondaryYMin={secondaryYMin}
          secondaryYMax={secondaryYMax}
          secondaryYPrefix={secondaryYPrefix}
          secondaryYSuffix={secondaryYSuffix}
          data={data}
          userOptions={userOptions}
          baseOptions={baseOptions}
          colors={colors}
        />
      )
    case 'scatter':
      return (
        <Bubble
          type={type}
          xTitle={xTitle}
          xMin={xMin}
          xMax={xMax}
          xPrefix={xPrefix}
          xSuffix={xSuffix}
          primaryYTitle={primaryYTitle}
          primaryYMin={primaryYMin}
          primaryYMax={primaryYMax}
          primaryYPrefix={primaryYPrefix}
          primaryYSuffix={primaryYSuffix}
          secondaryYTitle={secondaryYTitle}
          secondaryYMin={secondaryYMin}
          secondaryYMax={secondaryYMax}
          secondaryYPrefix={secondaryYPrefix}
          secondaryYSuffix={secondaryYSuffix}
          data={data}
          userOptions={userOptions}
          baseOptions={baseOptions}
          colors={colors}
        />
      )
    case 'bubble':
      return (
        <Bubble
          type={type}
          xTitle={xTitle}
          xMin={xMin}
          xMax={xMax}
          xPrefix={xPrefix}
          xSuffix={xSuffix}
          primaryYTitle={primaryYTitle}
          primaryYMin={primaryYMin}
          primaryYMax={primaryYMax}
          primaryYPrefix={primaryYPrefix}
          primaryYSuffix={primaryYSuffix}
          secondaryYTitle={secondaryYTitle}
          secondaryYMin={secondaryYMin}
          secondaryYMax={secondaryYMax}
          secondaryYPrefix={secondaryYPrefix}
          secondaryYSuffix={secondaryYSuffix}
          data={data}
          userOptions={userOptions}
          baseOptions={baseOptions}
          colors={colors}
        />
      )
    case 'doughnut':
    case 'pie':
      return <Pie type={type} data={data} userOptions={userOptions} baseOptions={baseOptions} colors={colors} />
  }
}

const buildPalette = (palette: PaletteColorKeys, n: number, loop: boolean) => {
  const colorSet = palettes[palette].colorSet
  const isSequential = palettes[palette].isSequential
  const colors: string[] = []

  if (n >= colorSet.length || loop || !isSequential) {
    for (let i = 0; i < colorSet.length; i++) {
      colors.push(colorSet[i % colorSet.length])
    }
  } else {
    for (
      let i = Math.floor((colorSet.length - 1) / n);
      i < colorSet.length;
      i += Math.floor((colorSet.length - 1) / n)
    ) {
      colors.push(colorSet[i])
    }
  }

  return colors
}

const fetchDataFromSheets = (filename: string) => {
  return new Promise((resolve, reject) => {
    const url = `https://docs.google.com/spreadsheets/d/${filename}/export?format=csv`
    let sheetsData = ''

    https
      .get(url, (res: IncomingMessage) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk: Buffer) => {
          sheetsData += chunk.toString()
        })

        res.on('end', async () => {
          if (sheetsData.includes('Temporary Redirect')) {
            const redirectUrlRegex = /HREF="([^"]+)/
            const match = sheetsData.match(redirectUrlRegex)

            if (match && match[1]) {
              const redirectUrl = match[1]

              sheetsData = ''
              https.get(redirectUrl, async (res: IncomingMessage) => {
                res.on('data', (chunk: Buffer) => {
                  sheetsData += chunk.toString()
                })

                res.on('end', async () => {
                  resolve(await csv().fromString(sheetsData))
                })
              })
            }
          } else {
            resolve(await csv().fromString(sheetsData))
          }
        })
      })
      .on('error', (e: string) => {
        reject(e)
      })
  })
}

const Chart = async ({
  type,
  title,
  filename,
  source,
  columns,
  rowStart,
  rowEnd,
  xTitle,
  xMin,
  xMax,
  xPrefix,
  xSuffix,
  primaryYTitle,
  primaryYMin,
  primaryYMax,
  primaryYPrefix,
  primaryYSuffix,
  secondaryYTitle,
  secondaryYMin,
  secondaryYMax,
  secondaryYPrefix,
  secondaryYSuffix,
  palette,
  height,
  orientation,
  pointRadius,
  children,
}: ChartProps) => {
  if (!filename) {
    console.log(
      `      Info: Chart ${type ? `of type ${type}` : ''} ${title ? `with title "${title}"` : ''} is missing the "filename" property`
    )
    return <></>
  }

  let data

  try {
    if (source === 'google') {
      data = await fetchDataFromSheets(filename)
    } else {
      data = await csv().fromFile(await getUserDataRecursively(filename))
    }
  } catch (e) {
    console.log(`      > Error while loading Chart data: ${e}`)
    return <></>
  }

  if (!data || !data.length) {
    console.log(
      `      Info: Chart ${filename ? `with filename ${filename}` : ''} ${type ? `of type ${type}` : ''} ${title ? `with title "${title}"` : ''} is missing data (it could be empty or misformatted)`
    )
    return <></>
  }

  const colors = palette
    ? buildPalette(
        palette,
        columns ? columns.length - 1 : Object.keys(data[0]).length - 1,
        type === 'pie' || type === 'doughnut'
      )
    : palettes['Paired12']

  let filteredData = data

  if (columns) {
    try {
      const fields = Object.keys(data[0])
      filteredData = data.slice(rowStart === undefined ? 1 : rowStart, rowEnd).map((row: any) => {
        const filteredRow: { [key: string]: any } = {}
        columns.forEach((colNumber: number) => {
          filteredRow[fields[colNumber]] = row[fields[colNumber]]
        })
        return filteredRow
      })
    } catch {}
  }

  const baseOptions = {
    indexAxis: orientation === 'horizontal' ? 'y' : 'x',
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      deferred: {
        xOffset: 150,
        yOffset: '50%',
        delay: 500,
      },
      legend: {
        position: 'bottom' as const,
        display: type === 'bubble' || type === 'scatter' ? false : true,
      },
      title: {
        display: true,
        text: title,
        padding: {
          bottom: 30,
        },
      },
    },
    stacked: false,
  }

  const userOptions = {
    pointRadius: pointRadius,
    height: height,
  }

  const dataToPass = { data: filteredData }

  return (
    <div className={children ? 'mb-12' : 'mb-3'}>
      <div
        className={`${children ? 'mb-6' : ''} 'duration-100 rounded bg-white bg-opacity-90 dark:bg-gray-200 dark:bg-opacity-90'`}
      >
        <div className="px-1 py-2 md:px-3 md:py-6">
          {renderComponent({
            ...dataToPass,
            type,
            title,
            xTitle,
            xMin,
            xMax,
            xPrefix,
            xSuffix,
            primaryYTitle,
            primaryYMin,
            primaryYMax,
            primaryYPrefix,
            primaryYSuffix,
            secondaryYTitle,
            secondaryYMin,
            secondaryYMax,
            secondaryYPrefix,
            secondaryYSuffix,
            baseOptions,
            userOptions,
            colors,
          })}
        </div>
      </div>
      <div className="text-sm leading-6">{children}</div>
    </div>
  )
}

export default Chart
