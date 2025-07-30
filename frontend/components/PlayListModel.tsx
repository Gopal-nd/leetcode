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
import { axiosInstance } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { use, useState } from "react"
import { toast } from "sonner"

export default function PlaylistModel() {
    const [playlist, setPlaylist] = useState({
        name: '',
        description: ''
    })
    const [open, setOpen] = useState(false)
    const { mutate,isPending } = useMutation({
        mutationFn: async () => {
            if (!playlist.name ) {
                return
            }
            const res = await axiosInstance.post('/playlists/create-playlist', playlist)
            return res.data
        },
        onSuccess: () => {
            setPlaylist({
                name: '',
                description: ''
            })
            toast.success('Playlist created successfully')
            setOpen(!open)
        },
        onError: () => {
            toast.error('Error creating playlist')
        }
    })

  return (
   <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
           <Button variant="outline" onClick={() => setOpen(true)}>
                        <Plus /> PlayList
                    </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create playlist</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" required value={playlist.name} onChange={(e) => setPlaylist({...playlist, name: e.target.value})} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input id="username-1" name="descriptions" value={playlist.description} onChange={(e) => setPlaylist({...playlist, description: e.target.value})}  />
            </div>
          </div>
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
