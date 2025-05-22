import { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import DowntimeModal from './DowntimeModal';
import DPRGrid from './DPRGrid';
import ProductionLogsModal from './ProductionLogsModal';
import { pastReports, currentReports, futureReports, sampleProductionLogs, sampleDowntimeLogs, Report } from './sampleDatas';
import { fetchProductionByDate } from '@/api/konkreteKlinkers/production';

const DPR = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ dispatchDate: new Date().toISOString().split('T')[0] });
    const fetchProductionReports = async () =>{
        const response = await fetchProductionByDate(new Date().toISOString().split('T')[0]);
        console.log(response);

    }

    useEffect(() => {
        dispatch(setPageTitle('Production Planning'));
        fetchProductionReports();
    }, [dispatch]);

    useEffect(() => {
        fetchProductionReports();
    }, []);

    const [reports, setReports] = useState<Report[]>([...currentReports]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLogsModalOpen, setIsLogsModalOpen] = useState<boolean>(false);

    const handleStartStop = (workOrderNumber: string) => {
        setReports((prevReports) => prevReports.map((report) => (report.workOrderNumber === workOrderNumber ? { ...report, status: report.status === 'Running' ? 'Stopped' : 'Running' } : report)));
    };

    const handleComplete = (workOrderNumber: string) => {
        setReports((prevReports) => prevReports.map((report) => (report.workOrderNumber === workOrderNumber ? { ...report, status: 'Finished' } : report)));
    };

    const handleRefresh = () => {
        setReports([...currentReports]); // Reset reports
    };

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'Running':
                return 'bg-green-500 text-white';
            case 'Stopped':
                return 'bg-red-500 text-white';
            case 'Not Started':
                return 'bg-gray-500 text-white';
            case 'Finished':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-400 text-white';
        }
    };

    const filterReportsByDate = (reports: Report[], date: string) => {
        return reports.filter((report) => report.date === date);
    };

    const handleTabChange = (index: number) => {
        let newDate = '';
        switch (index) {
            case 0: // Yesterday's DPR
                newDate = pastReports.length > 0 ? pastReports[0].date : '';
                break;
            case 1: // Today's DPR
                newDate = currentReports.length > 0 ? currentReports[0].date : '';
                break;
            case 2: // Future DPR
                newDate = futureReports.length > 0 ? futureReports[0].date : '';
                break;
            default:
                break;
        }
        setFormData({ ...formData, dispatchDate: newDate });
    };

    return (
        <div className="panel">
            <h5 className="text-lg font-semibold mb-4">Production Planning</h5>

            <Tab.Group defaultIndex={1} onChange={handleTabChange}>
                <Tab.List className="flex gap-2">
                    {["Past DPR", "Today's DPR", 'Future DPR'].map((tab, index) => (
                        <Tab key={index} as={Fragment}>
                            {({ selected }) => <button className={`p-3 rounded ${selected ? 'bg-warning text-white' : ''} hover:bg-warning hover:text-white`}>{tab}</button>}
                        </Tab>
                    ))}
                </Tab.List>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                        {/* <label htmlFor="dispatchDate">Date</label> */}
                        <input
                            id="dispatchDate"
                            name="dispatchDate"
                            type="date"
                            className="form-input"
                            value={formData.dispatchDate}
                            // min="2023-01-01"
                            // max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]}
                            onChange={(e) => setFormData({ ...formData, dispatchDate: e.target.value })}
                        />
                    </div>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <DPRGrid
                            reports={filterReportsByDate(pastReports, formData.dispatchDate)}
                            handleStartStop={handleStartStop}
                            handleComplete={handleComplete}
                            handleRefresh={handleRefresh}
                            setIsModalOpen={setIsModalOpen}
                            setIsLogsModalOpen={setIsLogsModalOpen}
                            getStatusColor={getStatusColor}
                            showActionButtons={false}
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <DPRGrid
                            reports={filterReportsByDate(currentReports, formData.dispatchDate)}
                            handleStartStop={handleStartStop}
                            handleComplete={handleComplete}
                            handleRefresh={handleRefresh}
                            setIsModalOpen={setIsModalOpen}
                            setIsLogsModalOpen={setIsLogsModalOpen}
                            getStatusColor={getStatusColor}
                            showActionButtons={true}
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <DPRGrid
                            reports={filterReportsByDate(futureReports, formData.dispatchDate)}
                            handleStartStop={handleStartStop}
                            handleComplete={handleComplete}
                            handleRefresh={handleRefresh}
                            setIsModalOpen={setIsModalOpen}
                            setIsLogsModalOpen={setIsLogsModalOpen}
                            getStatusColor={getStatusColor}
                            showActionButtons={false}
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <DowntimeModal isOpen={isModalOpen} setShowDowntime={setIsModalOpen} downtimeLogs={sampleDowntimeLogs} />

            <ProductionLogsModal isOpen={isLogsModalOpen} setShowLogs={setIsLogsModalOpen} productionLogs={sampleProductionLogs} />
        </div>
    );
};

export default DPR;
