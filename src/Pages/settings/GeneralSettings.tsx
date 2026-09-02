import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  ImagePlus,
  Loader2,
  Mail,
  RotateCcw,
  UserRound,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { UserAuth } from "@/Context/Authcontext";
import { useProfile } from "@/Context/useProfile";

const GeneralSettings = () => {
  const { session } = UserAuth();

  const {
    profile,
    isLoading,
    error,
    refreshProfile,
  } = useProfile();

  const [firstName, setFirstName] =
    useState("");
  const [lastName, setLastName] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [avatarUrl, setAvatarUrl] =
    useState("");

  const [isSaving, setIsSaving] =
    useState(false);
  const [isUploading, setIsUploading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);
  const [saveError, setSaveError] =
    useState("");

  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.first_name || "");
    setLastName(profile.last_name || "");
    setPhone(profile.phone || "");
    setAvatarUrl(profile.avatar_url || "");
  }, [profile]);

  const handleReset = () => {
    if (!profile) return;

    setFirstName(profile.first_name || "");
    setLastName(profile.last_name || "");
    setPhone(profile.phone || "");
    setAvatarUrl(profile.avatar_url || "");

    setSuccess(false);
    setSaveError("");
  };

  const handleSave = async () => {
    if (!session?.user?.id) {
      setSaveError(
        "Your session could not be found."
      );
      return;
    }

    if (!firstName.trim()) {
      setSaveError(
        "First name is required."
      );
      return;
    }

    if (!lastName.trim()) {
      setSaveError(
        "Last name is required."
      );
      return;
    }

    try {
      setIsSaving(true);
      setSuccess(false);
      setSaveError("");

      const { error: updateError } =
        await supabase
          .from("profiles")
          .update({
            first_name:
              firstName.trim(),
            last_name:
              lastName.trim(),
            phone:
              phone.trim() || null,
            avatar_url:
              avatarUrl.trim() || null,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", session.user.id);

      if (updateError) {
        throw updateError;
      }

      await refreshProfile();

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "Unable to save changes."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="space-y-5! p-4! sm:p-6!">
        <div className="skeleton h-4! w-36! rounded-md" />

        <div className="grid grid-cols-1 gap-5! sm:grid-cols-3!">
          <div>
            <div className="skeleton h-3! w-28! rounded-md" />
            <div className="skeleton mt-2! h-3! w-40! rounded-md" />
          </div>

          <div className="space-y-3! sm:col-span-2!">
            <div className="skeleton h-9! w-full! rounded-lg!" />
            <div className="skeleton h-9! w-full! rounded-lg!" />
          </div>
        </div>

        <div className="skeleton h-20! w-20! rounded-full!" />

        <div className="skeleton h-10! w-full! rounded-lg!" />
        <div className="skeleton h-10! w-full! rounded-lg!" />
      </section>
    );
  }

  if (error) {
    return (
      <div className="p-4! sm:p-6!">
        <div className="flex items-center gap-2! rounded-lg! border border-red-200 bg-red-50 p-3! text-red-600">
          <AlertCircle size={15} />

          <p className="text-xs!">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="p-4! sm:p-6!">
      <div className="mb-6!">
        <h2 className="text-sm! font-semibold text-gray-900 sm:text-base!">
          Personal information
        </h2>

        <p className="mt-1! text-[10px]! leading-5 text-gray-500 sm:text-[11px]!">
          Update the information associated with
          your account.
        </p>
      </div>

      <div className="space-y-6!">
        {/* Name */}

        <div className="grid grid-cols-1 gap-3! sm:grid-cols-3! sm:gap-6!">
          <div>
            <p className="text-[11px]! font-semibold text-gray-900">
              Full name
            </p>

            <p className="mt-1! text-[10px]! leading-4 text-gray-500">
              Your name used across the dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3! sm:col-span-2! sm:grid-cols-2!">
            <input
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              placeholder="First name"
              className="input-settings!"
            />

            <input
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              placeholder="Last name"
              className="input-settings!"
            />
          </div>
        </div>

        {/* Email */}

        <div className="grid grid-cols-1 gap-3! sm:grid-cols-3! sm:gap-6!">
          <div>
            <p className="text-[11px]! font-semibold text-gray-900">
              Email address
            </p>

            <p className="mt-1! text-[10px]! leading-4 text-gray-500">
              Used for authentication and alerts.
            </p>
          </div>

          <div className="relative sm:col-span-2!">
            <Mail
              size={14}
              className="absolute left-3! top-1/2! -translate-y-1/2! text-gray-400"
            />

            <input
              disabled
              value={
                session?.user?.email || ""
              }
              className="w-full! cursor-not-allowed rounded-lg! border border-gray-200 bg-gray-50 py-2! pl-9! pr-3! text-xs! text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Phone */}

        <div className="grid grid-cols-1 gap-3! sm:grid-cols-3! sm:gap-6!">
          <div>
            <p className="text-[11px]! font-semibold text-gray-900">
              Phone number
            </p>

            <p className="mt-1! text-[10px]! leading-4 text-gray-500">
              Main contact number for your store.
            </p>
          </div>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="+228 90 00 00 00"
            className="input-settings! sm:col-span-2!"
          />
        </div>

        {/* Avatar */}

        <div className="grid grid-cols-1 gap-3! sm:grid-cols-3! sm:gap-6!">
          <div>
            <p className="text-[11px]! font-semibold text-gray-900">
              Profile photo
            </p>

            <p className="mt-1! text-[10px]! leading-4 text-gray-500">
              Add a profile or store image.
            </p>
          </div>

          <div className="sm:col-span-2!">
            <div className="flex flex-col gap-3! sm:flex-row! sm:items-center!">
              <div className="relative h-14! w-14! shrink-0! overflow-hidden rounded-full! border border-gray-200 bg-gray-50">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-full! w-full! object-cover"
                  />
                ) : (
                  <div className="flex h-full! w-full! items-center justify-center text-gray-400">
                    <UserRound size={23} />
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0! flex items-center justify-center bg-black/40 text-white">
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={
                  isUploading ||
                  isSaving
                }
                className="flex w-fit! items-center gap-1.5! rounded-lg! border border-gray-300 bg-white px-3! py-2! text-[11px]! font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <ImagePlus size={13} />
                Update photo
              </button>
            </div>

            <input
              type="url"
              value={avatarUrl}
              onChange={(e) =>
                setAvatarUrl(e.target.value)
              }
              placeholder="https://example.com/avatar.png"
              className="input-settings! mt-3!"
            />
          </div>
        </div>
      </div>

      {/* Feedback */}

      {success && (
        <div className="mt-5! flex items-center gap-2! rounded-lg! border border-emerald-200 bg-emerald-50 p-3! text-[11px]! font-medium text-emerald-700">
          <Check size={14} />
          Changes saved successfully.
        </div>
      )}

      {saveError && (
        <div className="mt-5! flex items-center gap-2! rounded-lg! border border-red-200 bg-red-50 p-3! text-[11px]! text-red-600">
          <AlertCircle size={14} />
          {saveError}
        </div>
      )}

      <div className="mt-6! flex flex-col-reverse gap-2! border-t border-gray-100 pt-5! sm:flex-row! sm:justify-end!">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="flex items-center justify-center gap-1.5! rounded-lg! border border-gray-300 px-3! py-2! text-[11px]! font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RotateCcw size={13} />
          Reset
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-1.5! rounded-lg! bg-blue-600 px-3.5! py-2! text-[11px]! font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2
                size={13}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            <>
              <Check size={13} />
              Save changes
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default GeneralSettings;