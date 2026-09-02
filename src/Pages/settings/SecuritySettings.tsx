import {
  AlertTriangle,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { UserAuth } from "@/Context/Authcontext";

const SecuritySettings = () => {
  const { session, signOut } =
    UserAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <section className="p-4! sm:p-6!">
      <div className="mb-6!">
        <h2 className="text-sm! font-semibold text-gray-900 sm:text-base!">
          Security & account
        </h2>

        <p className="mt-1! text-[10px]! leading-5 text-gray-500 sm:text-[11px]!">
          Manage your account access and active
          sessions.
        </p>
      </div>

      <div className="space-y-4!">
        {/* Account status */}

        <div className="rounded-xl! border border-gray-200 p-4!">
          <div className="flex items-start gap-3!">
            <div className="flex h-8! w-8! shrink-0! items-center justify-center rounded-lg! bg-emerald-50">
              <CheckCircle2
                size={15}
                className="text-emerald-600"
              />
            </div>

            <div className="min-w-0!">
              <p className="text-xs! font-semibold text-gray-800">
                Account status
              </p>

              <p className="mt-1! text-[10px]! leading-4 text-gray-500">
                Your account is authenticated and
                active.
              </p>

              <div className="mt-2! flex items-center gap-2!">
                <span className="h-1.5! w-1.5! rounded-full! bg-emerald-500" />

                <span className="text-[10px]! font-medium text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current session */}

        <div className="rounded-xl! border border-gray-200 p-4!">
          <div className="flex items-start gap-3!">
            <div className="flex h-8! w-8! shrink-0! items-center justify-center rounded-lg! bg-gray-100">
              <Smartphone
                size={15}
                className="text-gray-600"
              />
            </div>

            <div className="min-w-0! flex-1!">
              <div className="flex flex-wrap! items-center justify-between gap-2!">
                <div>
                  <p className="text-xs! font-semibold text-gray-800">
                    Current session
                  </p>

                  <p className="mt-1! break-all! text-[10px]! text-gray-500">
                    {session?.user?.email ||
                      "Authenticated user"}
                  </p>
                </div>

                <span className="rounded-full! bg-emerald-50 px-2! py-0.5! text-[9px]! font-medium text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security info */}

        <div className="rounded-xl! border border-blue-100 bg-blue-50/50 p-4!">
          <div className="flex items-start gap-3!">
            <ShieldCheck
              size={17}
              className="mt-0.5! shrink-0! text-blue-600"
            />

            <div>
              <p className="text-xs! font-semibold text-blue-900">
                Account protection
              </p>

              <p className="mt-1! text-[10px]! leading-5 text-blue-700">
                Authentication and sessions are
                managed securely by your auth
                provider.
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}

        <div className="rounded-xl! border border-orange-200 bg-orange-50/50 p-4!">
          <div className="flex flex-col gap-4! sm:flex-row! sm:items-center! sm:justify-between!">
            <div className="flex items-start gap-3!">
              <div className="flex h-8! w-8! shrink-0! items-center justify-center rounded-lg! bg-orange-100">
                <LogOut
                  size={15}
                  className="text-orange-600"
                />
              </div>

              <div>
                <p className="text-xs! font-semibold text-gray-800">
                  Sign out
                </p>

                <p className="mt-1! text-[10px]! leading-4 text-gray-500">
                  End the current session on this
                  device.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full! items-center justify-center gap-1.5! rounded-lg! border border-orange-200 bg-white px-3! py-2! text-[11px]! font-medium text-orange-700 transition hover:bg-orange-50 sm:w-fit!"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>

        {/* Danger zone */}

        <div className="rounded-xl! border border-red-200 p-4!">
          <div className="flex items-start gap-3!">
            <AlertTriangle
              size={16}
              className="mt-0.5! shrink-0! text-red-500"
            />

            <div className="min-w-0!">
              <p className="text-xs! font-semibold text-red-700">
                Danger zone
              </p>

              <p className="mt-1! max-w-xl! text-[10px]! leading-5 text-gray-500">
                Permanent account deletion can be
                added here later with a confirmation
                step and server-side protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySettings;