import { FaPlay } from "react-icons/fa";
import { usePlayerStore } from "@/stores";
import type { Playlist } from "@/types";
import { formatTime } from "@/utils";
import { useNavigation } from "@/contexts/NavigationContext";

interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: () => void;
  showPlayButton?: boolean;
  imageHeight?: "h-40" | "h-50";
  variant?: "default" | "compact";
}

export const PlaylistCard = ({
  playlist,
  onClick,
  showPlayButton = true,
  imageHeight = "h-50",
  variant = "default",
}: PlaylistCardProps) => {
  const { setQueue, setCurrentTrack, play } = usePlayerStore();
  const { navigate } = useNavigation();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks, 0);
      setCurrentTrack(playlist.tracks[0]);
      play();
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`playlist-${playlist.id}`);
    }
  };

  if (variant === "compact") {
    return (
      <div
        onClick={handleCardClick}
        className="group relative cursor-pointer transition-colors"
      >
        <div
          className={`w-full aspect-square rounded-2xl shadow-2xl shadow-zinc-200 overflow-hidden border border-zinc-100 relative`}
        >
          {playlist.coverArt ? (
            <img
              src={playlist.coverArt}
              alt={playlist.name}
              className="w-full h-full object-cover "
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.classList.add("bg-rose");
                  target.parentElement.innerHTML =
                    '<span class="text-white text-4xl font-bold">♪</span>';
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-rose flex items-center justify-center">
              <span className="text-white text-4xl font-bold">♪</span>
            </div>
          )}
        </div>
        <div className="w-full py-6">
          <h3 className="text-zinc-900 font-semibold truncate mb-1">
            {playlist.name}
          </h3>
          <p className="text-zinc-900 text-sm truncate">
            {playlist.tracks.length} songs
          </p>
          {showPlayButton && (
            <button
              onClick={handlePlay}
              className="absolute bottom-4 right-0 w-12 h-12 bg-rose rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border border-zinc-100 hover:bg-[oklch(60%_0.246_16.439)]"
            >
              <FaPlay className="size-3 text-white ml-0.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  const totalDuration = playlist.tracks.reduce(
    (sum, track) => sum + track.duration,
    0
  );
  const uniqueArtists = new Set(playlist.tracks.map((track) => track.artist));
  const artistCount = uniqueArtists.size;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white border border-zinc-100 rounded-2xl cursor-pointer"
    >
      <div
        className={`w-full ${imageHeight} rounded-t-xl overflow-hidden border border-zinc-100 relative`}
      >
        {playlist.coverArt ? (
          <img
            src={playlist.coverArt}
            alt={playlist.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              if (target.parentElement) {
                target.parentElement.classList.add("bg-rose");
                target.parentElement.innerHTML =
                  '<span class="text-white text-4xl font-bold">♪</span>';
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-rose flex items-center justify-center">
            <span className="text-white text-4xl font-bold">♪</span>
          </div>
        )}
        {showPlayButton && (
          <button
            onClick={handlePlay}
            className="absolute bottom-3 right-3 w-12 h-12 bg-rose rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg border border-zinc-100 hover:bg-[oklch(60%_0.246_16.439)]"
          >
            <FaPlay className="size-3 text-white ml-0.5" />
          </button>
        )}
      </div>
      <div className="w-full p-4">
        <h3 className="text-zinc-900 font-semibold truncate mb-1.5">
          {playlist.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>
            {playlist.tracks.length}{" "}
            {playlist.tracks.length === 1 ? "song" : "songs"}
          </span>
          <span>•</span>
          <span>{formatTime(totalDuration)}</span>
          {artistCount > 0 && (
            <>
              <span>•</span>
              <span>
                {artistCount} {artistCount === 1 ? "artist" : "artists"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
