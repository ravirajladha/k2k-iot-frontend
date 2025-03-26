import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import AnimateHeight from 'react-animate-height';



const DispatchDetailPage = () => {
    console.log("inside job order detail page");

    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {}; // Access the rowData passed from the previous component
    console.log('rowData', rowData);

    useEffect(() => {
        dispatch(setPageTitle('Job Order Detail'));
    }, [dispatch]);

    if (!rowData) {
        return <div>No job order data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Job Order', link: '/konkrete-klinkers/job-order/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];



    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    // Sample data for demonstration
    const clientDetails = {
        clientName: 'ABC Corp',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        gst: '123456789ABC',
        placeOfSupply: 'New York',
    };


    const jobOrders = [
        {
            id: 1,
            productName: 'Paver Black',
            uom: 'Nos',
            poQuantity: 100,
            plannedQuantity: 90,
            achievedQuantity: 80,
            rejectedQuantity: 10,
            dailyReports: [
                {
                    createdBy: 'Operator 1',
                    date: '2025-01-10',
                    poQuantity: 50,
                    plannedQuantity: 45,
                    achievedQuantity: 40,
                    rejectedQuantity: 5,
                    recycledQuantity: 2,
                },
                {
                    createdBy: 'Operator 2',
                    date: '2025-01-11',
                    poQuantity: 50,
                    plannedQuantity: 50,
                    achievedQuantity: 40,
                    rejectedQuantity: 10,
                    recycledQuantity: 3,
                },
            ],
        },
    ];

    const workOrder = {
        id: 'abc123',
        createdAt: '2025-01-10 10:30 AM',
        createdBy: {
            name: 'Bharath Kumar',
            role: 'Manager',
        },
        deadline: '2025-01-20',
        status: 'In Progress',
        // priority: 'High',
        bufferStock: 'False',
    };


    const [expandedJobOrders, setExpandedJobOrders] = useState(jobOrders.map((job) => job.id));

    const toggleJobOrder = (id: any) => {
        if (expandedJobOrders.includes(id)) {
            setExpandedJobOrders((prev) => prev.filter((jobId) => jobId !== id));
        } else {
            setExpandedJobOrders((prev) => [...prev, id]);
        }
    };





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
                    link: '/konkrete-klinkers/job-order/view',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Client & Work Order Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
                        {/* Left Section: Client Details */}
                        <div className="bg-yellow-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {rowData.clientName}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong>{rowData.projectName}
                            </p>
                            <p className="text-sm">
                                <strong>Address:</strong> {clientDetails.address}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {rowData.workOrderId}
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> {workOrder.createdAt}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})
                            </p>
                            {/* <p className="text-sm">
                                <strong>Dates:</strong> {workOrder.deadline}
                            </p> */}

                            <p className="text-sm">
                                <strong>Status:</strong>
                                <span
                                    className={`ml-2 px-2 py-1 rounded text-sm font-semibold 
                    ${workOrder.status === 'In Progress' ? 'text-blue-500' : workOrder.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {workOrder.status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

        
                {/* new job orders */}
                <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                    {jobOrders.map((jobOrder) => (
                        <div key={jobOrder.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                            {/* Job Order Header */}
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Job Order Detail - {rowData.jobOrderId}</h2>

                            {/* Job Order Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                                <div>
                                    <p className="text-sm">
                                        <strong>Sales Order Number:</strong> SL-123
                                    </p>
                                    <p className="text-sm">
                                        <strong>Date:</strong> {`${rowData.fromDate} - ${rowData.toDate}`}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm">
                                        <strong>Plant Name:</strong> {rowData.plantName}
                                    </p>
                                </div>
                            </div>

                            {/* Product Details Table */}
                            <div className="overflow-x-auto mt-3">
                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr className="text-gray-700 dark:text-white">
                                            <th className="px-4 py-2 border">Product Name</th>
                                            <th className="px-4 py-2 border">UOM</th>
                                            <th className="px-4 py-2 border">PO Quantity</th>
                                            <th className="px-4 py-2 border">Planned Quantity</th>
                                            <th className="px-4 py-2 border">Achieved Till Date</th>
                                            <th className="px-4 py-2 border">Achieved Quantity</th>
                                            <th className="px-4 py-2 border">Rejected Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {rowData.products.map((product, index) =>(
                                               <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                               <td className="px-4 py-2 border">{product.productName}</td>
                                               <td className="px-4 py-2 border">{product.uom}</td>
                                               <td className="px-4 py-2 border">{product.poQuantity}</td>
                                               <td className="px-4 py-2 border">{product.plannedQuantity}</td>
                                               <td className="px-4 py-2 border text-green-600 font-semibold">100</td>
                                               <td className="px-4 py-2 border text-blue-500 font-semibold">{product.achievedTillNow}</td>
                                               <td className="px-4 py-2 border text-red-500 font-semibold">{product.rejectedQuantity}</td>
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DispatchDetailPage;
