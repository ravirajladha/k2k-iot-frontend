import { FaSyncAlt, FaPause, FaHistory, FaCheckCircle } from 'react-icons/fa';
import { AiOutlineStop } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';

import DowntimeReasonModal from './DowntimeReasonCreationModal'; // Import modal component
import { formatDate } from '@/utils/formatDate';

export interface Report {
    _id: string;
    work_order: {
        _id: string;
        work_order_number: string;
        project_name: string;
        client_name: string;
    };
    sales_order_number: string;
    batch_number: number;
    date: {
        from: string; // ISO Date string
        to: string;
    };
    status: 'Pending' | 'Approved'; //can add later
    created_by: string;
    updated_by: string;
    createdAt: string;
    updatedAt: string;
    job_order: string;
    product_id: string;
    plant_name: string;
    machine_name: string;
    material_code: string;
    description: string;
    po_quantity: number;
    planned_quantity: number;
    scheduled_date: string;
    achieved_quantity: number;
    rejected_quantity: number;
    recycled_quantity: number;
    started_at: string | null;
    stopped_at: string | null;
    submitted_by: string | null;
    daily_production: {
        _id: string;
        status: 'Pending' | 'In Progress' | 'Paused' | 'Pending QC';
        date: string;
        downtime: any[];
        created_by: string;
        updated_by: string;
        createdAt: string;
        updatedAt: string;
    };
    latestDate: string;
}

interface DPRGridProps {
    reports: Report[];
    handleAction?: (report_id: string, action: string) => void;
    handleRefresh: (report: Report) => void;
    setIsModalOpen: (open: boolean) => void;
    setIsLogsModalOpen: (open: boolean) => void;
    getStatusColor: (status: Report['daily_production']['status']) => string;
    setSelectedReport: (report: Report) => void;
    showActionButtons: boolean;
}

const DPRGrid: React.FC<DPRGridProps> = ({ reports, handleAction, handleRefresh, setIsModalOpen, setIsLogsModalOpen, setSelectedReport, getStatusColor }) => {
    const [showDowntimeReasonModal, setShowDowntimeReasonModal] = useState(false);
    const [currentReport, setCurrentReport] = useState<Report | null>(null);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-5">
            {reports.map((report, index) => (
                <div key={index} className={`rounded-md shadow-md p-4 relative ${getStatusColor(report.daily_production.status)}`}>
                    {/* Top Section - Button Positioned in the Top Right */}
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold text-white">Daily Production Report</h4>
                        {(report.daily_production.status === 'In Progress' || report.daily_production.status === 'Paused') && (
                        <button
                            className="p-1 flex items-center gap-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 absolute top-2 right-2"
                            onClick={() => {
                                setShowDowntimeReasonModal(true);
                                setCurrentReport(report);
                            }}
                            title="Add Downtime"
                        >
                            <FaPencilAlt size={14} />
                            <span className="text-xs">Downtime</span>
                        </button>
                        )}
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
                                    <span className="font-semibold">Work Order No:</span> <span>{report.work_order.work_order_number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Job Order No:</span> <span>{report.job_order}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Sales Order No:</span> <span>{report.sales_order_number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Plant Name:</span> <span>{report.plant_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Machine Name:</span> <span>{report.machine_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Batch No:</span> <span>{report.batch_number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Client:</span> <span>{report.work_order.client_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Project:</span> <span>{report.work_order.project_name}</span>
                                </div>
                            </div>
                            <h4 className="text-base font-semibold text-gray-700 dark:text-white mt-2 mb-1">Production Status</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {/* <div className="flex justify-between">
                                    <span className="font-semibold">Started By:</span> <span>{report.startedBy}</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="font-semibold">Started At:</span> <span>{report.started_at || 'Not Started'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Stopped At:</span> <span>{report.stopped_at || '--'}</span>
                                </div>
                            </div>
                        </div>
                        {/* Production Planning */}
                        <div className="p-2 rounded-md shadow bg-white dark:bg-gray-800 flex flex-col">
                            <h4 className="text-base font-semibold text-gray-700 dark:text-white mb-1">Production Planning</h4>

                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Dates:</span> <span>{formatDate(report.date.from) + ' to ' + formatDate(report.date.to)}</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="font-semibold">Product:</span> <span>{report.material_code}</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="font-semibold">Material Code:</span> <span>{report.material_code}</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="font-semibold">UOM:</span> <span>{report.UOM}</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="font-semibold">PO Quantity:</span> <span>{report.po_quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Planned Quantity:</span> <span>{report.planned_quantity}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span className="font-semibold">Achieved:</span> <span>{report.achieved_quantity}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span className="font-semibold">Rejected:</span> <span>{report.rejected_quantity}</span>
                                </div>
                                <div className="flex justify-between text-blue-600">
                                    <span className="font-semibold">Recycled:</span> <span>{report.recycled_quantity}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-wrap justify-center sm:justify-between items-center gap-2">
                        <button className="p-1 rounded-md bg-gray-500 text-white hover:bg-gray-600" onClick={() => handleRefresh(report)}>
                            <FaSyncAlt size={14} />
                        </button>

                        <button
                            className="p-2 bg-blue-500 text-white rounded"
                            title="Downtime Logs Modal"
                            onClick={() => {
                                setSelectedReport(report); // set the report
                                setIsModalOpen(true); // open the modal
                            }}
                        >
                            <AiOutlineStop size={14} />
                        </button>
                        {/* <button className="p-1 rounded-md bg-purple-500 text-white hover:bg-purple-600" onClick={() => setShowLogs(report)}>
                            <FaHistory size={14} />
                        </button> */}
                        <button
                            className="p-1 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                            onClick={() => {
                                setSelectedReport(report); // set the report
                                setIsLogsModalOpen(true); // open the modal
                            }}
                            title="Production Logs Modal"
                        >
                            <FaHistory size={14} />
                        </button>
                        {report.daily_production.status === 'Pending' && (
                            <button className={`p-1 px-3 rounded-md text-white text-xs bg-green-600 hover:bg-green-700`} onClick={() => handleAction(report._id, 'start')}>
                                Start
                            </button>
                        )}
                        {report.daily_production.status === 'In Progress' && (
                            <>
                                <button className={`p-1 px-3 rounded-md text-white text-xs bg-yellow-600 hover:bg-yellow-700`} onClick={() => handleAction(report._id, 'pause')}>
                                    Pause
                                </button>
                                <button className={`flex p-1 px-3 rounded-md text-white text-xs bg-blue-600 hover:bg-blue-700`} onClick={() => handleAction(report._id, 'stop')}>
                                    <FaCheckCircle size={12} /> Complete
                                </button>
                            </>
                        )}
                        {report.daily_production.status === 'Paused' && (
                            <>
                                <button className={`p-1 px-3 rounded-md text-white text-xs bg-yellow-600 hover:bg-yellow-700`} onClick={() => handleAction(report._id, 'resume')}>
                                    Resume
                                </button>
                            </>
                        )}
                    </div>
                    <DowntimeReasonModal isOpen={showDowntimeReasonModal} onClose={() => setShowDowntimeReasonModal(false)} report={currentReport} />
                </div>
            ))}
        </div>
    );
};

export default DPRGrid;
