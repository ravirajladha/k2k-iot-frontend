import { Dialog, Transition } from '@headlessui/react';
// import { Dispatch, Fragment, SetStateAction } from 'react';
// import { useState } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

interface UpdateCompletedQuantityModalProps {
  isOpen: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean | null>>;
  data: any; // Passed data for the selected row
}

const UpdateCompletedQuantityModal: React.FC<UpdateCompletedQuantityModalProps> = ({
  isOpen,
  setShowUpdateModal,
  data,
}) => {
  const [completedQuantity, setCompletedQuantity] = useState(data?.completedQuantity || 0);
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Work Order:", { ...data, completedQuantity, remarks });
    setShowUpdateModal(null); // Close modal after submission
  };

  return (
    <div>
      {/* Modal content goes here */}
      <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-md">
        {/* Header */}
        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 dark:text-white">
          Update Completed Quantity
        </Dialog.Title>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Completed Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Completed Quantity</label>
            <input
              type="number"
              value={completedQuantity}
              onChange={(e) => setCompletedQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min={0}
            />
          </div>

          {/* Remarks Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => setShowUpdateModal(null)}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Submit
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </div>
  );
};

export default UpdateCompletedQuantityModal;
