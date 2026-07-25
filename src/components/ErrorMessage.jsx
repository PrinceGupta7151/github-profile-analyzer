import { FiAlertCircle, FiX } from "react-icons/fi";

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800"
    >
      <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-red-600 transition hover:bg-red-100"
          aria-label="Dismiss error"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
