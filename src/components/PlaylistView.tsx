import { usePlaylistStore, usePlayerStore } from "@/stores";
import { TrackList } from "./TrackList";
import { FaPlay } from "react-icons/fa";
import { formatTime } from "@/utils";

interface PlaylistViewProps {
  playlistId: string;
}

export const PlaylistView = ({ playlistId }: PlaylistViewProps) => {
  const { playlists } = usePlaylistStore();
  const { setQueue, setCurrentTrack, play } = usePlayerStore();

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-zinc-500">Playlist not found</p>
      </div>
    );
  }

  const totalDuration = playlist.tracks.reduce(
    (sum, track) => sum + track.duration,
    0
  );

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks, 0);
      setCurrentTrack(playlist.tracks[0]);
      play();
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F7]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 w-full bg-linear-to-b from-purple-100 to-transparent relative overflow-hidden">
        {/* OVERLAY IMAGE  */}

        <div className="flex items-end gap-6">
          <div className="w-56 h-56 rounded-2xl border border-zinc-100 flex-shrink-0 overflow-hidden relative">
            {playlist.coverArt ? (
              <img
                src={playlist.coverArt}
                alt={playlist.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to rose background if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  if (target.parentElement) {
                    target.parentElement.classList.add("bg-rose");
                    target.parentElement.innerHTML =
                      '<span class="text-white text-6xl font-bold">♪</span>';
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-rose flex items-center justify-center">
                <span className="text-white text-6xl font-bold">♪</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-900 font-semibold mb-2">Playlist</p>
            <h1 className="text-6xl font-bold text-zinc-900 mb-4 truncate">
              {playlist.name}
            </h1>
            {playlist.description && (
              <p className="text-zinc-900 text-sm mb-2">
                {playlist.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-zinc-900">
              <span className="font-semibold text-zinc-900">Demo User</span>
              <span>•</span>
              <span>{playlist.tracks.length} songs</span>
              <span>•</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="px-6 py-6">
        <button
          onClick={handlePlayAll}
          className="px-6 py-3 bg-rose text-white rounded-full font-semibold flex items-center gap-3 transition-all hover:scale-105 border border-zinc-100 hover:bg-[oklch(60%_0.246_16.439)]"
        >
          <FaPlay className="size-3" />
          <span>Play</span>
        </button>
      </div>

      {/* Track List Header */}
      <div className="px-6 py-2 border-b border-white/20">
        <div className="grid grid-cols-[32px_1fr_1fr_60px] md:grid-cols-[32px_1fr_1fr_1fr_60px] gap-4 px-4">
          <div className="text-center text-zinc-900 text-sm font-semibold">
            #
          </div>
          <div className="text-zinc-900 text-sm font-semibold">Title</div>
          <div className="hidden md:block text-zinc-900 text-sm font-semibold">
            Album
          </div>
          <div className="text-right text-zinc-900 text-sm font-semibold">
            Duration
          </div>
        </div>
      </div>

      {/* Track List */}
      <TrackList tracks={playlist.tracks} />
    </div>
  );
};
