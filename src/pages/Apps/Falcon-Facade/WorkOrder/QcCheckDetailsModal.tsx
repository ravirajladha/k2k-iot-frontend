import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import IconFile from "@/components/Icon/IconFile";

const QcCheckDetailsModal = ({ isOpen, closeQcCheckModal, qcCheck }) => {
  console.log(qcCheck, "inside the QC Check modal");
  return (
    <>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50" onClose={closeQcCheckModal}>
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
                    {`QC Check Details - ${qcCheck?.workOrderId}`}
                  </Dialog.Title>

                  <div className="mt-4">
                    <div className="space-y-4">
                      {/* QC Check Information */}
                      <div>
                        <p><strong>Work Order ID:</strong> {qcCheck?.workOrderId}</p>
                        <p><strong>Job Order ID:</strong> {qcCheck?.jobOrderId}</p>
                      </div>

                      {/* Products Details */}
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            <th className="p-2 font-semibold">Product Name</th>
                            <th className="p-2 font-semibold">UOM</th>
                            <th className="p-2 font-semibold">Quantity</th>
                            <th className="p-2 font-semibold">Semi-Finished</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Loop through products */}
                          {qcCheck?.products?.map((product) => (
                            <tr key={product.checkId}>
                              <td className="p-2">{product.productName}</td>
                              <td className="p-2">{product.uom}</td>
                              <td className="p-2">{product.quantity}</td>
                              <td className="p-2">
                                {product.semiFinished.map((sf, index) => (
                                  <div key={index}>
                                    <strong>SF {index + 1}: </strong>{sf}
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
                      onClick={closeQcCheckModal}
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

export default QcCheckDetailsModal;
