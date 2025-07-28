import { Problem } from '@/types/Problem'
import React from 'react'

const Hints = ({problem}:{problem:Problem}) => {
  return (
    <div className='p-4 '>
      <p className='text-lg '>{problem.hints}</p>
    </div>
  )
}

export default Hints