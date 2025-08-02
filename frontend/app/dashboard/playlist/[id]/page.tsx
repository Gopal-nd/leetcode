"use client";
import PlayListProblems from "@/components/PlaylistListProblems";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/user/Skeleton";
import { axiosInstance } from "@/lib/axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PlaylistId = () => {
  const params = useParams();
  const id = params.id as string;
  const queryClient = new QueryClient();
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["playlist", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/playlists/${id}`);
      return res.data.data;
    },
  });
  const {
    data: userSolvedProblem,
    isLoading: userSolvedProblemLoading,
    error: userSolvedProblemError,
  } = useQuery({
    queryKey: ["usersolvedproblem", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/problems/get-solved-problems`);

      return res.data.data;
    },
  });

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
      queryClient.invalidateQueries({ queryKey: ["playlist", id] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  const problems = data?.problemInPlaylist.map(
    (problem: any) => problem.problem
  );
  return (
    <div>
      {userSolvedProblemLoading && <Spinner />
      }
     {!userSolvedProblemLoading && <div className="flex justify-center px-4">
        <div className="w-full  flex flex-col border  p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 my-2">{data?.name}</h1>
          <p className="text-base  mb-4">{data?.description}</p>

          <div className="flex justify-between text-sm ">
            <p>{data?.problemInPlaylist.length} problems</p>
            <p>Created on: {data?.createdAt?.split("T")[0]}</p>
          </div>
        </div>
      </div>}

      <div>
        {problems && !userSolvedProblemLoading && <PlayListProblems problems={problems} mutate={mutate} />}
      </div>
    </div>
  );
};

export default PlaylistId;
