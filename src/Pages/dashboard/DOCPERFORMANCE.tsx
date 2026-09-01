import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

type DocumentStatus = "Published" | "Draft";

type Document = {
  id: number;
  name: string;
  image_url: string | null;
  price: number;
  downloads: number;
  earnings: number;
  status: DocumentStatus;
};

const columns = [
  "Products",
  "Price",
  "Sales",
  "Earnings",
  "Status",
];

const formatCurrency = (value: number) =>
  `${value.toLocaleString("fr-FR")} XOF`;

const DOCPERFORMANCE = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, image_url, price, downloads, earnings, status"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur Supabase :", error);
        setError("Unable to load documents.");
        setDocuments([]);
        setLoading(false);
        return;
      }

      setDocuments(data ?? []);
      setLoading(false);
    };

    fetchDocuments();
  }, []);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-full border border-gray-200 bg-white p-1">
            <FileText
              size={15}
              strokeWidth={1.8}
              className="text-gray-500"
            />
          </div>

          <h2 className="!text-[14px] font-semibold text-gray-900">
       Top Selling Products
          </h2>

        </div>

        <button
          type="button"
          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          See All
        </button>

      </div>

      {/* Table */}

      <div className="mt-4 overflow-hidden">

        {/* Table Header */}

        <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.9fr_0.7fr] rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2">

          {columns.map((column) => (
            <span
              key={column}
              className="text-[10px] font-semibold uppercase tracking-wide text-gray-900"
            >
              {column}
            </span>
          ))}

        </div>

        {/* Loading */}

        {loading && (
          <div className="py-8 text-center text-[11px] text-gray-400">
            Loading documents...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="py-8 text-center text-[11px] text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && documents.length === 0 && (
          <div className="py-8 text-center text-[11px] text-gray-400">
            No products found.
          </div>
        )}

        {/* Rows */}

        {!loading &&
          !error &&
          documents.map((document) => (
            <div
              key={document.id}
              title="see details"
              className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.9fr_0.7fr] cursor-pointer items-center border-b border-gray-100 px-3 py-2.5"
            >

              {/* Product */}

              <div    className="  flex min-w-0 items-center gap-2" >

                <div 
               
                className="h-7 w-7 shrink-0 overflow-hidden rounded-md bg-gray-100">

                  {document.image_url ? (
                    <img
                      src={document.image_url}
                      alt={document.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText
                        size={13}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                </div>

                <span className="truncate text-[11px] font-medium text-gray-700">
                  {document.name}
                </span>

              </div>

              {/* Price */}

              <span className="text-[11px] text-gray-700">
                {formatCurrency(document.price)}
              </span>

              {/* Downloads */}

              <span className="text-[11px] text-gray-700">
                {document.downloads}
              </span>

              {/* Earnings */}

              <span className="text-[11px] text-gray-700">
                {formatCurrency(document.earnings)}
              </span>

              {/* Status */}

              <span
                className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                  document.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {document.status}
              </span>

            </div>
          ))}

      </div>

    </section>
  );
};

export default DOCPERFORMANCE;