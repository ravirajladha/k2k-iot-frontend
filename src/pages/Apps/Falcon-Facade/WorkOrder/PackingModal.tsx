// ViewPackingDetailsModal.js
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ViewPackingDetailsModal = ({ isOpen, closePackingModal, data }) => {
  console.log(data, "inside the packing modal");

  const statusColors = {
    Pending: "bg-yellow-500 text-white",
    Completed: "bg-blue-500 text-white",
    Dispatched: "bg-green-500 text-white",
  };

  return (

<>
    {isOpen && data && (

    <Transition appear show={isOpen} as={Fragment}>
<Dialog as="div" className="fixed inset-0 z-50" onClose={closePackingModal}>
<div className="fixed inset-0 bg-black/50" aria-hidden="true" />

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
              <Dialog.Title className="text-xl font-semibold text-white py-3 px-4 bg-indigo-600 rounded-t-md">
                {`Packing Details- ${data?.packing_id}`}
              </Dialog.Title>

              <div className="mt-4">
                <div className="space-y-4">
                  {/* Packing Information */}
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
                    <p><strong>Created By:</strong> {data?.createdBy}</p>
                    <p><strong>Created At:</strong> {data?.createdAt}</p>
                  </div>

                  {/* Product Details */}
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
                  onClick={closePackingModal}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
         )}           
</>
  );
};
export default ViewPackingDetailsModal;
