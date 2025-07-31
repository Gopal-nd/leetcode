"use client";

import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Spinner from "@/components/Spinner";

const PlayLists = () => {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: async () => {
      const res = await axiosInstance.get("/playlists/");
      return res.data.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/playlists/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Playlist removed successfully");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete playlist");
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 ">
        Your Playlists
      </h1>

      {isLoading ? (
        <Spinner />
      ) : data?.length === 0 ? (
        <p className="text-center text-xl ">No playlists found.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {data?.map((playlist: any) => (
            <div
              key={playlist.id}
              className=" border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold  mb-2">
                  {playlist.name}
                </h2>
                <p className=" mb-3">{playlist.description}</p>
                <p className="text-sm ">
                  {playlist.problemInPlaylist.length} problems
                </p>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link href={`/dashboard/playlist/${playlist.id}`}>
                  <Button variant="outline">Explore</Button>
                </Link>
                <Button
                  onClick={() => mutate(playlist.id)}
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayLists;
