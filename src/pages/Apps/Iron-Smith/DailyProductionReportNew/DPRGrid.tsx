import { FaSyncAlt, FaPause, FaHistory, FaCheckCircle } from 'react-icons/fa';
import { AiOutlineStop } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import DowntimeReasonModal from './DowntimeReasonCreationModal';
import { ModalOutlet } from './ModalOutlet';
import IconEdit from '@/components/Icon/IconEdit';

interface Report {
    workOrderNumber: string;
    jobOrderNumber: string;
    clientName: string;
    projectName: string;
    productName: string;
    materialCode: string;
    UOM: string;
    POQuantity: number;
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
    setIsModalOpen: (open: boolean) => void;
    setIsLogsModalOpen: (open: boolean) => void;
    getStatusColor: (status: Report['status']) => string;
    showActionButtons: boolean;
}

interface WorkOrder {
    slNo: number;
    jobOrderId: string;
    workOrderId: string;
    product: string;
    quantity: number;
    completedQuantity: number;
    sf: string;
    createdAt: string;
    createdBy: string;
}

const rowData: WorkOrder[] = [
    {
        slNo: 1,
        jobOrderId: 'JOB-001',
        workOrderId: 'WO-1001',
        product: 'Concrete Blocks',
        quantity: 100,
        sf: 'SF1',
        completedQuantity: 80,
        createdAt: '2024-02-17 14:30',
        createdBy: 'user1',
    },
    {
        slNo: 2,
        jobOrderId: 'JOB-002',
        workOrderId: 'WO-1002',
        product: 'Cement Bags',
        quantity: 200,
        sf: 'SF2',
        completedQuantity: 200,
        createdAt: '2024-02-16 10:15',
        createdBy: 'user2',
    },
    {
        slNo: 3,
        jobOrderId: 'JOB-003',
        workOrderId: 'WO-1003',
        product: 'Steel Rods',
        sf: 'SF1',
        quantity: 50,
        completedQuantity: 20,
        createdAt: '2024-02-15 12:45',
        createdBy: 'user3',
    },
    {
        slNo: 4,
        jobOrderId: 'JOB-004',
        workOrderId: 'WO-1004',
        product: 'Bricks',
        sf: 'SF2',
        quantity: 500,
        completedQuantity: 450,
        createdAt: '2024-02-14 08:00',
        createdBy: 'user4',
    },
];

const DPRGrid: React.FC<DPRGridProps> = ({ reports, handleStartStop, handleComplete, handleRefresh, setIsModalOpen, setIsLogsModalOpen, getStatusColor }) => {
    const [showDowntimeReasonModal, setShowDowntimeReasonModal] = useState(false);
    const [modal10, setModal10] = useState(false);
    const [modalType, setModalType] = useState<'view' | 'updateCompletedQuantity' | 'qcCheck' | null>(null);
    const [selectedData, setSelectedData] = useState(null);

    const openModal = (type: 'view' | 'updateCompletedQuantity' | 'qcCheck', jobOrderId: string) => {
        // Find the selected row by jobOrderId
        const selectedRow = rowData.find((row) => row.jobOrderId === jobOrderId);
        console.log('Opening Modal with Data:', selectedRow); // Log the selected row

        setModalType(type); // Set the modal type (view, updateCompletedQuantity, qcCheck)
        setSelectedData(selectedRow); // Pass only the selected row
        setModal10(true); // Open the modal
    };

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
                        {/* Work Order Details */}
                        <div className="p-2 rounded-md shadow bg-white dark:bg-gray-800 flex flex-col">
                            <h4 className="text-base font-semibold text-gray-700 dark:text-white mb-1">Work Order Details</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
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
                        <button className="p-1 rounded-md bg-purple-500 text-white hover:bg-purple-600" onClick={() => setIsLogsModalOpen(true)} title="Production Logs Modal">
                            <FaHistory size={14} />
                        </button>
                        <button onClick={() => openModal('updateCompletedQuantity', report.jobOrderNumber)} className="p-1 btn btn-secondary flex items-center gap-1" title="Update Quantity">
                            <FaPencilAlt className="text-xs" />
                        </button>
                        <button onClick={() => openModal('qcCheck', report.jobOrderNumber)} className="p-1 btn btn-danger flex items-center gap-1" title="QC Check">
                            <FaPencilAlt className="text-xs" />
                        </button>
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
                    <ModalOutlet isOpen={!!modalType} closeModal={() => setModalType(null)} type={modalType} data={selectedData} />
                </div>
            ))}
        </div>
    );
};

export default DPRGrid;
