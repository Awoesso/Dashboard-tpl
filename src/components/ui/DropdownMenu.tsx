import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type DropDownItem = {
  label: string;
};

type DropdownMenuProps = {
  items: DropDownItem[];
  trigger: ReactNode;
};

const DropdownMenu = ({
  items,
  trigger,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
      >
        {trigger}

        <ChevronDown
          size={14}
          className={`absolute -right-1 -bottom-1 rounded-full bg-white transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;