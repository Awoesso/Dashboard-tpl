import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full border border-blue-700 shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-700 hover:shadow active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button        