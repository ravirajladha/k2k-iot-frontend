import React, { useEffect } from "react";
import IconXCircle from "./Icon/IconXCircle";
import IconCircleCheck from "./Icon/IconCircleCheck";
import IconInfoTriangle from "./Icon/IconInfoTriangle";
import IconInfoCircle from "./Icon/IconInfoCircle";
import IconX from "./Icon/IconX";

type AlertType = "success" | "warning" | "error" | "info";

interface AlertComponentProps {
    id:string;
  type: AlertType; // Restrict `type` to specific alert types
  message: string; // Message to display in the alert
  autoClose: number; // Auto-close time in milliseconds
  onClose: () => void; // Callback for when the alert is dismissed
}

const AlertComponent: React.FC<AlertComponentProps> = ({ type, message, onClose, autoClose }) => {
  const alertStyles: Record<AlertType, string> = {
    success: "text-success bg-success-light border-success dark:bg-success-dark-light",
    warning: "text-yellow-500 bg-yellow-100 border-yellow-400 dark:bg-yellow-700",
    error: "text-red-500 bg-red-100 border-red-400 dark:bg-red-700",
    info: "text-blue-500 bg-blue-100 border-blue-400 dark:bg-blue-700",
  };

  const icons: Record<AlertType, JSX.Element> = {
    success: <IconCircleCheck className="w-5 h-5" />,
    warning: <IconInfoTriangle className="w-5 h-5" />,
    error: <IconXCircle className="w-5 h-5" />,
    info: <IconInfoCircle className="w-5 h-5" />,
  };

  // Auto-dismiss logic
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoClose); // Close alert after `autoClose` milliseconds
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [autoClose, onClose]);

  return (
    <div
      className={`relative flex items-center border p-3.5 rounded ltr:border-l-[8px] rtl:border-r-[8px] dark:text-white-light ${alertStyles[type]}`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-6 h-6 mr-3">
        {icons[type]}
      </div>

      {/* Message */}
      <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1 capitalize">{type}!</strong> {message}
      </span>

      {/* Close Button */}
      <button
        type="button"
        className="ltr:ml-auto rtl:mr-auto hover:opacity-80"
        onClick={onClose}
      >
        <IconX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AlertComponent;
