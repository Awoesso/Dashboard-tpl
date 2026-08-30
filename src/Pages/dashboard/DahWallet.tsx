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
    <section className="rounded-2xl border border-gray-200  bg-white p-4">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <Wallet
            size={19}
            strokeWidth={1.8}
            className="text-gray-500"
          />

          <span className="text-[14px] font-semibold text-gray-900">
            Your Wallet
          </span>
        </div>

        <button
          type="button"
          className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <MoreHorizontal size={16} />
        </button>

      </div>

      {/* ================= BALANCE ================= */}
      <div className="mt-4 rounded-2xl bg-[#fafafa] border  border-gray-200 p-4">

        <div className="text-center">

          <p className="text-[10px] font-medium text-gray-500">
            Your Balance
          </p>

          <p className="mt-1 text-[20px] font-semibold tracking-tight text-gray-900">
           207.86 xof
          </p>

          <p className="mt-0.5 text-[10px] text-gray-500">
            ≈ ₦38,870.02
          </p>

        </div>

        <Button className="mt-4 flex w-full items-center justify-center gap-1.5">
          Transfer to Bank
          <ChevronRight size={16} />
        </Button>

      </div>

      {/* ================= DETAILS ================= */}
      <div className="mt-4 divide-y divide-gray-100 border-t border-gray-100">

        {/* Documents */}
        <div className="flex items-center justify-between py-2.5">

          <div className="flex items-center gap-2">

            <FileText
              size={12}
              strokeWidth={1.8}
              className="text-gray-600"
            />

            <span className="text-[12px] font-medium text-gray-500">
              Documents owned
            </span>

          </div>

          <span className="text-[10px] font-semibold text-gray-700">
            5 NFTs
          </span>

        </div>

        {/* Activity */}
        <div className="flex items-center justify-between py-2.5">

          <div className="flex items-center gap-2">

            <Clock
              size={12}
              strokeWidth={1.8}
              className="text-gray-600"
            />

            <span className="text-[12px] font-medium text-gray-500">
              Last activity
            </span>

          </div>

          <span className="text-[10px] font-semibold text-gray-700">
            3 hours ago
          </span>

        </div>

      </div>

    </section>
  );
};

export default DahWallet;