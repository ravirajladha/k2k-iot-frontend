import { FaSyncAlt, FaPause, FaHistory, FaCheckCircle } from 'react-icons/fa';
import { AiOutlineStop } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';

{
    /* Add Downtime Modal Button */
}
import DowntimeReasonModal from './DowntimeReasonCreationModal'; // Import modal component

interface Report {
    workOrderNumber: string;
    jobOrderNumber: string;
    clientName: string;
    projectName: string;
    productName: string;
    materialCode: string;
    UOM: string;
    POQuantity: number;
    plannedQuantity: number;
    balancedQuantity: number;
    achievedTillNow: number;
    rejectQuantity: number;
    recycleQuantity: number;
    startedBy: string;
    startedAt: string | null;
    stoppedAt: string | null;
    status: 'Running' | 'Stopped' | 'Not Started' | 'Finished';
}

interface DPRGridProps {
    reports: Report[];
    handleStartStop?: (workOrderNumber: string) => void;
    handleComplete?: (workOrderNumber: string) => void;
    handleRefresh: () => void;
    setIsModalOpen: (open: boolean) => void; // ✅ Expecting a boolean, not a Report
    setIsLogsModalOpen: (open: boolean) => void; // ✅ Expecting a boolean
    getStatusColor: (status: Report['status']) => string;
    showActionButtons: boolean;
}

const DPRGrid: React.FC<DPRGridProps> = ({ reports, handleStartStop, handleComplete, handleRefresh, setIsModalOpen, setIsLogsModalOpen, getStatusColor }) => {
    const [showDowntimeReasonModal, setShowDowntimeReasonModal] = useState(false);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-5">
            {reports.map((report) => (
                <div key={report.workOrderNumber} className={`rounded-md shadow-md p-4 relative ${getStatusColor(report.status)}`}>
                    {/* Top Section - Button Positioned in the Top Right */}
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold text-white">Daily Production Report</h4>
                        <button
                            className="p-1 flex items-center gap-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 absolute top-2 right-2"
                            onClick={() => setShowDowntimeReasonModal(true)}
                            title="Add Downtime"
                        >
                            <FaPencilAlt size={14} />
                            <span className="text-xs">Downtime</span>
                        </button>
                    </div>

                    {/* Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-2">
                        {' '}
                        {/* Reduced gap & padding */}
                        {/* Work Order Details */}
                        <div className="p-2 rounded-md shadow bg-white dark:bg-gray-800 flex flex-col">
                            {' '}
                            {/* Reduced padding */}
                            <h4 className="text-base font-semibold text-gray-700 dark:text-white mb-1">Work Order Details</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {' '}
                                {/* Reduced spacing */}
                                <div className="flex justify-between">
                                    <span className="font-semibold">Work Order No:</span> <span>{report.workOrderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Job Order No:</span> <span>{report.jobOrderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Client:</span> <span>{report.clientName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Project:</span> <span>{report.projectName}</span>
                                </div>
                            </div>
                            <h4 className="text-base font-semibold text-gray-700 dark:text-white mt-2 mb-1">Production Status</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Started By:</span> <span>{report.startedBy}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Started At:</span> <span>{report.startedAt || 'Not Started'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Stopped At:</span> <span>{report.stoppedAt || '--'}</span>
                                </div>
                            </div>
                        </div>
                        {/* Production Planning */}
                        <div className="p-2 rounded-md shadow bg-white dark:bg-gray-800 flex flex-col">
                            <h4 className="text-base font-semibold text-gray-700 dark:text-white mb-1">Production Planning</h4>

                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Dates:</span> <span>02-02-2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Product:</span> <span>{report.productName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Material Code:</span> <span>{report.materialCode}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">UOM:</span> <span>{report.UOM}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">PO Quantity:</span> <span>{report.POQuantity}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span className="font-semibold">Achieved:</span> <span>{report.achievedTillNow}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span className="font-semibold">Rejected:</span> <span>{report.rejectQuantity}</span>
                                </div>
                                <div className="flex justify-between text-blue-600">
                                    <span className="font-semibold">Recycled:</span> <span>{report.recycleQuantity}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-wrap justify-center sm:justify-between items-center gap-2">
                        <button className="p-1 rounded-md bg-gray-500 text-white hover:bg-gray-600" onClick={handleRefresh}>
                            <FaSyncAlt size={14} />
                        </button>

                        <button className="p-2 bg-blue-500 text-white rounded" title="Downtime Logs Modal" onClick={() => setIsModalOpen(true)}>
                            <AiOutlineStop size={14} />
                        </button>
                        {/* <button className="p-1 rounded-md bg-purple-500 text-white hover:bg-purple-600" onClick={() => setShowLogs(report)}>
                            <FaHistory size={14} />
                        </button> */}
                        <button className="p-1 rounded-md bg-purple-500 text-white hover:bg-purple-600" onClick={() => setIsLogsModalOpen(true)} title="Production Logs Modal">
                            <FaHistory size={14} />
                        </button>
                        <button>Update Quantity</button>

                        {report.status !== 'Finished' && (
                            <button
                                className={`p-1 px-3 rounded-md text-white text-xs ${report.status === 'Running' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                onClick={() => handleStartStop(report.workOrderNumber)}
                            >
                                {report.status === 'Running' ? 'Stop' : 'Start'}
                            </button>
                        )}

                        {report.status === 'Stopped' && (
                            <button className="p-1 px-3 rounded-md bg-blue-500 text-white text-xs hover:bg-blue-600" onClick={() => handleComplete(report.workOrderNumber)}>
                                <FaCheckCircle size={12} /> Complete
                            </button>
                        )}
                    </div>
                    <DowntimeReasonModal isOpen={showDowntimeReasonModal} onClose={() => setShowDowntimeReasonModal(false)} />
                </div>
            ))}
        </div>
    );
};

export default DPRGrid;
