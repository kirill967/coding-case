import { ArrowUp } from "lucide-react";

export function ChatButton({
  isLoading,
  disabled,
}: {
  isLoading: boolean;
  disabled: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`p-1 sm:p-1 flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
				${
          disabled && !isLoading
            ? "bg-gray-300 text-white cursor-not-allowed"
            : isLoading
            ? "bg-gray-900 text-white"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }
				disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <div className="w-[14px] h-[14px] sm:w-[25px] sm:h-[25px] flex items-center justify-center">
          <div
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white"
            style={{ minWidth: "0.5rem", minHeight: "0.5rem" }}
          />
        </div>
      ) : (
        <ArrowUp className="w-[14px] h-[14px] sm:w-[25px] sm:h-[25px] p-0.5" />
      )}
    </button>
  );
}
