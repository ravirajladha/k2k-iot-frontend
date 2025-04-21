import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import AnimateHeight from 'react-animate-height';

const InventoryDetailPage = () => {
    console.log('inside job order detail page');

    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData, materialCode } = location.state || {}; // Access the rowData and materialCode passed from the previous component
    console.log('rowData', rowData);
    // console.log('materialCode', materialCode);

    useEffect(() => {
        dispatch(setPageTitle('Job Order Detail'));
    }, [dispatch]);

    if (!rowData || !materialCode) {
        return <div>No job order data available.</div>;
    }

    // Filter the rowData to find the matching item
    const selectedItem = rowData.find((item) => item.materialCode === materialCode);

    if (!selectedItem) {
        return <div>No matching data found for the selected material code.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Inventory', link: '/iron-smith/inventories', isActive: false },
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
                    link: '/iron-smith/inventories',
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
                                <strong>Address:</strong> {clientDetails.address}
                            </p>
                            <p className="text-sm">
                                <strong>City:</strong> {clientDetails.city}
                            </p>
                            <p className="text-sm">
                                <strong>State:</strong> {clientDetails.state}
                            </p>
                            <p className="text-sm">
                                <strong>GST:</strong> {clientDetails.gst}
                            </p>
                            <p className="text-sm">
                                <strong>Place of Supply:</strong> {clientDetails.placeOfSupply}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {workOrder.id}
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> {workOrder.createdAt}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})
                            </p>
                            <p className="text-sm">
                                <strong>Deadline:</strong> {workOrder.deadline}
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

                <div className="panel mb-6 bg-blue-100">
                    <h2 className="text-lg font-semibold mb-4">Products</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border border-gray-300">Material Code</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Product Description</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Diameter</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Unit of Measurement</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Inventory Quantity</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Buffer Quantity</th> */}
                                    <th className="px-4 py-2 text-left border border-gray-300">Required Quantity</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Dispatch Quantity</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Status</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.materialCode}</td>
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.productDescription}</td>
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.dia}</td>
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.unitOfMeasurement}</td>
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.quantity}</td>
                                    {/* <td className="px-4 py-2 border border-gray-300">{selectedItem.bufferQuantity}</td> */}
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.requiredQuantity}</td>
                                    <td className="px-4 py-2 border border-gray-300">{selectedItem.balanceQuantity}</td>
                                    {/* <td className="px-4 py-2 border border-gray-300">{selectedItem.status}</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetailPage;
