import Button from "@/components/ui/Button";
import {
  MoreHorizontal,
  FileText,
  Wallet,
  Clock,
  ChevronRight,
} from "lucide-react";

const DahWallet = () => {
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
            207.86 XOF
          </p>

          <p className="mt-0.5 text-[10px]! font-medium text-gray-500">
            ≈ ₦38,870.02
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
            5 NFTs
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
            3 hours ago
          </span>

        </div>

      </div>

    </section>
  );
};

export default DahWallet;