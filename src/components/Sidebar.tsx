import { usePlaylistStore, usePlayerStore } from "@/stores";
import { usePreferencesStore } from "@/stores";
import { TbSmartHome } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { LuLibrary } from "react-icons/lu";
import { PiPlaylist } from "react-icons/pi";
import { IoAdd } from "react-icons/io5";
import { CreatePlaylistModal } from "./CreatePlaylistModal";
import { LiaVolumeUpSolid } from "react-icons/lia";

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Sidebar = ({ onNavigate, currentView }: SidebarProps) => {
  const { playlists } = usePlaylistStore();
  const { sidebarCollapsed } = usePreferencesStore();
  const { currentTrack } = usePlayerStore();

  const mainNavItems = [
    { id: "home", label: "Home", icon: TbSmartHome },
    { id: "search", label: "Search", icon: FiSearch },
    { id: "library", label: "Your Library", icon: LuLibrary },
  ];

  if (sidebarCollapsed) {
    return (
      <div className="w-20 bg-white border-r border-zinc-100 flex flex-col items-center py-4 space-y-4">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-3 rounded-xl transition-all ${
                currentView === item.id
                  ? "bg-white/40 text-zinc-900"
                  : "text-zinc-900 hover:text-zinc-900 hover:bg-white/30"
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-zinc-100 flex flex-col h-full">
      {/* Main Navigation */}
      <div className="p-6 border-b border-zinc-100">
        <div className="space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left ${
                  currentView === item.id
                    ? "bg-white/50 text-zinc-900 font-semibold"
                    : "text-zinc-900 hover:text-zinc-900 hover:bg-white/30"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Playlists Section */}
      <div className="mt-5 flex-1 overflow-y-auto px-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-4 px-4 py-2 rounded-xl text-zinc-900 hover:text-zinc-900 hover:bg-white/30 transition-all">
            <PiPlaylist className="size-6" />
            <span className="text-md">Playlists</span>
          </button>
          <CreatePlaylistModal
            trigger={
              <button
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-white/30 transition-all"
                title="Create playlist"
              >
                <IoAdd className="size-6" />
              </button>
            }
          />
        </div>

        <div className="mt-5 space-y-3">
          {playlists.map((playlist) => {
            const isCurrentTrackInPlaylist =
              currentTrack &&
              playlist.tracks.some((track) => track.id === currentTrack.id);

            return (
              <button
                key={playlist.id}
                onClick={() => onNavigate(`playlist-${playlist.id}`)}
                className={`w-full flex items-center gap-3 px-4 relative py-2 rounded-xl transition-all text-left truncate ${
                  currentView === `playlist-${playlist.id}`
                    ? "bg-white/40 text-zinc-900"
                    : "text-zinc-900 hover:text-zinc-900 hover:bg-white/30"
                }`}
              >
                {isCurrentTrackInPlaylist && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-4">
                    <LiaVolumeUpSolid className="size-5 text-rose-500" />
                  </div>
                )}
                <div className="size-10 text-white bg-rose rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={playlist.coverArt}
                    alt={playlist.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-col gao-y-2">
                  <h1
                    className={`text-md truncate ${
                      isCurrentTrackInPlaylist ? "text-rose-500" : ""
                    }`}
                  >
                    {playlist.name}
                  </h1>
                  <small className="text-zinc-500 text-xs">
                    {playlist.tracks.length} songs
                  </small>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
