"use client";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const PlayLists = () => {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: async () => {
      const res = await axiosInstance.get("/playlists/");
      return res.data.data;
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/playlists/${id}`);
      return res.data.data;
    },
    onSuccess: (data) => {
      toast.success("Problem removed successfully");
      refetch();
      //    queryClient.invalidateQueries({ queryKey: ['playlist', id] })
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">PlayLists</h1>
      <div className="grid  gap-8">
        {data?.map((playlist: any) => (
          <div
            key={playlist.id}
            className="flex  border p-4 rounded-lg shadow hover:shadow-lg justify-between transition-shadow duration-200"
          >
            <div className="flex flex-col">

            <h1 className="text-2xl">{playlist.name}</h1>
            <p className="text-lg">{playlist.description}</p>
            <p className="text-sm">
              {playlist.problemInPlaylist.length} problems
            </p>
            <Link
              href={`/dashboard/playlist/${playlist.id}`}
              className="block mt-4 text-blue-500 hover:text-blue-700 underline"
              >
              <Button>Explore</Button>
            </Link>
                </div>
            <Button
              className="bg-red-500 hover:bg-red-700 "
              onClick={() => mutate(playlist.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayLists;
