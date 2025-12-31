import { PlaylistView } from "@/components/PlaylistView";

interface PlaylistPageProps {
  playlistId: string;
}

export const PlaylistPage = ({ playlistId }: PlaylistPageProps) => {
  return <PlaylistView playlistId={playlistId} />;
};
