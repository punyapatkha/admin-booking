
import { Fragment, useState ,useEffect } from 'react'
import { Chart } from "chart.js/auto";

import {Bar,Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
// npm install @faker-js/faker --save-dev
import { faker } from '@faker-js/faker';
// https://react-chartjs-2.js.org/examples/area-chart/
// https://react-chartjs-2.js.org/examples/line-chart/

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data2 = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },{
        fill: true,
        label: 'Dataset 3',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        
      },
    ],
  };
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }

 
  return (
    <>
   
    hello  {/* line chart */}
      <h1 className="w-auto mx-auto mt-10 text-xl font-semibold capitalize ">line Chart</h1>
      <div className="w-auto h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-1/2 h-1/2 my-auto  shadow-xl bg-gray-100'>
        <Line options={options} data={data2} />
        <Bar
          data={data}
          // width={400}
          // height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
        </div>
      </div>
    </>
  )
}
