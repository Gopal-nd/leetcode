'use client'
import { useParams } from 'next/navigation';
import React from 'react'

const ProblemPage = () => {
    const params = useParams();
    const id = params.id
    console.log(id)
  return (
    <div className='flex flex-col'>
        <div className='h-10 p-1 flex items-center justify-between'>
            <div>
                <h1>Problem {id}</h1>
            </div>
            <div>
                clock component
            </div>
            <div className='flex gap-2'>
                <div>submissions</div>
                <div> share</div>
            </div>
        </div>
        <div className='flex-1'>

        </div>
    </div>
  )
}

export default ProblemPage