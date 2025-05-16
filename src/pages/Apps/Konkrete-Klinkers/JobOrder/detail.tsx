import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import AnimateHeight from 'react-animate-height';
import { fetchJobOrderById } from '@/api/konkreteKlinkers/jobOrder';
import CustomLoader from '@/components/Loader';
import { formatDateTime } from '@/utils/formatDate';

const DispatchDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [jobOrderDetail, setJobOrderDetail] = useState<any>([]);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobOrder = async () => {
            try {
                const data = await fetchJobOrderById(id);
                setJobOrderDetail(data);
            } catch (error) {
                setApiError('Failed to fetch JobOrder details.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobOrder();
    }, [id]);

    useEffect(() => {
        dispatch(setPageTitle('Job Order Detail'));
    }, [dispatch]);

    if (!jobOrderDetail) {
        return <div>No job order data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Job Order', link: '/konkrete-klinkers/job-order', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];
    
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const minDate = sevenDaysAgo.toISOString().split('T')[0];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/job-order',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            {loading ? (
                <CustomLoader />
            ) : (
                <div className="p-4 pt-10">
                    {/* Client Details Section */}
                    <div className="panel mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Client & Work Order Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
                            {/* Left Section: Client Details */}
                            <div className="bg-yellow-50 p-4 rounded-md shadow">
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                                <p className="text-sm">
                                    <strong>Client Name:</strong> {jobOrderDetail.client.name}
                                </p>
                                <p className="text-sm">
                                    <strong>Project Name:</strong>
                                    {jobOrderDetail.project_name}
                                </p>
                                <p className="text-sm">
                                    <strong>Address:</strong> {jobOrderDetail.client.address}
                                </p>
                            </div>

                            {/* Right Section: Work Order Details */}
                            <div className="bg-blue-50 p-4 rounded-md shadow">
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                                <p className="text-sm">
                                    <strong>Work Order Number:</strong> {jobOrderDetail.work_order_details.work_order_number}
                                </p>
                                <p className="text-sm">
                                    <strong>Created At:</strong> {formatDateTime(jobOrderDetail.work_order_details.created_at)}
                                </p>
                                <p className="text-sm">
                                    <strong>Created By:</strong> {jobOrderDetail.work_order_details.created_by}
                                </p>
                                {/* <p className="text-sm">
                                <strong>Dates:</strong> {workOrder.deadline}
                            </p> */}

                                <p className="text-sm">
                                    <strong>Status:</strong>
                                    <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold`}>{jobOrderDetail.job_order_status}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* new job orders */}
                    <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                            {/* Job Order Header */}
                            {/* <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Job Order Detail - {rowData.jobOrderId}</h2> */}

                            {/* Job Order Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                                <div>
                                    <p className="text-sm">
                                        <strong>Sales Order Number:</strong>
                                        {jobOrderDetail.sales_order_number}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Date: </strong> {`${formatDateTime(jobOrderDetail.date.from)} - ${formatDateTime(jobOrderDetail.date.to)}`}
                                    </p>
                                </div>
                                {/* <div>
                                        <p className="text-sm">
                                            <strong>Plant Name:</strong> {rowData.plantName}
                                        </p>
                                    </div> */}
                            </div>

                            {/* Product Details Table */}
                            <div className="overflow-x-auto mt-3">
                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr className="text-gray-700 dark:text-white">
                                            <th className="px-4 py-2 border">Product Name</th>
                                            <th className="px-4 py-2 border">Plant</th>
                                            {/* <th className="px-4 py-2 border">UOM</th> */}
                                            {/* <th className="px-4 py-2 border">PO Quantity</th> */}
                                            <th className="px-4 py-2 border">Planned Quantity</th>
                                            <th className="px-4 py-2 border">Achieved Till Date</th>
                                            <th className="px-4 py-2 border">Achieved Quantity</th>
                                            <th className="px-4 py-2 border">Rejected Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {jobOrderDetail.products.map((product, index) => (
                                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-2 border">{product.product_name}</td>
                                                <td className="px-4 py-2 border">{product.plant_name}</td>
                                                {/* <td className="px-4 py-2 border">{product.uom}</td> */}
                                                {/* <td className="px-4 py-2 border">{product.poQuantity}</td> */}
                                                <td className="px-4 py-2 border">{product.planned_quantity}</td>
                                                <td className="px-4 py-2 border text-green-600 font-semibold">-</td>
                                                <td className="px-4 py-2 border text-blue-500 font-semibold">-</td>
                                                <td className="px-4 py-2 border text-red-500 font-semibold">-</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Toggle Button for Production Reports */}
                            {/* <div className="mt-4">
                                <button type="button" onClick={() => toggleJobOrder(jobOrder.id)} className="flex items-center text-primary font-semibold transition-all hover:text-blue-600">
                                    <span className={`mr-2 transition-transform ${expandedJobOrders.includes(jobOrder.id) ? 'rotate-180' : ''}`}>▼</span>
                                    {expandedJobOrders.includes(jobOrder.id) ? 'Hide Production Reports' : 'Show Production Reports'}
                                </button>
                            </div> */}

                            {/* Expandable Daily Production Reports */}
                            {/* <AnimateHeight duration={300} height={expandedJobOrders.includes(jobOrder.id) ? 'auto' : 0} className="bg-gray-50 dark:bg-gray-900 rounded mt-3">
                                <ul className="text-gray-600 dark:text-gray-300">
                                    {jobOrder.dailyReports.map((report, index) => (
                                        <li key={index} className="p-3 border border-gray-200 rounded mb-3">
                                            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                                                Daily Report - {report.date} (Sales Order: DPR1123) (Created by {report.createdBy})
                                            </h3>
                                            <div className="overflow-x-auto mt-2">
                                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                                        <tr>
                                                            <th className="px-4 py-2 border">PO Quantity</th>
                                                            <th className="px-4 py-2 border">Planned Quantity</th>
                                                            <th className="px-4 py-2 border">Achieved Quantity</th>
                                                            <th className="px-4 py-2 border">Rejected Quantity</th>
                                                            <th className="px-4 py-2 border">Recycled Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-4 py-2 border">{report.poQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.plannedQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.achievedQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.rejectedQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.recycledQuantity}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </AnimateHeight> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchDetailPage;
