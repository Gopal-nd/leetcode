'use client'
import PlayListProblems from '@/components/PlaylistListProblems'
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axios'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const PlaylistId = () => {
    const params = useParams()
    const id = params.id as string
    const queryClient = new QueryClient()
    const {data,refetch, isLoading, error} = useQuery({
        queryKey: ['playlist',id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/playlists/${id}`)
            return res.data.data
        }
    })
        const {data:userSolvedProblem, isLoading: userSolvedProblemLoading, error: userSolvedProblemError} = useQuery({
        queryKey: ["usersolvedproblem",id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/problems/get-solved-problems`)
            // console.log(res.data)
            return res.data.data
        }
    })

     const { mutate } = useMutation({
        mutationFn: async (problemId: string) => {
          const res = await axiosInstance.post(`/playlists/${id}/remove-problem`, {
            problemId: [problemId],
          });
          return res.data.data;
        },
        onSuccess: (data) => {
          toast.success("Problem removed successfully");
          refetch();
           queryClient.invalidateQueries({ queryKey: ['playlist', id] })


        },
        onError: (data) => {
          toast.error(data.message);
        },
      });
    if(userSolvedProblemLoading) return <p>Loading...</p>
    const problems = data?.problemInPlaylist.map((problem: any) => problem.problem)
    console.log( "userSolvedProblem",userSolvedProblem)
  return (
    <div>
        <div className=' flex '>
            <div className='flex flex-col border p-4 rounded-lg shadow hover:shadow-lg w-full transition-shadow duration-200'>
                <h1 className='text-2xl'>{data?.name}</h1>
                <p className='text-lg'>{data?.description}</p>
                <div className='flex justify-between items-center'>

                <p className='text-sm'>{data?.problemInPlaylist.length} problems</p>
                <p> created on : {data?.createdAt.split('T')[0]}</p>
                </div>
            </div>
        </div>
        <div>
            {
              problems &&  <PlayListProblems problems={problems} mutate={mutate} />
            }
        </div>
    </div>
  )
}

export default PlaylistId