import {
  Bell,
  ChevronDown,
  Plus,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";

interface UserMenuPillProps {
  avatarUrl: string;
  altText?: string;
  className?: string;
}

const UserMenuPill = ({
  avatarUrl,
  altText = "User avatar",
  className = "",
}: UserMenuPillProps) => {
  const [open, setOpen] = useState(false);

  // Référence vers tout le dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
    >
      {/* User button */}
      <button
        type="button"
        aria-label="Open user menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-2 transition-all hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${className}`}
      >
        <img
          src={avatarUrl}
          alt={altText}
          className="h-8 w-8 rounded-full object-cover"
        />

        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5">
          {/* Profile */}
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <User
              size={16}
              className="text-gray-500"
            />

            <span>Profile</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <Settings
              size={16}
              className="text-gray-500"
            />

            <span>Settings</span>
          </button>

          {/* Separator */}
        
          {/* Logout */}
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut size={16} />

            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  return (
    <header className="flex h-17 items-center bg-[#fafafa] justify-between border-b border-gray-200 px-5.5 rounded-l-t-3xl py-3">
      {/* Title */}
      <h1 className="text-base font-semibold text-gray-600">
        Dashboard
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
          <Bell size={19} />
        </button>

        {/* User menu */}
        <UserMenuPill
          avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
        />

        {/* Add product */}
        <Button>
          <Plus size={18} />
          Add product
        </Button>
      </div>
    </header>
  );
};

export default Navbar; 