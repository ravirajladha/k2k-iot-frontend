import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconFile from '@/components/Icon/IconFile';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconMultipleForwardRight from '@/components/Icon/IconMultipleForwardRight';
import { useLocation } from 'react-router-dom';

const JobOrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { recordsData } = location.state || {}; // Access the rowData passed from the previous component
    console.log('recordsData', recordsData);

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

    const mockAchievedLogs1 = [
        {
            timestamp: '2025-03-03T12:00:00Z',
            quantityAchieved: 22,
            createdBy: 'John Doe',
        },
        {
            timestamp: '2025-03-03T14:30:00Z',
            quantityAchieved: 33,
            createdBy: 'Jane Smith',
        },
    ];

    const mockRejectedLogs1 = [
        {
            timestamp: '2025-03-03T13:00:00Z',
            quantityRejected: 3,
            createdBy: 'John Doe',
        },
        {
            timestamp: '2025-03-03T15:00:00Z',
            quantityRejected: 2,
            createdBy: 'Alice Brown',
        },
    ];
    const mockAchievedLogs2 = [
        {
            timestamp: '2025-03-03T12:00:00Z',
            quantityAchieved: 22,
            createdBy: 'Hasna',
        },
        {
            timestamp: '2025-03-03T14:30:00Z',
            quantityAchieved: 33,
            createdBy: 'Kaavish',
        },
    ];

    const mockRejectedLogs2 = [
        {
            timestamp: '2025-03-03T13:00:00Z',
            quantityRejected: 3,
            createdBy: 'Ravi ',
        },
        {
            timestamp: '2025-03-03T15:00:00Z',
            quantityRejected: 2,
            createdBy: 'Raj',
        },
    ];

    const jobOrders = [
        {
            id: 1,
            productName: 'Inward Door',
            uom: 'Nos',
            poQuantity: 100,
            plannedQuantity: 90,
            achievedQuantity: 80,
            rejectedQuantity: 10,
            semiFinishedTasks: [
                {
                    id: 'SF101',
                    name: 'Semi Finished 1',
                    file: null,
                    remark: 'Initial cutting process',
                    steps: [
                        {
                            name: 'Cutting',
                            poQuantity: 30,
                            plannedQuantity: 25,
                            achievedQuantity: 22,
                            rejectedQuantity: 3,
                            achievedLogs: mockAchievedLogs1, // Logs for the Cutting step
                            rejectedLogs: mockRejectedLogs1, // Logs for the Cutting step
                        },
                        {
                            name: 'Machining',
                            poQuantity: 40,
                            plannedQuantity: 35,
                            achievedQuantity: 33,
                            rejectedQuantity: 2,
                            achievedLogs: mockAchievedLogs2, // Logs for the Machining step
                            rejectedLogs: mockRejectedLogs2, // Logs for the Machining step
                        },
                    ],
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
        plantCode: '123',
        prodReqDate: '2025-01-21',
        prodReqrDate: '2025-01-22',
        deadline: '2025-01-30',
        issuedBy: 'V Gouda',
        recievedBy: 'M R Bhaske',
        status: 'In Progress',
        // priority: 'High',
        bufferStock: 'False',
    };

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const PAGE_SIZES = [5, 10, 20];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Job Order', link: '/falcon-facade/job-order/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/job-order', icon: <IconArrowBackward className="text-4xl" /> }} />
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
                                <strong>Client Name:</strong> {recordsData.clientName}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {recordsData.projectName}
                            </p>
                            <p className="text-sm">
                                <strong>Address:</strong> {clientDetails.address}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {recordsData.workOrderId}
                            </p>
                            <p className="text-sm">
                                <strong>Plant Name:</strong> {recordsData.plantName}
                            </p>
                            <p className="text-sm">
                                <strong>Production Request Date:</strong> {workOrder.prodReqDate}
                            </p>
                            <p className="text-sm">
                                <strong>Production Requirement Date:</strong> {workOrder.prodReqrDate}
                            </p>
                            <p className="text-sm">
                                <strong>Issued By:</strong> {workOrder.issuedBy}
                            </p>
                            <p className="text-sm">
                                <strong>Recieved By:</strong> {workOrder.recievedBy}
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> {workOrder.createdAt}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})
                            </p>
                            <p className="text-sm mt-2">
                                <strong>Date:</strong> {workOrder.deadline}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <strong>Files:</strong>
                                <IconFile className="text-gray-600" />
                            </div>
                        </div>

                        <div className="bg-gray-300 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Job Order Details</h3>
                            <p className="text-sm">
                                <strong>Job Order Id:</strong> {recordsData.jobOrderId}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> Bharath (Manager)
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> 28/02/2025 12:24:23
                            </p>
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

                <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border border-gray-300">Product Name</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Sales Order Number</th>
                                <th className="px-4 py-2 text-left border border-gray-300">System</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Product System</th>
                                <th className="px-4 py-2 text-left border border-gray-300">UOM</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Color Code</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Code</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Width</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Height</th>
                                <th className="px-4 py-2 text-left border border-gray-300">PO Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Range Date</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Achieved Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Rejected Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordsData.products.map((product, index) => (
                                <tr key={product.productId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.productName}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">SL-123</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">Schuco</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">Casement Window 45 Series</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.uom}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.colorCode}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.code}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.width}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.height}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.poQuantity}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">2025-07-05 to 2025-07-10</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.achievedTillNow}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.rejectedQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-md font-semibold mb-2">Semi-Finished Production</h3>
                    {jobOrders.map((sf) => (
                        <div key={sf.id} className="border p-4 mb-4 bg-white shadow-sm rounded-md">
                            <h4 className="text-md font-semibold mb-2"></h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold">File:</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Remarks:</p>
                                    <p className="text-gray-700"></p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 border">Step Name</th>
                                            <th className="px-4 py-2 border">PO Quantity</th>
                                            <th className="px-4 py-2 border">Planned Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sf.semiFinishedTasks.map((step, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-2 border">{step.name}</td>
                                                <td className="px-4 py-2 border">{step.poQuantity}</td>
                                                <td className="px-4 py-2 border">{step.plannedQuantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default JobOrderPage;
