import { FaSyncAlt, FaPause, FaHistory, FaCheckCircle } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";

const DPRGrid = ({ reports, handleStartStop, handleComplete, handleRefresh, setIsModalOpen, setIsLogsModalOpen, getStatusColor }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-5">
            {reports.map((report) => (
                <div key={report.workOrderNumber} className={`rounded-md shadow-md p-4 bg-white dark:bg-gray-800 ${getStatusColor(report.status)}`}>
                    {/* Grid Layout for Equal Height Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Left Section: Work Order & Production Status */}
                        <div className="p-3 rounded-md shadow bg-white dark:bg-gray-800 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
                                    Work Order Details22
                                </h4>
                                <table className="w-full text-xs text-left text-gray-600 dark:text-gray-300">
                                    <tbody>
                                        <tr><td className="font-semibold">Work Order No:</td> <td>{report.workOrderNumber}</td></tr>
                                        <tr><td className="font-semibold">Job Order No:</td> <td>{report.jobOrderNumber}</td></tr>
                                        <tr><td className="font-semibold">Client:</td> <td>{report.clientName}</td></tr>
                                        <tr><td className="font-semibold">Project:</td> <td>{report.projectName}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-3">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
                                    Production Status
                                </h4>
                                <table className="w-full text-xs text-left text-gray-600 dark:text-gray-300">
                                    <tbody>
                                        <tr><td className="font-semibold">Started By:</td> <td>{report.startedBy}</td></tr>
                                        <tr><td className="font-semibold">Started At:</td> <td>{report.startedAt || "Not Started"}</td></tr>
                                        <tr><td className="font-semibold">Stopped At:</td> <td>{report.stoppedAt || "--"}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Section: Production Planning */}
                        <div className="p-3 rounded-md shadow bg-white dark:bg-gray-800 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
                                    Production Planning
                                </h4>
                                <table className="w-full text-xs text-left text-gray-600 dark:text-gray-300">
                                    <tbody>
                                        <tr><td className="font-semibold">Date:</td> <td>{'02-02-2025'}</td></tr>
                                        <tr><td className="font-semibold">Product:</td> <td>{report.productName}</td></tr>
                                        <tr><td className="font-semibold">Material Code:</td> <td>{report.materialCode}</td></tr>
                                        <tr><td className="font-semibold">UOM:</td> <td>{report.UOM}</td></tr>
                                        <tr><td className="font-semibold">PO Quantity:</td> <td>{report.POQuantity}</td></tr>
                                        <tr><td className="font-semibold text-green-600">Achieved:</td> <td>{report.achievedTillNow}</td></tr>
                                        <tr><td className="font-semibold text-red-600">Rejected:</td> <td>{report.rejectQuantity}</td></tr>
                                        <tr><td className="font-semibold text-blue-600">Recycled:</td> <td>{report.recycleQuantity}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="mt-3 flex flex-wrap justify-center sm:justify-between items-center gap-2">
                        <button className="p-1 rounded-md bg-gray-500 text-white hover:bg-gray-600" onClick={handleRefresh}>
                            <FaSyncAlt size={14} />
                        </button>

                        <button className="p-2 bg-blue-500 text-white rounded" title="Downtime Logs Modal" onClick={() => setIsModalOpen(true)}>
                            <AiOutlineStop size={14} />
                        </button>

                        <button className="p-1 rounded-md bg-purple-500 text-white hover:bg-purple-600" onClick={() => setIsLogsModalOpen(true)} title="Production Logs Modal">
                            <FaHistory size={14} />
                        </button>

                        {report.status !== "Finished" && (
                            <button
                                className={`p-1 px-3 rounded-md text-white text-xs ${report.status === "Running" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                                onClick={() => handleStartStop(report.workOrderNumber)}
                            >
                                {report.status === "Running" ? "Stop" : "Start"}
                            </button>
                        )}

                        {report.status === "Stopped" && (
                            <button className="p-1 px-3 rounded-md bg-blue-500 text-white text-xs hover:bg-blue-600" onClick={() => handleComplete(report.workOrderNumber)}>
                                <FaCheckCircle size={12} /> Complete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DPRGrid;
