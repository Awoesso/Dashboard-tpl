import { useState } from "react";

type NotificationPreferences = {
  orders: boolean;
  payments: boolean;
  products: boolean;
  security: boolean;
};

const DEFAULT_SETTINGS: NotificationPreferences =
  {
    orders: true,
    payments: true,
    products: false,
    security: true,
  };

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationPreferences>(() => {
    const saved =
      localStorage.getItem(
        "orion-notification-settings"
      );

    if (!saved) return DEFAULT_SETTINGS;

    try {
      return JSON.parse(saved) as NotificationPreferences;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSetting = (
    key: keyof NotificationPreferences
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "orion-notification-settings",
      JSON.stringify(settings)
    );
  };

  return (
    <section className="p-4! sm:p-6!">
      <div className="mb-6!">
        <h2 className="text-sm! font-semibold text-gray-900 sm:text-base!">
          Notifications
        </h2>

        <p className="mt-1! text-[10px]! leading-5 text-gray-500 sm:text-[11px]!">
          Choose which activities should generate
          notifications.
        </p>
      </div>

      <div className="divide-y divide-gray-100 overflow-hidden rounded-xl! border border-gray-200">
        <NotificationItem
          title="New orders"
          description="Receive notifications whenever a new order is placed."
          checked={settings.orders}
          onChange={() =>
            updateSetting("orders")
          }
        />

        <NotificationItem
          title="Payments"
          description="Get alerts for successful or failed payments."
          checked={settings.payments}
          onChange={() =>
            updateSetting("payments")
          }
        />

        <NotificationItem
          title="Product activity"
          description="Receive updates about important product activity."
          checked={settings.products}
          onChange={() =>
            updateSetting("products")
          }
        />

        <NotificationItem
          title="Security alerts"
          description="Important notifications about your account and security."
          checked={settings.security}
          onChange={() =>
            updateSetting("security")
          }
        />
      </div>

      <div className="mt-5! flex justify-end border-t border-gray-100 pt-5!">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg! bg-blue-600 px-3.5! py-2! text-[11px]! font-medium text-white transition hover:bg-blue-700"
        >
          Save preferences
        </button>
      </div>
    </section>
  );
};

type NotificationItemProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

const NotificationItem = ({
  title,
  description,
  checked,
  onChange,
}: NotificationItemProps) => {
  return (
    <div className="flex items-center justify-between gap-4! px-4! py-4!">
      <div className="min-w-0!">
        <p className="text-xs! font-medium text-gray-800">
          {title}
        </p>

        <p className="mt-0.5! max-w-xl! text-[10px]! leading-4 text-gray-500 sm:text-[11px]!">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative! h-5! w-9! shrink-0! rounded-full! transition ${
          checked
            ? "bg-blue-600!"
            : "bg-gray-200!"
        }`}
      >
        <span
          className={`absolute! top-0.5! h-4! w-4! rounded-full! bg-white! shadow-sm! transition ${
            checked
              ? "left-4.5!"
              : "left-0.5!"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationSettings;