import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface DowntimeReasonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DowntimeReasonModal: React.FC<DowntimeReasonModalProps> = ({ isOpen, onClose }) => {
    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [minutes, setMinutes] = useState("");
    const [remarks, setRemarks] = useState("");
    const [error, setError] = useState("");

    const downtimeReasons = [
        "Machine Breakdown",
        "Power Failure",
        "Material Shortage",
        "Operator Unavailable",
        "Other"
    ];

    const handleSubmit = () => {
        if (!selectedReason || !minutes) {
            setError("Reason and Minutes are required fields.");
            return;
        }

        const finalReason = selectedReason === "Other" ? customReason : selectedReason;

        console.log("Downtime Reason:", finalReason);
        console.log("Minutes:", minutes);
        console.log("Remarks:", remarks);

        setError("");
        setSelectedReason("");
        setCustomReason("");
        setMinutes("");
        setRemarks("");
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
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
                        <Dialog.Panel className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-md shadow-xl">
                            <Dialog.Title as="h3" className="text-lg font-semibold text-gray-700 dark:text-white mb-3">
                                Add Downtime
                            </Dialog.Title>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                            {/* Downtime Reason Dropdown */}
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Reason <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                value={selectedReason}
                                onChange={(e) => setSelectedReason(e.target.value)}
                            >
                                <option value="">Select Reason</option>
                                {downtimeReasons.map((reason) => (
                                    <option key={reason} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>

                            {/* Show custom reason input if "Other" is selected */}
                            {selectedReason === "Other" && (
                                <input
                                    type="text"
                                    className="w-full p-2 mt-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter custom reason"
                                    value={customReason}
                                    onChange={(e) => setCustomReason(e.target.value)}
                                />
                            )}

                            {/* Minutes Input */}
                            <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Minutes <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter minutes"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                min="1"
                            />

                            {/* Remarks Text Area */}
                            <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">Remarks</label>
                            <textarea
                                className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter additional remarks (optional)"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                rows={3}
                            />

                            {/* Action Buttons */}
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DowntimeReasonModal;
