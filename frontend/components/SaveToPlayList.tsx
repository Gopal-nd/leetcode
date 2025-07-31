import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { axiosInstance } from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Bookmark, Plus } from "lucide-react"
import { use, useState } from "react"
import { toast } from "sonner"

export default function SaveToPlayListModel({id}:{id:string}) {
    const [problemId, setproblemId] = useState('')
    const { data, isLoading, error } = useQuery({
        queryKey: ['playlist'],
        queryFn: async () => {
            const res = await axiosInstance.get('/playlists/')
            return res.data.data
        }
    })
    // console.log(data)
    // console.log("Id", id)
    // console.log("PlayListId", problemId)


    const [open, setOpen] = useState(false)
    const { mutate,isPending } = useMutation({
        mutationFn: async () => {
            if (!problemId ) {
                return
            }
            const res = await axiosInstance.post(`/playlists/${problemId}/add-problem`, {
                problemId:[ id]
            })
            return res.data
        },
        onSuccess: (data) => {

            toast.success(data.message)
            setOpen(!open)
        },
        onError: (data) => {
            toast.error(data.message||'Error creating playlist')
        }
    })

  return (
   <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
           <Button variant="outline" onClick={() => setOpen(true)}>
                        <Bookmark className="mr-2 h-4 w-4" /> SaveToPlaylist
                    </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save to playlist</DialogTitle>
          </DialogHeader>
          <Select onValueChange={setproblemId} value={problemId} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Playlist" />
                  </SelectTrigger>
                <SelectContent>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error: {error.message}</div>}
                 {data?.map((playlist:any) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </SelectItem>
                 ))}
                </SelectContent>
              </Select>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={(e) => {e.preventDefault(); mutate()}} disabled={isPending}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
