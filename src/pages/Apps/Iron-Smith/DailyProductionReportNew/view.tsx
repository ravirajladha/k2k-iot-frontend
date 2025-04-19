import { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import DowntimeModal from './DowntimeModal';
import DPRGrid from './DPRGrid';
import ProductionLogsModal from './ProductionLogsModal';
import { pastReports, currentReports, futureReports, sampleProductionLogs, sampleDowntimeLogs } from './sampleDatas';

// Define TypeScript Types for Report Structure
interface Report {
    workOrderNumber: string;
    jobOrderNumber: string;
    clientName: string;
    projectName: string;
    productName: string;
    materialCode: string;
    UOM: string;
    POQuantity: number;
    machineName: String;
    achievedTillNow: number;
    rejectQuantity: number;
    recycleQuantity: number;
    startedBy: string;
    startedAt: string | null;
    stoppedAt: string | null;
    status: "Running" | "Stopped" | "Not Started" | "Finished";
}

const DPR = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Production Planning'));
    }, [dispatch]);

    // **Ensure state has correct types**
    const [reports, setReports] = useState<Report[]>([...currentReports]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLogsModalOpen, setIsLogsModalOpen] = useState<boolean>(false);

    // ✅ **Ensure correct work order number is used**
    const handleStartStop = (workOrderNumber: string) => {
        console.log(`Toggling status for Work Order: ${workOrderNumber}`);
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.workOrderNumber === workOrderNumber
                    ? { ...report, status: report.status === "Running" ? "Stopped" : "Running" }
                    : report
            )
        );
    };

    const handleComplete = (workOrderNumber: string) => {
        console.log(`Completing Work Order: ${workOrderNumber}`);
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.workOrderNumber === workOrderNumber
                    ? { ...report, status: "Finished" }
                    : report
            )
        );
    };

    const handleRefresh = () => {
        console.log("Refreshing Data...");
        setReports([...currentReports]); // Reset reports
    };

    // ✅ **Ensure correct colors are applied**
    const getStatusColor = (status: Report["status"]) => {
        switch (status) {
            case "Running":
                return "bg-green-500 text-white";
            case "Stopped":
                return "bg-red-500 text-white";
            case "Not Started":
                return "bg-gray-500 text-white";
            case "Finished":
                return "bg-blue-500 text-white";
            default:
                return "bg-gray-400 text-white";
        }
    };

    return (
        <div className="panel">
            <h5 className="text-lg font-semibold mb-4">Production Planning</h5>

            {/* TABS FOR PAST, CURRENT, FUTURE DPR */}
            <Tab.Group defaultIndex={1} >  {/* Set 'Current DPR' as default (index 1) */}
                <Tab.List className="flex gap-2">
                    {["Past DPR", "Current DPR", "Future DPR"].map((tab, index) => (
                        <Tab key={index} as={Fragment}>
                            {({ selected }) => (
                                <button className={`p-3 rounded ${selected ? 'bg-warning text-white' : ''} hover:bg-warning hover:text-white`}>
                                    {tab}
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>


                <Tab.Panels>
                    {/* Past DPR */}
                    <Tab.Panel>
                        <DPRGrid
                            reports={pastReports}
                            handleStartStop={handleStartStop}
                            handleComplete={handleComplete}
                            handleRefresh={handleRefresh}
                            setIsModalOpen={setIsModalOpen}
                            setIsLogsModalOpen={setIsLogsModalOpen}
                            getStatusColor={getStatusColor}
                            showActionButtons={false} // ❌ No start/stop for past DPR
                        />
                    </Tab.Panel>

                    {/* Current DPR */}
                    <Tab.Panel>
                        <DPRGrid
                            reports={currentReports} // ✅ Ensure state is passed
                            handleStartStop={handleStartStop}
                            handleComplete={handleComplete}
                            handleRefresh={handleRefresh}
                            setIsModalOpen={setIsModalOpen}
                            setIsLogsModalOpen={setIsLogsModalOpen}
                            getStatusColor={getStatusColor}
                            showActionButtons={true} // ✅ Start/Stop allowed
                        />
                    </Tab.Panel>

                    {/* Future DPR */}
                    <Tab.Panel>
                        <DPRGrid
                            reports={futureReports}
                            handleStartStop={handleStartStop}
                            handleComplete={handleComplete}
                            handleRefresh={handleRefresh}
                            setIsModalOpen={setIsModalOpen}
                            setIsLogsModalOpen={setIsLogsModalOpen}
                            getStatusColor={getStatusColor}
                            showActionButtons={false} // ❌ No start/stop for future DPR
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {/* Downtime Modal */}
            <DowntimeModal
                isOpen={isModalOpen}
                setShowDowntime={setIsModalOpen} // ✅ No more TypeScript errors
                downtimeLogs={sampleDowntimeLogs}
            />

            {/* Production Logs Modal */}
            <ProductionLogsModal
                isOpen={isLogsModalOpen}
                setShowLogs={setIsLogsModalOpen}
                productionLogs={sampleProductionLogs}
            />
        </div>
    );
};

export default DPR;
