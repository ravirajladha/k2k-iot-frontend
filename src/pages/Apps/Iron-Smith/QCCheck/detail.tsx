import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import AnimateHeight from 'react-animate-height';



const DispatchDetailPage = () => {
    console.log("inside qc check detail page");

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
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Qc Check', link: '/iron-smith/job-order/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];



    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    // Sample data for demonstration
    const clientDetails = {
        clientName: 'ABC Corp',
        projectName: 'Project Alpha',
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
                    link: '/iron-smith/qc-check/view',
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
                                <strong>Client Name:</strong> {clientDetails.clientName}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong>{clientDetails.projectName}
                            </p>
                            <p className="text-sm">
                                <strong>Address:</strong> {clientDetails.address}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {rowData.workOrder}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order Number:</strong> {rowData.jobOrder}
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> {rowData.timestamp}
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
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border border-gray-300">Sl No.</th>
                                {/* <th className="px-4 py-2 text-left border border-gray-300">Work Order</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Job Order</th> */}
                                <th className="px-4 py-2 text-left border border-gray-300">Product Id</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Product Name</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Recycled Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Rejected Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData && (
                                <tr key={rowData.sl_no}>
                                    <td className="px-4 py-2 border border-gray-300">{rowData.sl_no}</td>
                                    {/* <td className="px-4 py-2 border border-gray-300">{rowData.workOrder}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData.jobOrder}</td> */}
                                    <td className="px-4 py-2 border border-gray-300">{rowData.productId}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData.productName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData.recycledQuantity}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData.rejectedQuantity}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData.remark}</td>
                                    {/* <td className="px-4 py-2 border border-gray-300">{productDetails.remark}</td> */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DispatchDetailPage;
