import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-10">
      {" "}
      <div className="w-full max-w-md text-center">
        {" "}
        {/* 404 */}{" "}
        <div className="mb-8">
          {" "}
          <span className="text-8xl sm:text-9xl font-bold tracking-tighter text-slate-200 select-none">
            {" "}
            404{" "}
          </span>{" "}
        </div>{" "}
        {/* Content */}{" "}
        <div className="space-y-3">
          {" "}
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            {" "}
            Page introuvable{" "}
          </h1>{" "}
          <p className="mx-auto max-w-sm text-sm sm:text-base leading-6 text-slate-500">
            {" "}
            Désolé, la page que vous recherchez n’existe pas ou n’est plus
            disponible.{" "}
          </p>{" "}
        </div>{" "}
        {/* Actions */}{" "}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {" "}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className=" inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] "
          >
            {" "}
            <ArrowLeft size={16} strokeWidth={2} /> Retour{" "}
          </button>{" "}
          <Link
            to="/dashboard"
            className=" inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm  text-white! transition hover:bg-slate-800 active:scale-[0.98] "
          >
            {" "}
            <Home size={16} strokeWidth={2} /> Accueil{" "}
          </Link>{" "}
        </div>{" "}
        {/* Footer */}{" "}
        <div className="mt-12">
          {" "}
          <p className="text-xs text-slate-400">
            {" "}
            Nexa Digital Asset Platform{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
};
export default NotFound;
