import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

interface DowntimeLog {
    reason: string;
    startTime: string;
    endTime: string;
    duration: string;
    actionTaken: string;
}

interface DowntimeModalProps {
    isOpen: boolean;
    setShowDowntime: Dispatch<SetStateAction<boolean | null>>; // ✅ Fix the type
    downtimeLogs: DowntimeLog[];
}

console.log("inside dowmtime modal")

const DowntimeModal: React.FC<DowntimeModalProps> = ({ isOpen, setShowDowntime, downtimeLogs }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setShowDowntime(null)}>
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
                        <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                            <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                Downtime Logs
                            </Dialog.Title>
                            <div className="mt-4">
                                {downtimeLogs?.length > 0 ? (
                                    <table className="w-full text-sm text-left border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-700">
                                                <th className="p-2 border border-gray-300">Reason</th>
                                                <th className="p-2 border border-gray-300">Start Time</th>
                                                <th className="p-2 border border-gray-300">End Time</th>
                                                <th className="p-2 border border-gray-300">Duration</th>
                                                {/* <th className="p-2 border border-gray-300">Action Taken</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {downtimeLogs.map((log, index) => (
                                                <tr key={index} className="border-t border-gray-300">
                                                    <td className="p-2 border border-gray-300">{log.reason}</td>
                                                    <td className="p-2 border border-gray-300">{log.startTime}</td>
                                                    <td className="p-2 border border-gray-300">{log.endTime}</td>
                                                    <td className="p-2 border border-gray-300">{log.duration}</td>
                                                    {/* <td className="p-2 border border-gray-300">{log.actionTaken}</td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-500 text-sm">No downtime logs available.</p>
                                )}
                            </div>
                            <div className="mt-5 flex justify-end">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    onClick={() => setShowDowntime(null)}
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

export default DowntimeModal;
