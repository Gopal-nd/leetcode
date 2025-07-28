'use client'
import { useParams } from 'next/navigation';
import React from 'react'

const EditProblem = () => {
    const params = useParams();
    const id = params.id
  return (
    <div>Id : {id}</div>
  )
}

export default EditProblem