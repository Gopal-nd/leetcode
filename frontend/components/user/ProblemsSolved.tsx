
import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
// 
const ProblemsSolved = () => {
    const {data, isLoading,error} = useQuery({
        queryKey: ['user-stats'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/problems/user-stats`)
            return res.data.data
        }
    })

    console.log(data)
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error</div>
    console.log(data)
  return (
    <div className='flex border rounded-2xl p-4 flex-col w-full gap-2'>
        <h1 className='text-2xl font-bold'>Problems Solved</h1>
        <div className='flex flex-col gap-2 items-center m-2'>
            {
                <CircularProgress  count={data.count} total={data.total}/>
            }
        </div>
       {data && <div className='flex gap-2 items-center justify-evenly'>
            <p className='font-bold text-green-500 border p-4 rounded-2xl'>
                {/* {data?.difficultyCount["EASY"] ? data.difficultyCount.EASY : 0} EASY */}
            </p>
             <p className='font-bold text-yellow-500 border p-4 rounded-2xl'>
                {/* {data?.difficultyCount["MEDIUM"] ? data.difficultyCount.MEDIUM : 0} EASY */}
            </p>
             <p className='font-bold text-red-500 border p-4 rounded-2xl'>
                {/* {data?.difficultyCount["HARD"]? data.difficultyCount.HARD : 0} EASY */}
            </p>
        </div>}
    </div>
  )
}

export default ProblemsSolved



const CircularProgress = ({ count, total }: { count: number; total: number }) => {
  const percentage = total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {/* Outer Circle */}
      <div className="relative w-32 h-32">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#ef4444 ${percentage}%, #e5e7eb ${percentage}%)`,
          }}
        ></div>

        {/* Inner white circle */}
        <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
          <span className="text-gray-400 text-sm">{percentage}%</span>
        </div>
      </div>

      {/* Count/Total */}
      <p className="mt-4 text-green-500 text-lg font-bold">
        {count}/{total}
      </p>

      {/* Label */}
      <p className="text-sm text-gray-300">Problems Completed</p>

      {/* Remaining */}
      <p className="text-sm text-gray-500 mt-1">{total - count} problems remaining</p>
    </div>
  );
};

