import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconFile from '@/components/Icon/IconFile';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import { useLocation } from 'react-router-dom';

const rowData = [
    {
        sl_no: 1,
        workOrder: 'WO12345',
        jobOrder: 'JO98765',
        productId: 'PRD001',
        productName: 'Inward Door',
        rejectedQuantity: 5,
        recycledQuantity: 3,
        remark: 'Glass glazing fix',
        createdBy: 'Admin',
        timestamp: '2025-01-28T10:25:00Z',
    },
    {
        sl_no: 2,
        workOrder: 'WO12346',
        jobOrder: 'JO98766',
        productId: 'PRD002',
        productName: 'Fixed Door',
        rejectedQuantity: 2,
        recycledQuantity: 1,
        remark: 'Cutting issue',
        createdBy: 'User1',
        timestamp: '2025-01-28T11:30:00Z',
    },
    {
        sl_no: 3,
        workOrder: 'WO12347',
        jobOrder: 'JO98767',
        productId: 'PRD003',
        productName: 'Fixed Window',
        rejectedQuantity: 8,
        recycledQuantity: 5,
        remark: 'Assembling mismatch a/c to documents',
        createdBy: 'Manager',
        timestamp: '2025-01-28T12:45:00Z',
    },
];

const QcCheckDetailPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = location.state || {};
    console.log('Incoming productId:', id);
    console.log("Inside view detail page");

    useEffect(() => {
        dispatch(setPageTitle('Qc Check Detail'));
    }, [dispatch]);

    // Find the product details based on the incoming productId
    const productDetails = rowData.find(item => item.productId === id);

    const clientDetails = {
        clientName: 'ABC Corp',
        projectName: 'Project Alpha',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        gst: '123456789ABC',
        placeOfSupply: 'New York',
    };

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
        bufferStock: 'False',
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Qc Check', link: '/falcon-facade/qc-check', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/qc-check', icon: <IconArrowBackward className="text-4xl" /> }} />
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
                            <p className="text-sm"><strong>Client Name:</strong> {clientDetails.clientName}</p>
                            <p className="text-sm"><strong>Project Name:</strong> {clientDetails.projectName}</p>
                            <p className="text-sm"><strong>Address:</strong> {clientDetails.address}</p>
                        </div>
                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm"><strong>Production Request Date:</strong> {workOrder.prodReqDate}</p>
                            <p className="text-sm"><strong>Production Requirement Date:</strong> {workOrder.prodReqrDate}</p>
                            <p className="text-sm"><strong>Issued By:</strong> {workOrder.issuedBy}</p>
                            <p className="text-sm"><strong>Received By:</strong> {workOrder.recievedBy}</p>
                            <p className="text-sm"><strong>Created At:</strong> {workOrder.createdAt}</p>
                            <p className="text-sm"><strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})</p>
                            <p className="text-sm mt-2"><strong>Date:</strong> {workOrder.deadline}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <strong>Files:</strong>
                                <IconFile className="text-gray-600" />
                            </div>
                        </div>
                        <div className="bg-gray-300 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Job Order Details</h3>
                            <p className="text-sm"><strong>Created By:</strong> Bharath (Manager)</p>
                            <p className="text-sm"><strong>Created At:</strong> 28/02/2025 12:24:23</p>
                            <p className="text-sm"><strong>Status:</strong>
                                <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${workOrder.status === 'In Progress' ? 'text-blue-500' : workOrder.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
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
                                <th className="px-4 py-2 text-left border border-gray-300">Sl No.</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Work Order</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Job Order</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Product Name</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Rejected Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Recycled Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails && (
                                <tr key={productDetails.sl_no}>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.sl_no}</td>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.workOrder}</td>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.jobOrder}</td>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.productName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.rejectedQuantity}</td>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.recycledQuantity}</td>
                                    <td className="px-4 py-2 border border-gray-300">{productDetails.remark}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QcCheckDetailPage;
