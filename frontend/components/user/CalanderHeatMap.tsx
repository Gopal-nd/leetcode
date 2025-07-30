'use client'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'

export default function Heatmap() {
  const today = new Date(Date.now())

  const { data, isLoading } = useQuery({
    queryKey: ['heatmap'],
    queryFn: async () => {
      const response = await axiosInstance.get('/heatmap')
      return response.data.data
    },
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-4 m-5">
      <h1 className="text-xl font-bold mb-4">Submission Heatmap</h1>
      <CalendarHeatmap
        startDate={subDays(today, 365)}
        endDate={today}
        values={data}
        classForValue={(value) => {
         if (!value || value.count === 0) return 'color-empty'
    if (value.count >= 10) return 'color-green-4'
    if (value.count >= 5) return 'color-green-3'
    if (value.count >= 2) return 'color-green-2'
    return 'color-green-1'
        }}
        titleForValue={(value) => {
          if (!value || !value.date) return 'No submissions'
          return `${value.date}: ${value.count} submission(s)`
        }}
        showWeekdayLabels
      />
    </div>
  )
}
