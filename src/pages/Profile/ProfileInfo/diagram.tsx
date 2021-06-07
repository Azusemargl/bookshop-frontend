import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export const Diagram: React.FC<Props> = React.memo(({ categories, orderCounter }) => {
   return (
      <Doughnut
         type='doughnut'
         data={{
            labels: categories,
            datasets: [{
               label: 'My First Dataset',
               data: orderCounter,
               backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
               ],
               hoverOffset: 2,
            }]
         }}
         height={1}
         width={1}
         options={{
            maintainAspectRatio: false
         }}
      />
   )
})

// Types
type Props = {
   categories: Array<string>
   orderCounter: Array<number>
}
