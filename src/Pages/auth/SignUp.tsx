import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Supabase Auth viendra ici
    console.log(formData);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">

      <div className="w-full max-w-[420px]">

        {/* ================= LOGO ================= */}

        <div className="mb-6 flex justify-center sm:mb-7">

          <img
            src="/favicon.png"
            alt="Orion"
            className="h-9! w-9! object-contain"
          />

        </div>

        {/* ================= HEADER ================= */}

        <div className="mb-6 text-center sm:mb-7">

          <h1 className="text-[22px]! font-semibold tracking-tight text-gray-900 sm:text-[24px]!">
            Créez votre compte
          </h1>

          <p className="mx-auto mt-2 max-w-[340px] text-[12px]! leading-5 text-gray-500 sm:text-[13px]!">
            Créez un compte pour accéder à votre tableau de bord.
          </p>

        </div>

        {/* ================= CARD ================= */}

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >

            {/* ================= NAME ================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* FIRST NAME */}

              <div>

                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-[11px]! font-medium text-gray-800 sm:text-[12px]!"
                >
                  Prénom
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  autoComplete="given-name"
                  required
                  className="
                    h-10!
                    w-full
                    rounded-lg
                    border border-gray-200
                    bg-white
                    px-3
                    text-[12px]!
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-300
                    focus:ring-2
                    focus:ring-blue-500/10
                    sm:h-11!
                    sm:text-[13px]!
                  "
                />

              </div>

              {/* LAST NAME */}

              <div>

                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-[11px]! font-medium text-gray-800 sm:text-[12px]!"
                >
                  Nom de famille
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  autoComplete="family-name"
                  required
                  className="
                    h-10!
                    w-full
                    rounded-lg
                    border border-gray-200
                    bg-white
                    px-3
                    text-[12px]!
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-300
                    focus:ring-2
                    focus:ring-blue-500/10
                    sm:h-11!
                    sm:text-[13px]!
                  "
                />

              </div>

            </div>

            {/* ================= EMAIL ================= */}

            <div>

              <label
                htmlFor="email"
                className="mb-1.5 block text-[11px]! font-medium text-gray-800 sm:text-[12px]!"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="
                  h-10!
                  w-full
                  rounded-lg
                  border border-gray-200
                  bg-white
                  px-3
                  text-[12px]!
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-gray-300
                  focus:ring-2
                  focus:ring-blue-500/10
                  sm:h-11!
                  sm:text-[13px]!
                "
              />

            </div>

            {/* ================= PASSWORD ================= */}

            <div>

              <label
                htmlFor="password"
                className="mb-1.5 block text-[11px]! font-medium text-gray-800 sm:text-[12px]!"
              >
                Mot de passe
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="
                    h-10!
                    w-full
                    rounded-lg
                    border border-gray-200
                    bg-white
                    px-3
                    pr-10
                    text-[12px]!
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-300
                    focus:ring-2
                    focus:ring-blue-500/10
                    sm:h-11!
                    sm:text-[13px]!
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-2.5
                    top-1/2
                    -translate-y-1/2
                    rounded-md
                    p-1
                    text-gray-400
                    hover:bg-gray-50
                    hover:text-gray-700
                  "
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

              <p className="mt-1.5 text-[9px]! text-gray-400 sm:text-[10px]!">
                Minimum 6 caractères.
              </p>

            </div>

            {/* ================= CONFIRM PASSWORD ================= */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-[11px]! font-medium text-gray-800 sm:text-[12px]!"
              >
                Confirmer le mot de passe
              </label>

              <div className="relative">

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="
                    h-10!
                    w-full
                    rounded-lg
                    border border-gray-200
                    bg-white
                    px-3
                    pr-10
                    text-[12px]!
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-300
                    focus:ring-2
                    focus:ring-blue-500/10
                    sm:h-11!
                    sm:text-[13px]!
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-2.5
                    top-1/2
                    -translate-y-1/2
                    rounded-md
                    p-1
                    text-gray-400
                    hover:bg-gray-50
                    hover:text-gray-700
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>

            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              className="
                flex
                h-10!
                w-full
                items-center
                justify-center
                rounded-lg
                bg-blue-600
                px-4
                text-[12px]!
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
                active:scale-[0.99]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/20
                sm:h-11!
                sm:text-[13px]!
              "
            >
              Créer un compte
            </button>

          </form>

          {/* ================= DIVIDER ================= */}

          <div className="my-5 h-px bg-gray-100 sm:my-6" />

          {/* ================= SIGN IN ================= */}

          <p className="text-center text-[10px]! text-gray-500 sm:text-[11px]!">

            Vous avez déjà un compte ?{" "}

            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Connexion
            </Link>

          </p>

        </div>

        {/* ================= FOOTER ================= */}

        <p className="mx-auto mt-4 max-w-[360px] text-center text-[9px]! leading-4 text-gray-400 sm:mt-5 sm:text-[10px]!">
          En créant un compte, vous acceptez nos conditions
          d'utilisation et notre politique de confidentialité.
        </p>

      </div>

    </main>
  );
};

export default SignUp;