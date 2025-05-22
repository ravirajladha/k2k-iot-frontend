import { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import DowntimeModal from './DowntimeModal';
import DPRGrid, { Report } from './DPRGrid';
import ProductionLogsModal from './ProductionLogsModal';
import { sampleProductionLogs, sampleDowntimeLogs } from './sampleDatas';
import { fetchProductionByDate, fetchUpdatedReportByProduct, storeProductionAction } from '@/api/konkreteKlinkers/production';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';

const tabLabels = ['Past DPR', "Today's DPR", 'Future DPR'];

const DPR = () => {
    const dispatch = useDispatch();

    const [selectedTabIndex, setSelectedTabIndex] = useState(1); // Default to "Today's DPR"
    const [dispatchDate, setDispatchDate] = useState(new Date().toISOString().split('T')[0]);
    const [reports, setReports] = useState<Report[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(setPageTitle('Production Planning'));
    }, [dispatch]);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const data = await fetchProductionByDate(dispatchDate);

                setReports(data.todayDPR || []);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch reports:', err);
                setReports([]); // fallback
            }
        };

        loadReports();
    }, [dispatchDate]);

    const handleTabChange = (index: number) => {
        setLoading(true);
        setSelectedTabIndex(index);
        // Adjust the date based on tab logic
        const today = new Date();
        let adjustedDate = today;

        if (index === 0) {
            adjustedDate = new Date(today.setDate(today.getDate() - 1)); // Yesterday
        } else if (index === 2) {
            adjustedDate = new Date(today.setDate(today.getDate() + 1)); // Tomorrow
        }

        setDispatchDate(adjustedDate.toISOString().split('T')[0]);
    };

    const handleAction = async (reportId: string, action: 'start' | 'stop' | 'pause' | 'resume') => {
        try {
            const targetReport = reports.find((r) => r._id === reportId);
            if (!targetReport) {
                console.warn('Report not found.');
                return;
            }

            const payload = {
                action,
                job_order: targetReport.job_order,
                product_id: targetReport.product_id,
                // ...(pause_description && { pause_description }),
            };

            await storeProductionAction(payload);

            const updatedStatus: 'Pending' | 'In Progress' | 'Paused' | 'Pending QC' =
                action === 'start' ? 'In Progress' : action === 'stop' ? 'Pending QC' : action === 'pause' ? 'Paused' : action === 'resume' ? 'In Progress' : 'Pending';

            setReports((prev) =>
                prev.map((report) =>
                    report._id === reportId
                        ? {
                              ...report,
                              daily_production: {
                                  ...report.daily_production,
                                  status: updatedStatus,
                              },
                          }
                        : report
                )
            );
        } catch (error) {
            console.error('Failed to send production action:', error);
        }
    };

    const handleRefresh = async (selectedReport: Report) => {
        try {
            const refreshed = await fetchUpdatedReportByProduct(selectedReport?.product_id, selectedReport?.job_order);
            console.log(refreshed);

            setReports((prev) =>
                prev.map((report) =>
                    report._id === selectedReport._id
                        ? {
                              ...report,
                              achieved_quantity: refreshed.product?.achieved_quantity,
                              rejected_quantity: refreshed.product?.rejected_quantity,
                              recycled_quantity: refreshed.product?.recycled_quantity,
                          }
                        : report
                )
            );
        } catch {
            console.error('Refresh failed');
        }
    };

    const getStatusColor = (status: Report['daily_production']['status']) => {
        const colorMap = {
            'In Progress': 'bg-green-500 text-white',
            Paused: 'bg-red-500 text-white',
            Pending: 'bg-gray-500 text-white',
            'Pending QC': 'bg-blue-500 text-white',
        };
        return colorMap[status] || 'bg-gray-400 text-white';
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Production', link: '#', isActive: true },
    ];
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/qc-check', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <h5 className="text-lg font-semibold mb-4">Production Planning</h5>

                <Tab.Group defaultIndex={1} onChange={handleTabChange}>
                    <Tab.List className="flex gap-2">
                        {tabLabels.map((label, index) => (
                            <Tab key={index} as={Fragment}>
                                {({ selected }) => <button className={`p-3 rounded ${selected ? 'bg-warning text-white' : ''} hover:bg-warning hover:text-white`}>{label}</button>}
                            </Tab>
                        ))}
                    </Tab.List>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <input type="date" className="form-input" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} />
                    </div>

                    <Tab.Panels>
                        {tabLabels.map((_, index) => (
                            <Tab.Panel key={index}>
                                {loading ? (
                                    <CustomLoader />
                                ) : (
                                    <DPRGrid
                                        reports={reports}
                                        handleAction={handleAction}
                                        handleRefresh={handleRefresh}
                                        setIsModalOpen={setIsModalOpen}
                                        setIsLogsModalOpen={setIsLogsModalOpen}
                                        getStatusColor={getStatusColor}
                                        setSelectedReport={setSelectedReport}
                                        showActionButtons={index === 1}
                                    />
                                )}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>

                <DowntimeModal isOpen={isModalOpen} setShowDowntime={setIsModalOpen} selectedReport={selectedReport} />
                <ProductionLogsModal isOpen={isLogsModalOpen} setShowLogs={setIsLogsModalOpen} selectedReport={selectedReport} />
            </div>
        </div>
    );
};

export default DPR;
