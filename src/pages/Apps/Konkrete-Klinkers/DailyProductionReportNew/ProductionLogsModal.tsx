import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

interface ProductionLog {
    timestamp: string;
    productId: string;
    numberOfBlocks: number;
}

interface ProductionLogsModalProps {
    isOpen: boolean;
    setShowLogs: Dispatch<SetStateAction<boolean | null>>;
    productionLogs: ProductionLog[];
}

const ProductionLogsModal: React.FC<ProductionLogsModalProps> = ({ isOpen, setShowLogs, productionLogs }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setShowLogs(null)}>
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
                        <Dialog.Panel className="w-full max-w-lg p-6 bg-white shadow-xl rounded-md">
                            <Dialog.Title as="h3" className="text-lg font-semibold">Production Logs</Dialog.Title>
                            <div className="mt-4">
                                {productionLogs.length > 0 ? (
                                    <table className="w-full text-sm text-left border">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-2 border">Timestamp</th>
                                                <th className="p-2 border">Product ID</th>
                                                <th className="p-2 border">Number of Blocks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productionLogs.map((log, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="p-2 border">{log.timestamp}</td>
                                                    <td className="p-2 border">{log.productId}</td>
                                                    <td className="p-2 border">{log.numberOfBlocks}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-500">No production logs available.</p>
                                )}
                            </div>
                            <div className="mt-5 flex justify-end">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={() => setShowLogs(null)}
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

export default ProductionLogsModal;
