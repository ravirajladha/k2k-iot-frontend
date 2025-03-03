import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, Fragment } from "react";

interface ViewDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: any; // Passed data for the selected row
}

// Define status colors
const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Dispatched: "bg-green-500 text-white",
  Completed: "bg-blue-500 text-white",
};

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ isOpen, closeModal, data }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" /> {/* Overlay */}

        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-md">
              {/* Modal Header */}
              <Dialog.Title
                as="h3"
                className="text-xl font-semibold text-white py-3 px-4 bg-indigo-600 rounded-t-md"
              >
                {`Details of Packing ${data?.packing_id}`}
              </Dialog.Title>

              <div className="mt-4">
                <div className="space-y-4">
                  {/* Work Order, Job Order and Status */}
                  <div>
                    <p><strong>Work Order:</strong> {data?.workOrderId}</p>
                    <p><strong>Job Order:</strong> {data?.jobOrder}</p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={`px-2 py-1 rounded-md ${statusColors[data?.status] || "bg-gray-500"}`}
                      >
                        {data?.status}
                      </span>
                    </p>
                  </div>

                  {/* Table to display Product details, SF details, and QR Codes */}
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-2 font-semibold">Product Name</th>
                        <th className="p-2 font-semibold">UOM</th>
                        <th className="p-2 font-semibold">SF - Quantity</th>
                        <th className="p-2 font-semibold">QR Codes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Loop through products */}
                      {data?.products?.map((product) => (
                        <tr key={product.productId}>
                          <td className="p-2">{product.productName}</td>
                          <td className="p-2">{product.uom}</td>
                          <td className="p-2">
                            {product.semiFinishedProducts?.map((sf, index) => (
                              <div key={index}>
                                <strong>{sf.sfId}</strong> - {sf.quantity} 
                              </div>
                            ))}
                          </td>
                          <td className="p-2">
                            {product.semiFinishedProducts?.map((sf, index) => (
                              <div key={index}>
                                <strong>QR Codes for {sf.sfId}:</strong>
                                <ul className="list-disc pl-6">
                                  {sf.qrCodes.map((qrCode, qrIndex) => (
                                    <li key={qrIndex}>QR Code {qrIndex + 1}: {qrCode}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() => window.print()} // Print functionality
                >
                  Print
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewDetailsModal;
