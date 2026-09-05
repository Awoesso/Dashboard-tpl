import {
  Settings2,
  Store,
} from "lucide-react";

const SettingsHeader = () => {
  return (
    <header className="w-full! min-w-0!">
      <div className="flex! min-w-0! flex-col! gap-3! sm:flex-row! sm:items-center! sm:justify-between!">
        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="min-w-0!">
          <div className="flex! min-w-0! items-center! gap-2.5!">
            <div className="flex! h-8! w-8! shrink-0! items-center! justify-center! rounded-xl! border! border-gray-200! bg-white! text-gray-500! shadow-sm!">
              <Settings2
                size={15}
                strokeWidth={1.9}
              />
            </div>

            <div className="min-w-0!">
              <h1 className="font-heading! truncate! text-lg! font-semibold! tracking-tight! text-gray-900! sm:text-xl!">
                Settings
              </h1>
            </div>
          </div>

          <p className="mt-1! max-w-2xl! text-[10px]! font-medium! leading-relaxed! text-gray-500! sm:text-[11px]!">
            Manage your account, store, notifications and
            security preferences from one place.
          </p>
        </div>

        {/* =====================================================
            STORE STATUS
        ===================================================== */}

        <div className="inline-flex! w-fit! shrink-0! items-center! gap-1.5! rounded-full! border! border-green-200! bg-green-50! px-2.5! py-1.5!">
          <span className="h-1.5! w-1.5! shrink-0! rounded-full! bg-green-500!" />

          <Store
            size={13}
            strokeWidth={1.9}
            className="text-green-600!"
          />

          <span className="text-[9px]! font-semibold! text-green-700! sm:text-[10px]!">
            Store active
          </span>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;