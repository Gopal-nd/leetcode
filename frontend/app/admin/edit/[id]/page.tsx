'use client'
import EditProblemForm from '@/components/admin/EditProblem';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

const EditProblem = () => {
    const params = useParams();
    const id = params.id as string
    if(!id){
        return <div>id not found</div>
    }
   const {data, isLoading ,error} =  useQuery({
        queryKey: ['problem', id],
        queryFn:async () => {
          const res = await axiosInstance.get(`/problems/get-problem/${id}`)
            return res.data
        }
    })
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error</div>
  return (
    <div>
      <EditProblemForm problem={data.data} id={id} />
    </div>
  )
}

export default EditProblem