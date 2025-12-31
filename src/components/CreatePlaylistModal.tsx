import { useState } from "react";
import { usePlaylistStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Playlist } from "@/types";

interface CreatePlaylistModalProps {
  trigger: React.ReactNode;
}

export const CreatePlaylistModal = ({ trigger }: CreatePlaylistModalProps) => {
  const { addPlaylist } = usePlaylistStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const handleCreate = () => {
    if (playlistName.trim()) {
      const newPlaylist: Playlist = {
        id: `playlist-${Date.now()}`,
        name: playlistName.trim(),
        description: playlistDescription.trim() || undefined,
        tracks: [],
        createdAt: new Date(),
      };
      addPlaylist(newPlaylist);
      setIsDialogOpen(false);
      setPlaylistName("");
      setPlaylistDescription("");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPlaylistName("");
    setPlaylistDescription("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Playlist</DialogTitle>
          <DialogDescription>
            Give your playlist a name and optional description.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <label
              htmlFor="playlist-name"
              className="text-md font-medium text-zinc-600 "
            >
              Name
            </label>
            <Input
              id="playlist-name"
              placeholder="My Playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              autoFocus
              className="mt-2 text-md"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="h-14 px-6 text-md rounded-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!playlistName.trim()}
            className="bg-rose text-white hover:bg-rose/90 h-14 px-8 text-md rounded-full"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
