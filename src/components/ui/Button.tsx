import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`
        inline-flex
        min-h-9
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-full
        border
        border-blue-700
        bg-blue-600
        px-4
        py-2
        text-[12px]!
        font-semibold
        leading-none
        text-white
        shadow-sm
        transition-all
        duration-200
        ease-in-out

        hover:bg-blue-700
        hover:shadow

        active:scale-95

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/20
        focus:ring-offset-1

        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-50

        sm:min-h-10
        sm:px-5
        sm:py-2.5
        sm:text-sm!

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;