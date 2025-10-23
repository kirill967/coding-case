import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`p-1 sm:p-1 flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent text-gray ${className}`}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
