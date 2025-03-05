import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';

interface QCCheckModalProps {
  isOpen: boolean;
  setShowQCCheck: Dispatch<SetStateAction<boolean | null>>;
  data: any;
}

const QCCheckModal: React.FC<QCCheckModalProps> = ({ isOpen, setShowQCCheck, data }) => {
  const [rejectedQuantity, setRejectedQuantity] = useState(0);
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("QC Check Submitted:", {
      jobOrderId: data?.jobOrderId,
      rejectedQuantity,
      remarks,
    });
    setShowQCCheck(null); // Close modal after submission
  };

  return (
    <div className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-md">
      <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 dark:text-white">
        QC Check - {data?.jobOrderId}
      </Dialog.Title>

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rejected Quantity</label>
        <input
          type="number"
          value={rejectedQuantity}
          onChange={(e) => setRejectedQuantity(Number(e.target.value))}
          className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          min={0}
        />

        <label className="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">Remarks</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>

        <div className="mt-5 flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => setShowQCCheck(null)}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QCCheckModal;
