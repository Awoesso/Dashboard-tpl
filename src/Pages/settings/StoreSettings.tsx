import { useState } from "react";
import {
  Check,
  Globe,
  MapPin,
  Store,
} from "lucide-react";

const StoreSettings = () => {
  const [storeName, setStoreName] = useState("");
  const [storeSlug, setStoreSlug] = useState("");
  const [country, setCountry] = useState("Togo");
  const [currency, setCurrency] = useState("XOF");
  const [language, setLanguage] = useState("French");
  const [timezone, setTimezone] = useState("Africa/Lome");
  const [storeOnline, setStoreOnline] = useState(true);

  return (
    <section className="w-full! min-w-0!">
      {/* Header */}
      <div className="mb-6! sm:mb-7!">
        <div className="flex! items-center gap-2!">
       

          <h2 className="font-heading text-sm! font-semibold! tracking-tight! text-gray-900! sm:text-base!">
            Store configuration
          </h2>
        </div>

        <p className="mt-1! max-w-xl! text-[10px]! leading-5! text-gray-500! sm:text-[11px]!">
          Configure how your online store behaves
          and how customers see it.
        </p>
      </div>

      {/* Settings */}
      <div className="divide-y! divide-gray-200! border-y! border-gray-200!">
        {/* Store name */}
        <SettingField
          title="Store name"
          description="The public name of your online store."
        >
          <div className="relative">
            <Store
              size={14}
              className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
            />

            <input
              value={storeName}
              onChange={(e) =>
                setStoreName(e.target.value)
              }
              placeholder="Apex Digital"
              className="input-settings! pl-9!"
            />
          </div>
        </SettingField>

        {/* Store URL */}
        <SettingField
          title="Store URL"
          description="The address customers use to access your store."
        >
          <div className="flex! min-w-0! overflow-hidden! rounded-lg! border! border-gray-300!">
            <span className="flex! shrink-0! items-center! bg-gray-50! px-2.5! text-[10px]! text-gray-500! sm:px-3!">
              orion.store/
            </span>

            <input
              value={storeSlug}
              onChange={(e) =>
                setStoreSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                )
              }
              placeholder="my-store"
              className="min-w-0! flex-1! border-0! bg-white! px-2.5! py-2! text-xs! text-gray-900! outline-none! focus:ring-0!"
            />
          </div>
        </SettingField>

        {/* Visibility */}
        <SettingField
          title="Store visibility"
          description="Choose whether customers can access your storefront."
        >
          <div className="flex! min-w-0! items-center! justify-between! gap-4! py-1!">
            <div className="min-w-0! flex-1!">
              <p className="text-[11px]! font-medium! text-gray-800!">
                Store is{" "}
                {storeOnline ? "online" : "offline"}
              </p>

              <p className="mt-0.5! text-[10px]! leading-4! text-gray-500!">
                {storeOnline
                  ? "Customers can browse your products."
                  : "Your storefront is temporarily hidden."}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={storeOnline}
              onClick={() =>
                setStoreOnline((value) => !value)
              }
              className={`relative! h-5! w-9! shrink-0! rounded-full! transition-colors! duration-150! ${
                storeOnline
                  ? "bg-blue-600!"
                  : "bg-gray-300!"
              }`}
            >
              <span
                className={`absolute! top-0.5! h-4! w-4! rounded-full! bg-white! shadow-sm! transition-transform! duration-150! ${
                  storeOnline
                    ? "translate-x-4!"
                    : "translate-x-0.5!"
                }`}
              />
            </button>
          </div>
        </SettingField>

        {/* Business location */}
        <SettingField
          title="Business location"
          description="Used for regional and checkout settings."
        >
          <div className="grid! min-w-0! grid-cols-1! gap-3! sm:grid-cols-2!">
            <div className="relative!">
              <MapPin
                size={14}
                className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
              />

              <select
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
                className="input-settings! appearance-none! pl-9!"
              >
                <option>Togo</option>
                <option>Benin</option>
                <option>Ghana</option>
                <option>Nigeria</option>
                <option>Ivory Coast</option>
              </select>
            </div>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value)
              }
              className="input-settings!"
            >
              <option value="XOF">
                XOF — CFA
              </option>
              <option value="GHS">
                GHS — Cedi
              </option>
              <option value="NGN">
                NGN — Naira
              </option>
              <option value="USD">
                USD — Dollar
              </option>
              <option value="EUR">
                EUR — Euro
              </option>
            </select>
          </div>
        </SettingField>

        {/* Regional preferences */}
        <SettingField
          title="Regional preferences"
          description="Language and time zone used by your dashboard."
        >
          <div className="grid! min-w-0! grid-cols-1! gap-3! sm:grid-cols-2!">
            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="input-settings!"
            >
              <option>French</option>
              <option>English</option>
            </select>

            <div className="relative!">
              <Globe
                size={14}
                className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
              />

              <select
                value={timezone}
                onChange={(e) =>
                  setTimezone(e.target.value)
                }
                className="input-settings! appearance-none! pl-9!"
              >
                <option value="Africa/Lome">
                  Africa/Lomé
                </option>

                <option value="Europe/Paris">
                  Europe/Paris
                </option>

                <option value="America/New_York">
                  America/New York
                </option>
              </select>
            </div>
          </div>
        </SettingField>
      </div>

      {/* Footer */}
      <div className="mt-5! flex! justify-end! border-t! border-gray-100! pt-4!">
        <button
          type="button"
          className="inline-flex! h-10! items-center! gap-1.5! rounded-lg! bg-blue-600! px-3.5! text-[11px]! font-medium! text-white! transition-colors! duration-150! hover:bg-blue-700!"
        >
          <Check size={13} />
          Save store settings
        </button>
      </div>
    </section>
  );
};

type SettingFieldProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const SettingField = ({
  title,
  description,
  children,
}: SettingFieldProps) => {
  return (
    <div className="grid! grid-cols-1! gap-3! py-5! first:pt-0! last:pb-0! sm:grid-cols-[180px_minmax(0,1fr)]! sm:gap-6!">
      {/* Label */}
      <div className="min-w-0!">
        <p className="text-[11px]! font-semibold! text-gray-900!">
          {title}
        </p>

        <p className="mt-1! max-w-[220px]! text-[10px]! leading-4! text-gray-500!">
          {description}
        </p>
      </div>

      {/* Control */}
      <div className="min-w-0!">
        {children}
      </div>
    </div>
  );
};

export default StoreSettings;