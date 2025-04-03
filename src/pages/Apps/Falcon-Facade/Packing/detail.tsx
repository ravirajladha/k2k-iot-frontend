import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconFile from '@/components/Icon/IconFile';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import { useLocation } from 'react-router-dom';

const JobOrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {};
    console.log('rowData', rowData);

    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

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
        { label: 'Packing', link: '/falcon-facade/packing', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    // Counter for serial number
    let serialNumber = 0;

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/packing', icon: <IconArrowBackward className="text-4xl" /> }} />
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
                                <strong>Project Name:</strong> {clientDetails.projectName}
                            </p>
                            <p className="text-sm">
                                <strong>Address:</strong> {clientDetails.address}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
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

                {/* QR Code Cards Section */}
                <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">QR Code Details</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {rowData?.products?.map((product, productIndex) =>
                            product.semiFinishedProducts.map((sfProduct, sfIndex) =>
                                sfProduct.qrCodes.map((qrCode, qrIndex) => {
                                    serialNumber++; // Increment serial number for each QR code
                                    return (
                                        <div
                                            key={`${productIndex}-${sfIndex}-${qrIndex}`}
                                            className="product-card bg-blue-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative"
                                        >
                                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                                <span className="font-semibold text-xs">S.No: {serialNumber}</span>
                                            </div>
                                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                                <h3 className="text-sm font-semibold">Product: {product.productName}</h3>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="product-details p-2 text-xs">
                                                    <div className="grid grid-cols-2 gap-1">
                                                        <div className="font-semibold">Work Order Id</div>
                                                        <div>: {workOrder.id}</div>
                                                        <div className="font-semibold">Job Order Id</div>
                                                        <div>: {rowData?.jobOrder || 'JO98765'}</div>
                                                        <div className="font-semibold">Client Name</div>
                                                        <div>: {clientDetails.clientName}</div>
                                                        <div className="font-semibold">Project Name</div>
                                                        <div>: {clientDetails.projectName}</div>
                                                        <div className="font-semibold">Bundle No</div>
                                                        <div>: {sfIndex + 1}</div>
                                                        <div>
                                                            <strong>Qty</strong>
                                                        </div>
                                                        <div>: {sfProduct.quantity}</div>
                                                        <div>
                                                            <strong>Created By</strong>
                                                        </div>
                                                        <div>: {workOrder.createdBy.name}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center flex flex-col">
                                                    <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png" alt={`QR Code ${qrCode}`} className="w-36 h-36 mb-4" />
                                                    <div className="flex items-center">
                                                        <strong className="mr-1">QR Id:</strong>
                                                    </div>
                                                    <div>{qrCode}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobOrderPage;
