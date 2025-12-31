import { LuPanelRightOpen, LuPanelRightClose } from "react-icons/lu";
import { usePreferencesStore } from "@/stores";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RiNotification4Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

interface TopBarProps {
  onBack?: () => void;
  onForward?: () => void;
  title?: string;
}

export const TopBar = ({ onBack, onForward, title }: TopBarProps) => {
  const { sidebarCollapsed, toggleSidebar } = usePreferencesStore();

  return (
    <div className="h-16 bg-white  flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-all text-zinc-500"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <LuPanelRightClose className="size-6" />
          ) : (
            <LuPanelRightOpen className="size-6" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!onBack}
          >
            <MdOutlineKeyboardArrowLeft className="size-8 text-zinc-900" />
          </button>
          <button
            onClick={onForward}
            className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!onForward}
          >
            <MdOutlineKeyboardArrowRight className="size-8 text-zinc-900" />
          </button>
        </div>
        {title && <h1 className="text-xl font-bold text-zinc-900">{title}</h1>}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-all">
          <RiNotification4Line className="w-6 h-6 text-zinc-900" />
        </button>
        <button className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-all">
          <FiUser className="w-6 h-6 text-zinc-900" />
        </button>
      </div>
    </div>
  );
};
