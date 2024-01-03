import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto'
import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { useGlobalStorage } from '../state/globalStorage'
import { useNavigate } from 'react-router-dom'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ChartLayer() {
  const graphList = ['Line', 'Bar', 'Area']
  let converted_array = []

  let aggregatedSteps = useGlobalStorage((state) => state.aggregatedSteps)
  const [id, setId] = useState([])
  const [data, setData] = useState([])
  const [graphType, setGraphType] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(aggregatedSteps).length !== 0) {
      console.log(`Successful`)
      if (converted_array.length === 0)
        for (let item in aggregatedSteps) {
          let obj_time = {
            "id": parseInt(item, 10),
            "steps": aggregatedSteps[item]
          }
          converted_array.push(obj_time)
        }
      console.log(converted_array)
      setId(converted_array.map((data) => data.id))
      setData(converted_array.map((data) => data.steps))
      console.log(id)
      console.log(data)
    }
  }, [])

  return <div className="text-slate-50 w-full">
    <p className='w-full flex justify-center font-medium text-2xl'>Steps Analysis</p>
    <div className='rounded-md mt-6 px-10 py-4'>
      <Line
        key="graph"
        data={{
          labels: id,
          datasets: [
            {
              label: 'Steps per day',
              data: data,
              borderColor: 'rgb(255, 91, 81)',
              backgroundColor: 'rgba(255, 91, 70, 0.5)',
              borderWidth: 2,
            }
          ]
        }}
        options={{
          responsive: true,
          chart: {
            height: 400,
          },
          scales: {
            x: {
              grid: {
                color: "#C1C1C1"
              }
            },
            y: {
              grid: {
                color: "#C1C1C1"
              }
            }
          }
        }}
      />
    </div>
    <button onClick={() => navigate("/game/chart")}>Reload</button>
  </div>
}