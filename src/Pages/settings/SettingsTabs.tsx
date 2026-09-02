import {
  Bell,
  Shield,
  Store,
  User,
} from "lucide-react";

import type { SettingsTab } from "./Settings";

type SettingsTabsProps = {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
};

const tabs = [
  {
    id: "general" as SettingsTab,
    label: "General",
    icon: User,
  },
  {
    id: "store" as SettingsTab,
    label: "Store",
    icon: Store,
  },
  {
    id: "notifications" as SettingsTab,
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security" as SettingsTab,
    label: "Security",
    icon: Shield,
  },
];

const SettingsTabs = ({
  activeTab,
  onChange,
}: SettingsTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <nav
        className="flex! overflow-x-auto! px-2! scrollbar-none!"
        aria-label="Settings navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex! shrink-0! items-center! gap-1.5! border-b-2! px-3! py-3! text-[11px]! font-medium transition sm:px-4! sm:text-xs! ${
                active
                  ? "border-blue-600! text-blue-600!"
                  : "border-transparent! text-gray-500! hover:border-gray-300! hover:text-gray-800!"
              }`}
            >
              <Icon size={14} />

              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsTabs;