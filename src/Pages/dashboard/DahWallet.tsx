import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import {
  MoreHorizontal,
  FileText,
  Wallet,
  Clock,
  ChevronRight,
} from "lucide-react";

import {
  getWalletSummary,
  type WalletSummary,
} from "@/services/orders.service";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatAmount = (
  amount: number,
  currency: string
): string => {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(amount)} ${currency}`;
};

const formatRelativeTime = (
  date: string | null
): string => {
  if (!date) {
    return "Aucune activité";
  }

  const createdAt = new Date(date);

  if (Number.isNaN(createdAt.getTime())) {
    return "Date inconnue";
  }

  const now = new Date();

  const difference =
    now.getTime() - createdAt.getTime();

  const seconds = Math.floor(difference / 1000);

  if (seconds < 60) {
    return "À l'instant";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `Il y a ${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Il y a ${hours} h`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Hier";
  }

  if (days < 30) {
    return `Il y a ${days} jours`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `Il y a ${months} mois`;
  }

  const years = Math.floor(months / 12);

  return `Il y a ${years} an${years > 1 ? "s" : ""}`;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const DahWallet = () => {
  const [wallet, setWallet] =
    useState<WalletSummary | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ------------------------------------------------------------------------ */
  /* Chargement                                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let mounted = true;

    const loadWallet = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getWalletSummary();

        if (!mounted) {
          return;
        }

        setWallet(data);
      } catch (error: unknown) {
        console.error(
          "Erreur chargement wallet :",
          error
        );

        if (!mounted) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Impossible de charger le wallet."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadWallet();

    return () => {
      mounted = false;
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Données affichées                                                        */
  /* ------------------------------------------------------------------------ */

  const balance = wallet
    ? formatAmount(
        wallet.balance,
        wallet.currency
      )
    : "—";

  const lastActivity = wallet
    ? formatRelativeTime(wallet.lastActivity)
    : "—";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-2">

          <Wallet
            size={19}
            strokeWidth={1.8}
            className="shrink-0 text-gray-500"
          />

          <span className="truncate text-[14px]! font-semibold text-gray-900">
            Your Wallet
          </span>

        </div>

        <button
          type="button"
          aria-label="Wallet options"
          className="
            shrink-0
            rounded-lg
            p-1
            text-gray-400
            transition-colors
            hover:bg-gray-100
            hover:text-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-gray-900/5
          "
        >
          <MoreHorizontal size={16} />
        </button>

      </div>

      {/* ================= BALANCE ================= */}

      <div
        className="
          mt-4
          rounded-2xl
          border
          border-gray-200
          bg-[#fafafa]
          p-4
          sm:p-5
        "
      >

        <div className="text-center">

          <p className="text-[10px]! font-medium text-gray-500">
            Your Balance
          </p>

          <p className="mt-1 text-[20px]! font-semibold tracking-tight text-gray-900 sm:text-[22px]!">
            {loading ? "—" : balance}
          </p>

          <p className="mt-0.5 text-[10px]! font-medium text-gray-500">
            {error
              ? "Erreur de chargement"
              : wallet
                ? wallet.currency
                : "—"}
          </p>

        </div>

        <Button
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            px-4
            py-2.5
            text-[12px]!
            sm:text-[13px]!
          "
        >
          Transfer to Bank
          <ChevronRight size={16} />
        </Button>

      </div>

      {/* ================= DETAILS ================= */}

      <div className="mt-4 divide-y divide-gray-100 border-t border-gray-100">

        {/* Documents */}

        <div className="flex items-center justify-between gap-4 py-3">

          <div className="flex min-w-0 items-center gap-2">

            <FileText
              size={12}
              strokeWidth={1.8}
              className="shrink-0 text-gray-600"
            />

            <span className="truncate text-[12px]! font-medium text-gray-500">
              Documents owned
            </span>

          </div>

          <span className="shrink-0 text-[10px]! font-semibold text-gray-700">
            —
          </span>

        </div>

        {/* Activity */}

        <div className="flex items-center justify-between gap-4 py-3">

          <div className="flex min-w-0 items-center gap-2">

            <Clock
              size={12}
              strokeWidth={1.8}
              className="shrink-0 text-gray-600"
            />

            <span className="truncate text-[12px]! font-medium text-gray-500">
              Last activity
            </span>

          </div>

          <span className="shrink-0 text-[10px]! font-semibold text-gray-700">
            {loading ? "—" : lastActivity}
          </span>

        </div>

      </div>

    </section>
  );
};

export default DahWallet;