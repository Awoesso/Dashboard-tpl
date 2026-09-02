import React, { useEffect, useState, useRef } from "react";
import {
  Camera,
  Check,
  Loader2,
  RotateCcw,
  UserRound,
  AlertCircle,
  Bell,
  Shield,
  CreditCard,
  User,
  Globe,
  Store,
  ExternalLink,
  Lock,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { UserAuth } from "@/Context/Authcontext";
import { useProfile } from "@/Context/useProfile";

const ProfileStoreSettings = () => {
  const { session } = UserAuth();
  const { profile, isLoading, error, refreshProfile } = useProfile();

  // Navigation locale des paramètres (Style Untitled UI)
  const [activeTab, setActiveTab] = useState("general");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState("GMT+00:00 - UTC");
  const [notifyOrders, setNotifyOrders] = useState(true);

  // Interface states
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.first_name || "");
    setLastName(profile.last_name || "");
    setPhone(profile.phone || "");
    setStoreName(profile.store_name || "");
    setAvatarUrl(profile.avatar_url || "");
    setBio(profile.bio || "");
  }, [profile]);

  // Upload d'image vers Supabase Storage
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session?.user?.id) return;

    if (!file.type.startsWith("image/")) {
      setSaveError("Veuillez sélectionner un fichier image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSaveError("Taille maximale autorisée : 5 Mo.");
      return;
    }

    try {
      setIsUploading(true);
      setSaveError("");

      const fileExt = file.name.split(".").pop();
      const filePath = `${session.user.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
    } catch (err: any) {
      setSaveError(err.message || "Erreur de chargement de l'image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    if (!profile) return;
    setFirstName(profile.first_name || "");
    setLastName(profile.last_name || "");
    setPhone(profile.phone || "");
    setStoreName(profile.store_name || "");
    setAvatarUrl(profile.avatar_url || "");
    setBio(profile.bio || "");
    setSaveSuccess(false);
    setSaveError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setSaveError("Session introuvable.");
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          store_name: storeName.trim(),
          avatar_url: avatarUrl.trim() || null,
          bio: bio.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      await refreshProfile();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: Error | unknown) {
      setSaveError(err instanceof Error ? err.message : "Mise à jour échouée.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full! space-y-6! bg-white p-6! sm:p-8!">
        <div className="h-8! w-48! animate-pulse rounded bg-gray-100" />
        <div className="h-10! w-full! animate-pulse rounded-lg bg-gray-100" />
        <div className="space-y-6! pt-4!">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16! w-full! animate-pulse rounded-lg bg-gray-50" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4! text-red-600">
        <div className="flex items-center gap-3!">
          <AlertCircle size={18} className="shrink-0" />
          <p className="text-sm! font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full! bg-white px-4! py-6! sm:px-8! sm:py-8!">
      {/* Header Général */}
      <div className="border-b border-gray-200 pb-6!">
        <h1 className="text-2xl! font-semibold text-gray-900 sm:text-3xl!">
          Settings
        </h1>
        <p className="mt-1! text-xs! text-gray-500 sm:text-sm!">
          Manage your account preferences and store configurations.
        </p>

        {/* Navigation Onglets Horizontal (Style Untitled UI) */}
        <div className="mt-6! flex items-center gap-1! overflow-x-auto border-b border-gray-200 no-scrollbar">
          {[
            { id: "general", label: "General", icon: User },
            { id: "store", label: "Store Details", icon: Store },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2! border-b-2 px-3! py-2.5! text-xs! font-medium transition sm:text-sm! whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="divide-y divide-gray-200">
        {activeTab === "general" && (
          <>
            {/* Section: Name */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Personal Name
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  Visible on invoices and platform activities.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3! sm:col-span-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                />
              </div>
            </div>

            {/* Section: Email */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Email Address
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  Authentication and transaction updates.
                </p>
              </div>
              <div className="sm:col-span-2">
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full! cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3.5! py-2! text-xs! text-gray-500 outline-none sm:text-sm!"
                />
              </div>
            </div>

            {/* Section: Photo / Avatar */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Your Photo
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  This will be displayed on your profile.
                </p>
              </div>
              <div className="space-y-3! sm:col-span-2">
                <div className="flex items-center gap-4!">
                  <div className="relative h-16! w-16! shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="h-full! w-full! object-cover"
                      />
                    ) : (
                      <div className="flex h-full! w-full! items-center justify-center text-gray-400">
                        <UserRound size={28} />
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white backdrop-blur-xs">
                        <Loader2 size={16} className="animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2!">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading || isSaving}
                      className="rounded-lg border border-gray-300 bg-white px-3! py-1.5! text-xs! font-medium text-gray-700 shadow-2xs hover:bg-gray-50 disabled:opacity-50"
                    >
                      Update photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                />
              </div>
            </div>

            {/* Section: Bio */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Bio / Description
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  A brief description for your profile.
                </p>
              </div>
              <div className="sm:col-span-2">
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write a short summary..."
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "store" && (
          <>
            {/* Section: Store Name */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Store Name
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  Displayed on your public store domain.
                </p>
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Apex Digital"
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                />
              </div>
            </div>

            {/* Section: Phone */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Support Phone
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  For customer support & orders.
                </p>
              </div>
              <div className="sm:col-span-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+228 90 00 00 00"
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                />
              </div>
            </div>

            {/* Section: Timezone */}
            <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
              <div>
                <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                  Timezone
                </label>
                <p className="mt-0.5! text-xs! text-gray-500">
                  Set local time for order tracking.
                </p>
              </div>
              <div className="sm:col-span-2">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! text-gray-900 shadow-2xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm!"
                >
                  <option value="GMT+00:00 - UTC">GMT+00:00 - UTC (Lomé)</option>
                  <option value="GMT+01:00 - CET">GMT+01:00 - Paris</option>
                  <option value="GMT-05:00 - EST">GMT-05:00 - New York</option>
                </select>
              </div>
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
            <div>
              <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                Order Notifications
              </label>
              <p className="mt-0.5! text-xs! text-gray-500">
                Get alerts for new sales and inventory.
              </p>
            </div>
            <div className="flex items-center gap-3! sm:col-span-2">
              <input
                type="checkbox"
                id="notify"
                checked={notifyOrders}
                onChange={(e) => setNotifyOrders(e.target.checked)}
                className="h-4! w-4! rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="notify" className="text-xs! text-gray-700 sm:text-sm!">
                Send email alerts on every new order
              </label>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="grid grid-cols-1 gap-y-3! py-6! sm:grid-cols-3 sm:gap-x-6!">
            <div>
              <label className="block text-xs! font-medium text-gray-900 sm:text-sm!">
                Password & Security
              </label>
              <p className="mt-0.5! text-xs! text-gray-500">
                Manage credential access.
              </p>
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                className="flex items-center gap-2! rounded-lg border border-gray-300 bg-white px-3.5! py-2! text-xs! font-medium text-gray-700 shadow-2xs hover:bg-gray-50 sm:text-sm!"
              >
                <Lock size={14} />
                Change Password via Supabase Auth
              </button>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        {saveSuccess && (
          <div className="mt-4! flex items-center gap-2! rounded-lg border border-emerald-200 bg-emerald-50 p-3! text-xs! font-medium text-emerald-700">
            <Check size={16} className="shrink-0 text-emerald-600" />
            Settings saved successfully.
          </div>
        )}

        {saveError && (
          <div className="mt-4! flex items-center gap-2! rounded-lg border border-red-200 bg-red-50 p-3! text-xs! font-medium text-red-600">
            <AlertCircle size={16} className="shrink-0 text-red-500" />
            {saveError}
          </div>
        )}

        {/* Sticky/Fixed Action Bar */}
        <div className="flex items-center justify-end gap-3! pt-6!">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving || isUploading}
            className="flex items-center gap-1.5! rounded-lg border border-gray-300 bg-white px-4! py-2! text-xs! font-medium text-gray-700 shadow-2xs hover:bg-gray-50 disabled:opacity-50 sm:text-sm!"
          >
            <RotateCcw size={14} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="flex items-center gap-1.5! rounded-lg bg-blue-600 px-4! py-2! text-xs! font-medium text-white shadow-2xs hover:bg-blue-700 disabled:opacity-60 sm:text-sm!"
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check size={14} />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileStoreSettings;