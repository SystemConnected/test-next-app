import { cn } from "@/lib/utils"; // Utility function for merging class names
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ icon, className, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {icon && <span className="absolute left-3 top-3 text-gray-400">{icon}</span>}
      <input
        ref={ref}
        className={cn(
          "border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
          icon ? "pl-10" : "",
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";
