import { Settings2, Store } from "lucide-react";

const SettingsHeader = () => {
  return (
    <header className="flex flex-col gap-4! sm:flex-row! sm:items-end! sm:justify-between!">
      <div className="min-w-0!">
        <div className="flex items-center gap-2!">
          <div className="flex h-8! w-8! shrink-0! items-center justify-center rounded-lg! bg-blue-50">
            <Settings2
              size={15}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-xl! font-semibold tracking-tight text-gray-900 sm:text-2xl!">
            Settings
          </h1>
        </div>

        <p className="mt-1.5! max-w-2xl! text-[11px]! leading-5 text-gray-500 sm:text-xs!">
          Manage your account, store, notifications and
          security preferences from one place.
        </p>
      </div>

      <div className="flex w-fit! items-center gap-2! rounded-full! border border-emerald-200 bg-emerald-50 px-2.5! py-1.5!">
        <span className="h-1.5! w-1.5! rounded-full! bg-emerald-500" />

        <Store
          size={13}
          className="text-emerald-600"
        />

        <span className="text-[10px]! font-medium text-emerald-700">
          Store active
        </span>
      </div>
    </header>
  );
};

export default SettingsHeader;